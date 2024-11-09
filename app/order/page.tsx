"use client";

import { useEffect, useState } from "react";
import { useOrderContext } from "../context/OrderContext";

import { fetchMenu } from "../api/menu";
import { MenuData, MenuItem } from "../api/types";
import Cart from "../components/Cart";
import { useRouter } from "next/navigation";

export default function OrderPage() {
    const router = useRouter();
    const { addToCart, cartItems, clearCart } = useOrderContext();
    const [ menu, setMenu ] = useState<MenuData>({ categories: [], items: [] });
    const [ selectedCategory, setSelectedCategory ] = useState<string>('Burgers');
    const [ selectedItem, setSelectedItem ] = useState<MenuItem | null>(null);
    const [ quantity, setQuantity ] = useState<number>(0);
    const [ showCart, setShowCart ] = useState<boolean>(true);

    useEffect(() => {
        const loadMenu = async () => {
            const menuData = await fetchMenu();
            setMenu(menuData);
        }

        loadMenu();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredItems = menu.items.filter(item => item.category === selectedCategory);

    const handleItemSelect = (item: MenuItem) => {
        setSelectedItem(item);

        const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
        setQuantity(existingCartItem ? existingCartItem.quantity : 0); // Reset quantity when selecting a new item
    };

    const handleAddToCart = () => {
        if (!selectedItem) {
            return
        }

        const existingCartItem = cartItems.find(cartItem => cartItem.id === selectedItem.id)

        // setSelectedItem(null);
        const newQuantity = existingCartItem ? existingCartItem?.quantity + 1 : 1
        setQuantity(newQuantity)

        addToCart({
            ...selectedItem,
            quantity: 1,
        });
    }

    const handleClearCart = () => {
        clearCart();
    };

    const handleProceedToPayment = () => {
      if (cartItems.length > 0){
          router.push('/payment');
      }else{
          alert("Your cart is empty. Please add items before proceeding to payment.")
      }
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header (optional) */}
            <header className="p-4 bg-gray-800 text-white">
                <h1 className="text-3xl font-bold">Welcome to Our Kiosk</h1>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-y-auto h-screen">
                {/* Sidebar */}
                <aside className="w-1/4 bg-gray-200 p-4">
                    <h2 className="font-bold text-xl mb-4">Categories</h2>
                    <ul>
                        {menu.categories.map((category) => (
                            <li
                                key={category.id}
                                className="mb-2 cursor-pointer hover:text-blue-600"
                                onClick={() => handleCategoryChange(category.name)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Menu Area */}
                <main className="p-4 flex-1 flex flex-col h-full">
                    <h1 className="text-2xl font-bold mb-4">{selectedCategory}</h1>
                    <div className="flex-grow">
                        {/* Grid of Menu Items */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="border p-4 rounded cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleItemSelect(item)}
                                >
                                    <h2 className="font-semibold text-lg">
                                        {item.name} - ${item.price.toFixed(2)}
                                    </h2>
                                    <p>{item.description}</p>
                                    {/* Quantity Selector & Add to Cart */}
                                    {selectedItem && selectedItem.id == item.id && (
                                        <div className="mt-4">
                                            <h3 className="font-bold">Quantity</h3>
                                            <input
                                                type="number"
                                                value={quantity}
                                                min="1"
                                                readOnly
                                                // onChange={(e) => setQuantity(Number(e.target.value))}
                                                className="border p-2 rounded w-20"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart();
                                                }}
                                                className="ml-2 bg-blue-500 text-white p-2 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Footer with Clear Cart and Proceed to Payment */}
                    <div className="bg-white border-t border-gray-300 p-4">
                        <div className="flex justify-between">
                            <button onClick={handleClearCart} className="bg-red-500 text-white py-2 px-4 rounded">
                                Clear Cart
                            </button>
                            <button onClick={handleProceedToPayment} className="bg-green-500 text-white py-2 px-4 rounded">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </main>

                {/* Cart Component */}
                <Cart />
            </div>
        </div>
    )
}

