import { useEffect, useRef, useState } from 'react';
import { api, type Dish, type Order } from '../../api';

export function useTableState(tableId?: number) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [ordering, setOrdering] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [tariffMs, setTariffMs] = useState(0);
  const [cooldownMs, setCooldownMs] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const activeOrderRef = useRef<Order | null>(null);

  const updateStateFromOrder = (currentOrder: Order) => {
    const availableDishes = currentOrder.menuSet?.dishes || [];
    setActiveOrder(currentOrder);
    activeOrderRef.current = currentOrder;
    setDishes(availableDishes);

    const hasDishInOrder =
      (currentOrder.dishes?.length || 0) > 0;

    const orderStart = new Date(
      currentOrder.orderTime,
    ).getTime();
    const tariffEnd =
      orderStart + currentOrder.duration * 60 * 1000;
    
    // Cooldown рассчитывается от времени последнего TableOrder, если есть блюда
    const cooldownStart = hasDishInOrder && currentOrder.lastTableOrderTime
      ? new Date(currentOrder.lastTableOrderTime).getTime()
      : orderStart;
    const cooldownEnd = cooldownStart + 5 * 60 * 1000;
    
    const now = Date.now();
    setTariffMs(Math.max(0, tariffEnd - now));
    setCooldownMs(Math.max(0, cooldownEnd - now));
  };

  const fetchActiveOrder = async () => {
    if (!tableId) return;

    try {
      setLoading(true);
      const currentOrder =
        await api.getActiveOrderByTableNumber(tableId);

      if (!currentOrder || !currentOrder.menuSet) {
        setError('Нет активного заказа для этого столика');
        setDishes([]);
        setActiveOrder(null);
        activeOrderRef.current = null;
        return;
      }

      updateStateFromOrder(currentOrder);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ошибка загрузки блюд',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  useEffect(() => {
    if (!activeOrder) {
      activeOrderRef.current = null;
      return;
    }
    
    activeOrderRef.current = activeOrder;
    
    const updateTimers = () => {
      const currentOrder = activeOrderRef.current;
      if (!currentOrder) return;
      
      const hasDishInOrder =
        (currentOrder.dishes?.length || 0) > 0;
      const orderStart = new Date(
        currentOrder.orderTime,
      ).getTime();
      const tariffEnd =
        orderStart + currentOrder.duration * 60 * 1000;
      
      // Cooldown рассчитывается от времени последнего TableOrder, если есть блюда
      const cooldownStart = hasDishInOrder && currentOrder.lastTableOrderTime
        ? new Date(currentOrder.lastTableOrderTime).getTime()
        : orderStart;
      const cooldownEnd = cooldownStart + 5 * 60 * 1000;
      
      const now = Date.now();
      setTariffMs(Math.max(0, tariffEnd - now));
      setCooldownMs(Math.max(0, cooldownEnd - now));
    };
    
    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [activeOrder]);

  const formatMs = (ms: number) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return h > 0
      ? `${pad(h)}:${pad(m)}:${pad(s)}`
      : `${pad(m)}:${pad(s)}`;
  };

  const handleDishToggle = (dishId: number) => {
    setSelectedDishes((prev) => {
      if (prev.includes(dishId)) {
        return prev.filter((id) => id !== dishId);
      }

      const persons = activeOrder?.persons ?? 1;
      const limit = persons * 2;

      if (prev.length >= limit) {
        setError(`Можно выбрать не более ${limit} блюд за один заказ`);
        return prev;
      }

      setError(null);
      return [...prev, dishId];
    });
  };

  const handleOrder = async () => {
    if (!tableId || selectedDishes.length === 0) return;

    try {
      setOrdering(true);
      setError(null);

      for (const dishId of selectedDishes) {
        await api.orderDish(Number(tableId), dishId);
      }

      setSelectedDishes([]);
      setShowSuccess(true);
      await fetchActiveOrder();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ошибка при оформлении заказа',
      );
    } finally {
      setOrdering(false);
    }
  };

  return {
    dishes,
    loading,
    error,
    setError,
    selectedDishes,
    ordering,
    activeOrder,
    tariffMs,
    cooldownMs,
    formatMs,
    handleDishToggle,
    handleOrder,
    showSuccess,
    setShowSuccess,
    fetchActiveOrder,
  };
}

