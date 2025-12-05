const API_BASE = 'http://localhost:3000/api';

export interface Dish {
  id: number;
  name: string;
  description: string | null;
}

export interface Table {
  id: number;
  number: number;
}

export interface MenuSet {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  dishes?: Dish[];
}

export interface TableOrder {
  id: number;
  orderTime: string;
  dishes: Dish[];
}

export interface Order {
  id: number;
  orderTime: string;
  duration: number;
  persons: number;
  menuSet?: MenuSet;
  table?: Table;
  dishes?: Dish[];
  lastTableOrderTime?: string | null;
  tableOrders?: TableOrder[];
}

export const api = {
  getDishes: async (): Promise<Dish[]> => {
    const response = await fetch(`${API_BASE}/dishes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dishes: ${response.statusText}`);
    }
    const text = await response.text();
    if (!text || text.trim() === '') {
      return [];
    }
    return JSON.parse(text);
  },

  getTable: async (id: number): Promise<Table> => {
    const response = await fetch(`${API_BASE}/tables/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch table: ${response.statusText}`);
    }
    const text = await response.text();
    if (!text || text.trim() === '') {
      throw new Error('Empty response from server');
    }
    return JSON.parse(text);
  },

  getTables: async (): Promise<Table[]> => {
    const response = await fetch(`${API_BASE}/tables`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tables: ${response.statusText}`);
    }
    const text = await response.text();
    if (!text || text.trim() === '') {
      return [];
    }
    return JSON.parse(text);
  },

  getMenuSets: async (): Promise<MenuSet[]> => {
    const response = await fetch(`${API_BASE}/menu-sets`);
    if (!response.ok) {
      throw new Error(`Failed to fetch menu sets: ${response.statusText}`);
    }
    const text = await response.text();
    if (!text || text.trim() === '') {
      return [];
    }
    return JSON.parse(text);
  },

  createOrder: async (
    tableId: number,
    menuSetId: number,
    duration: number,
    persons: number,
  ): Promise<void> => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, menuSetId, duration, persons }),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      const error = contentType?.includes('application/json')
        ? await response.json().catch(() => ({
            message: response.statusText,
          }))
        : { message: response.statusText };
      throw new Error(error.message || 'Ошибка при создании заказа');
    }
  },

  getActiveOrderByTableNumber: async (
    tableNumber: number,
  ): Promise<Order | null> => {
    const response = await fetch(
      `${API_BASE}/orders/tables/${tableNumber}/active`,
    );

    if (!response.ok) {
      if (response.status === 404 || response.status === 400) {
        return null;
      }
      const contentType = response.headers.get('content-type');
      const error = contentType?.includes('application/json')
        ? await response.json().catch(() => ({
            message: response.statusText,
          }))
        : { message: response.statusText };
      throw new Error(error.message || 'Ошибка при получении заказа');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return null;
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      return null;
    }

    try {
      const data = JSON.parse(text);
      return data || null;
    } catch {
      return null;
    }
  },

  orderDish: async (
    tableNumber: number,
    dishId: number,
  ): Promise<void> => {
    const response = await fetch(
      `${API_BASE}/orders/tables/${tableNumber}/order-dish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishId }),
      },
    );

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      const error = contentType?.includes('application/json')
        ? await response.json().catch(() => ({
            message: response.statusText,
          }))
        : { message: response.statusText };
      throw new Error(error.message || 'Ошибка при заказе блюда');
    }
  },
};

