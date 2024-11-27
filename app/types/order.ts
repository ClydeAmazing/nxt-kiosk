import { MenuItem } from "./menu";

export enum OrderType {
  DineIn = "DINE_IN",
  TakeOut = "TAKE_OUT",
}

export interface SelectedVariations {
  [groupId: string]: string[]; // Array of variation IDs for each group
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariations?: SelectedVariations;
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