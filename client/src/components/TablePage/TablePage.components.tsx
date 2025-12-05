import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ErrorBox = styled.div`
  padding: 10px;
  background: #fee;
  color: #c00;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const DishesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

export const DishCard = styled.div<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  background: ${(p) => (p.selected ? '#e3f2fd' : 'white')};
  flex: 0 0 calc(33.333% - 11px);
  min-width: 250px;
`;

export const DishContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 2px;
`;

export const DishName = styled.h3`
  margin: 0;
  margin-bottom: 4px;
  font-size: 16px;
`;

export const DishDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

export const OrderButton = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px;
  border-top: 1px solid #ddd;
`;

export const TimerBox = styled.div`
  margin: 12px 0 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const TimerItem = styled.div`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f5f5f5;
  font-size: 14px;
`;

export const HistorySection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

export const HistoryTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 18px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HistoryItem = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

export const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const HistoryItemDate = styled.div`
  font-size: 14px;
  color: #666;
`;

export const HistoryItemMenuSet = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const HistoryItemDishes = styled.div`
  font-size: 13px;
  color: #555;
  margin-top: 4px;
`;

export const WarningBox = styled.div`
  padding: 16px;
  background: #fff3cd;
  color: #856404;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ffc107;
  font-size: 16px;
  font-weight: 500;
`;

