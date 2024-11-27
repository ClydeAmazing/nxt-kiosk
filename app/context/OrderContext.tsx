"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, OrderContextType, OrderType } from "../types/order";


// Define a type for the context state
type ProductVariation = {
    name: string;  // e.g., "Size"
    options: string[];  // e.g., ["Small", "Medium", "Large"]
}

type Product = {
    id: string;
    name: string;
    price: number;
    // hasVariations: boolean;
    variations?: ProductVariation[];  // Available variation options
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provide the context to children components
export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orderType, setOrderType] = useState<OrderType | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => 
                cartItem.id === item.id && 
                JSON.stringify(cartItem.selectedVariations) === JSON.stringify(item.selectedVariations)
            );
            if (existingItem) {
                const newQuantity = existingItem.quantity + item.quantity;
                // Remove item if quantity becomes 0 or less
                if (newQuantity <= 0) {
                    return prevItems.filter(cartItem => cartItem.id !== item.id);
                }
                // Update quantity if item exists
                return prevItems.map(cartItem => 
                    cartItem.id === item.id && 
                    JSON.stringify(cartItem.selectedVariations) === JSON.stringify(item.selectedVariations)
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

    const openVariationModal = (product: Product) => {
        setSelectedProduct(product);
        setIsVariationModalOpen(true);
    };

    return (
        <OrderContext.Provider value={{ orderType, setOrderType, cartItems, addToCart, removeFromCart, clearCart, openVariationModal, isVariationModalOpen, selectedProduct }}>
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