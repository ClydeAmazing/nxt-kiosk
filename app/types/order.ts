import { MenuItem } from "./menu";

export type OrderType = 'DineIn' | 'TakeAway';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export interface OrderContextType {
  orderType: OrderType | null;
  setOrderType: (orderType: OrderType) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  currentOrderId?: string;
  setCurrentOrderId?: (id: string) => void;
  openVariationModal: (product: MenuItem) => void;
  isVariationModalOpen: boolean;
  selectedProduct: MenuItem | null;
} 