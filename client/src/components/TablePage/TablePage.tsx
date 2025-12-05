import { useParams } from 'react-router-dom';
import * as C from './TablePage.components';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { useTableState } from './useTableState';

export function TablePage() {
  const { tableId } = useParams<{ tableId: string }>();
  const {
    dishes,
    loading,
    error,
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
  } = useTableState(tableId ? Number(tableId) : undefined);

  if (loading) return <div>Загрузка...</div>;
  if (error && !dishes.length) return <div>Ошибка: {error}</div>;

  return (
    <C.Container>
      <h1>Столик #{tableId}</h1>
      <h2>Выберите блюда</h2>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Заказ создан!"
        text="Заказ успешно создан"
      />

      {activeOrder && (
        <C.TimerBox>
          <C.TimerItem>
            Осталось по тарифу: {formatMs(tariffMs)}
          </C.TimerItem>
        </C.TimerBox>
      )}

      {error && <C.ErrorBox>{error}</C.ErrorBox>}

      {cooldownMs > 0 ? (
        <C.WarningBox>
          ⏳ До следующего заказа нужно подождать: {formatMs(cooldownMs)}
        </C.WarningBox>
      ) : (
        <>
          <C.DishesGrid>
            {dishes.map((dish) => (
              <C.DishCard
                key={dish.id}
                selected={selectedDishes.includes(dish.id)}
                onClick={() => handleDishToggle(dish.id)}
              >
                <C.DishContent>
                  <C.Checkbox
                    type="checkbox"
                    checked={selectedDishes.includes(dish.id)}
                    onChange={() => handleDishToggle(dish.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div style={{ flex: 1 }}>
                    <C.DishName>{dish.name}</C.DishName>
                    {dish.description && (
                      <C.DishDescription>{dish.description}</C.DishDescription>
                    )}
                  </div>
                </C.DishContent>
              </C.DishCard>
            ))}
          </C.DishesGrid>

          {selectedDishes.length > 0 && (
            <C.OrderButton>
              <Button onClick={handleOrder} disabled={ordering}>
                {ordering
                  ? 'Оформление заказа...'
                  : `Заказать (${selectedDishes.length})`}
              </Button>
            </C.OrderButton>
          )}
        </>
      )}

      {activeOrder &&
        activeOrder.dishes &&
        activeOrder.dishes.length > 0 && (
          <C.HistorySection>
            <C.HistoryTitle>Заказанные блюда</C.HistoryTitle>
            <C.HistoryList>
              <C.HistoryItem>
                <C.HistoryItemHeader>
                  <C.HistoryItemDate>
                    {new Date(activeOrder.orderTime).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </C.HistoryItemDate>
                  <C.HistoryItemMenuSet>
                    {activeOrder.menuSet?.name || 'Неизвестный набор'}
                  </C.HistoryItemMenuSet>
                </C.HistoryItemHeader>
                <C.HistoryItemDishes>
                  {activeOrder.dishes.map((dish) => dish.name).join(', ')}
                </C.HistoryItemDishes>
              </C.HistoryItem>
            </C.HistoryList>
          </C.HistorySection>
        )}
    </C.Container>
  );
}

