import { useEffect, useState } from 'react';
import { api, type MenuSet, type Table } from '../../api';

export type CreateOrderFormData = {
  tableId: number;
  menuSetId: number;
  duration: number;
  persons: number;
};

export function useCreateOrderState(
  onReset: () => void,
) {
  const [tables, setTables] = useState<Table[]>([]);
  const [menuSets, setMenuSets] = useState<MenuSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tablesData, menuSetsData] = await Promise.all([
          api.getTables(),
          api.getMenuSets(),
        ]);
        setTables(tablesData);
        setMenuSets(menuSetsData);
      } catch {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: CreateOrderFormData) => {
    try {
      setCreating(true);
      setError(null);
      await api.createOrder(
        data.tableId,
        data.menuSetId,
        data.duration,
        data.persons,
      );
      setShowSuccess(true);
      onReset();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ошибка при создании заказа',
      );
    } finally {
      setCreating(false);
    }
  };

  return {
    tables,
    menuSets,
    loading,
    error,
    creating,
    showSuccess,
    setShowSuccess,
    setError,
    onSubmit,
  };
}

