"use client";

import { createContext, ReactNode, useContext, useState } from "react";


// Define a type for the context state
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

type OrderContextType = {
    orderType: string | null;
    setOrderType: (orderType: string) => void;
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provide the context to children components
export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orderType, setOrderType] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                const newQuantity = existingItem.quantity + item.quantity;
                // Remove item if quantity becomes 0 or less
                if (newQuantity <= 0) {
                    return prevItems.filter(cartItem => cartItem.id !== item.id);
                }
                // Update quantity if item exists
                return prevItems.map(cartItem => 
                    cartItem.id === item.id
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
                );
            }
            // Only add new item if quantity is positive
            if (item.quantity > 0) {
                return [...prevItems, item];
            }
            return prevItems;
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <OrderContext.Provider value={{ orderType, setOrderType, cartItems, addToCart, removeFromCart, clearCart }}>
            { children }
        </OrderContext.Provider>
    )
}

// Custom hook to use the OrderContext
export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("userOrderContext must be used within an OrderProvider")
    }
    return context
}