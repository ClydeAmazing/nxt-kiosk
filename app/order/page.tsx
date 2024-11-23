"use client";

import { useEffect, useState } from "react";
import { useOrderContext } from "../context/OrderContext";
import { MenuCategory, MenuData, MenuItem } from "@/app/types";
import Cart from "../components/Cart";
import { useRouter } from "next/navigation";
import MenuItemCard from "../components/MenuItem";
import CategorySidebar from "../components/CategorySidebar";
import { useMenu } from "../hooks/useMenu";
import MenuSkeleton from '../components/MenuSkeleton';

export default function OrderPage() {
    const { menuData, isLoading, error } = useMenu();
    const { orderType, addToCart, cartItems } = useOrderContext();
    const router = useRouter();
    const [ selectedCategory, setSelectedCategory ] = useState<MenuCategory>();

    useEffect(() => {
        if (menuData.categories.length > 0 && !selectedCategory) {
            setSelectedCategory(menuData.categories[0]);
        }
    }, [menuData.categories, selectedCategory]);

    useEffect(() => {
        if (!orderType) {
            router.push('/');
        }
    }, [orderType, router]);

    if (!orderType) {
        return null;
    }

    if (isLoading) {
        return <MenuSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600">Error loading menu: {error.message}</div>
            </div>
        );
    }

    const handleCategoryChange = (category: MenuCategory) => {
        setSelectedCategory(category);
    };

    const filteredItems = menuData.items.filter(item => item.category === selectedCategory?.id);

    return (
        <div className="h-screen flex flex-col">
            {/* Main Content Area */}
            <div className="flex flex-1 overflow-y-auto h-screen">
                {/* Sidebar */}
                <CategorySidebar
                    categories={menuData.categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />

                {/* Main Menu Area */}
                <main className="p-4 flex-1 flex flex-col h-full">
                    <h1 className="text-2xl font-bold mb-4">{selectedCategory?.name}</h1>
                    <div className="flex-grow">
                        {/* Grid of Menu Items */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </ul>
                    </div>
                    {/* Cart Component */}
                    <Cart />
                </main>
            </div>
        </div>
    )
}

