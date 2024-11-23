import { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CartItem, OrderContextType } from "@/app/types";
import { menuService } from "@/app/services/menuService";
import ItemVariationSelector from './ItemVariationSelector';
import VariationModal from './VariationModal';
import { useOrderContext } from '../context/OrderContext';

interface MenuItemProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemProps) {
  const { orderType, addToCart, cartItems } = useOrderContext();
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);

  const getItemQuantity = (itemId: string, variations?: Record<string, string>) => {
    if (!variations) {
      // Sum up quantities for all variations of this item
      return cartItems
        .filter(item => item.id === itemId)
        .reduce((total, item) => total + item.quantity, 0);
    }

    // Find exact match with variations
    const item = cartItems.find(item =>
      item.id === itemId && JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
    );
    return item?.quantity || 0;
  };

  const quantity = getItemQuantity(item.id); // Get total quantity of item in cart

  const handleUpdateCart = (item: MenuItem, quantity: number, variations?: Record<string, string>) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      selectedVariations: variations
    });

    console.log(addToCart);
    console.log(variations);
  }

  const handleConfirmVariations = () => {
    handleUpdateCart(item, 1, selectedVariations);
    setIsVariationModalOpen(false);
  };

  const handleAddToCart = () => {
    if (item.variations && item.variations.length > 0) {
      setIsVariationModalOpen(true);
    } else {
      handleUpdateCart(item, 1);
    }
  };

  return (
    <>
      <div className={`border-2 p-4 rounded-lg flex flex-col h-full 
        transition-[background-color,border-color,shadow] duration-200 ${quantity > 0 ? 'border-teal-400 shadow-lg shadow-teal-100 bg-teal-50' : 'border-transparent hover:shadow-md hover:border-teal-200 bg-white'
        }`}>
        <div className="relative w-full h-32 mb-4">
          <Image
            src={menuService.getImageUrl(item)}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-bold text-lg text-gray-800 leading-tight">
              {item.name}
            </h2>
            <span className="font-semibold text-teal-600 text-lg">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed flex-grow">
            {item.description}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {quantity > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-2 w-full">
              <button
                onClick={() => {
                  handleUpdateCart(item, -1);
                }}
                className={`${quantity === 1
                  ? 'bg-rose-500 hover:bg-rose-600'
                  : 'bg-teal-600 hover:bg-teal-700'
                  } text-white py-2 rounded-lg transition-colors shadow-sm`}
              >
                {quantity === 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ) : '-'}
              </button>
              <span className="font-bold text-teal-600 flex items-center justify-center bg-teal-50 rounded-lg">
                {quantity}
              </span>
              <button
                onClick={() => {
                  handleUpdateCart(item, 1);
                }}
                className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <VariationModal
        isOpen={isVariationModalOpen}
        onClose={() => setIsVariationModalOpen(false)}
        item={item}
        onConfirm={handleConfirmVariations}
      />
    </>
  );
} 