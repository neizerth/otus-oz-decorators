import { useForm } from 'react-hook-form';
import * as C from './CreateOrderPage.components';
import { Modal } from '../Modal';
import { Button } from '../Button';
import {
  type CreateOrderFormData,
  useCreateOrderState,
} from './useCreateOrderState';

export function CreateOrderPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormData>();

  const {
    tables,
    menuSets,
    loading,
    error,
    creating,
    showSuccess,
    setShowSuccess,
    setError,
    onSubmit,
  } = useCreateOrderState(reset);

  const selectedMenuSetId = watch('menuSetId');
  const validMenuSetId = selectedMenuSetId && !isNaN(Number(selectedMenuSetId)) 
    ? Number(selectedMenuSetId) 
    : null;

  if (loading) return <div>Загрузка...</div>;

  return (
    <C.Container>
      <h1>Создать заказ</h1>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Заказ создан!"
        text="Заказ успешно создан"
      />

      {error && <C.ErrorBox>{error}</C.ErrorBox>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <C.FormGrid>
          <div>
            <C.Label>Выберите стол:</C.Label>
            <C.Select
              {...register('tableId', {
                required: 'Выберите стол',
                valueAsNumber: true,
              })}
            >
              <option value="">-- Выберите стол --</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Столик #{table.number}
                </option>
              ))}
            </C.Select>
            {errors.tableId && <C.ErrorBox>{errors.tableId.message}</C.ErrorBox>}
          </div>

          <div>
            <C.Label>Выберите набор (тариф):</C.Label>
            <C.Select
              {...register('menuSetId', {
                required: 'Выберите набор',
                valueAsNumber: true,
              })}
            >
              <option value="">-- Выберите набор --</option>
              {menuSets.map((menuSet) => (
                <option key={menuSet.id} value={menuSet.id}>
                  {menuSet.name}
                  {menuSet.dishes && menuSet.dishes.length > 0
                    ? ` (${menuSet.dishes.length} блюд)`
                    : ''}
                </option>
              ))}
            </C.Select>
            {errors.menuSetId && (
              <C.ErrorBox>{errors.menuSetId.message}</C.ErrorBox>
            )}
            {validMenuSetId && (
              <C.DishesBox>
                <C.Label>Блюда в наборе:</C.Label>
                {menuSets
                  .find((ms) => ms.id === validMenuSetId)
                  ?.dishes?.map((dish) => (
                    <C.DishItem key={dish.id}>• {dish.name}</C.DishItem>
                  )) || <C.DishItem>Загрузка блюд...</C.DishItem>}
              </C.DishesBox>
            )}
          </div>

          <div>
            <C.Label>Выберите продолжительность:</C.Label>
            <C.Select
              {...register('duration', {
                required: 'Выберите продолжительность',
                valueAsNumber: true,
              })}
            >
              <option value="">-- Выберите продолжительность --</option>
              <option value="60">60 минут</option>
              <option value="90">90 минут</option>
              <option value="120">120 минут</option>
            </C.Select>
            {errors.duration && (
              <C.ErrorBox>{errors.duration.message}</C.ErrorBox>
            )}
          </div>

          <div>
            <C.Label>Количество персон:</C.Label>
            <C.Select
              {...register('persons', {
                required: 'Укажите количество персон',
                valueAsNumber: true,
              })}
            >
              <option value="">-- Количество персон --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </C.Select>
            {errors.persons && (
              <C.ErrorBox>{errors.persons.message}</C.ErrorBox>
            )}
          </div>
        </C.FormGrid>

        <Button type="submit" disabled={creating}>
          {creating ? 'Создание заказа...' : 'Создать заказ'}
        </Button>
      </form>
    </C.Container>
  );
}

