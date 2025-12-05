import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { api, type Dish } from './api';

const container = css`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const errorBox = css`
  padding: 10px;
  background: #fee;
  color: #c00;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const dishesGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const dishCard = (selected: boolean) => css`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  background: ${selected ? '#e3f2fd' : 'white'};
`;

const dishContent = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const checkbox = css`
  width: 20px;
  height: 20px;
  margin-top: 2px;
`;

const dishName = css`
  margin: 0;
  margin-bottom: 4px;
  font-size: 16px;
`;

const dishDescription = css`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const orderButton = css`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px;
  border-top: 1px solid #ddd;
`;

const button = (disabled: boolean) => css`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: ${disabled ? '#ccc' : '#1976d2'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
`;

export default function TablePage() {
  const { tableId } = useParams<{ tableId: string }>();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dishesData = await api.getDishes();
        setDishes(dishesData);
      } catch (err) {
        setError('Ошибка загрузки блюд');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDishToggle = (dishId: number) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId],
    );
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
      alert('Заказ успешно оформлен!');
    } catch (err: any) {
      setError(err.message || 'Ошибка при оформлении заказа');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error && !dishes.length) return <div>Ошибка: {error}</div>;

  return (
    <div css={container}>
      <h1>Столик #{tableId}</h1>
      <h2>Выберите блюда</h2>

      {error && <div css={errorBox}>{error}</div>}

      <div css={dishesGrid}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            css={dishCard(selectedDishes.includes(dish.id))}
            onClick={() => handleDishToggle(dish.id)}
          >
            <div css={dishContent}>
              <input
                type="checkbox"
                checked={selectedDishes.includes(dish.id)}
                onChange={() => handleDishToggle(dish.id)}
                onClick={(e) => e.stopPropagation()}
                css={checkbox}
              />
              <div style={{ flex: 1 }}>
                <h3 css={dishName}>{dish.name}</h3>
                {dish.description && (
                  <p css={dishDescription}>{dish.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDishes.length > 0 && (
        <div css={orderButton}>
          <button
            onClick={handleOrder}
            disabled={ordering}
            css={button(ordering)}
          >
            {ordering
              ? 'Оформление заказа...'
              : `Заказать (${selectedDishes.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
