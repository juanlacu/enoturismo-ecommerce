import { CartItem } from './cart-context';

export type OrderStatus = 'confirmado' | 'preparacion' | 'en_camino' | 'entregado';

export interface Order {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  notes: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

const STORAGE_KEY = 'ec_orders';

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function getRecentOrders(limit: number = 5): Order[] {
  const orders = getOrders();
  return orders.slice(1, limit);
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...orders]));
}
