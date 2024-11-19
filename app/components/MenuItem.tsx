import Image from 'next/image';
import { MenuItem as MenuItemType } from "../api/types";
import { getImageUrl } from "../api/menu";

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onAddQuantity: (item: MenuItemType) => void;
  onDeductQuantity: (item: MenuItemType) => void;
}

export default function MenuItemCard({
  item,
  quantity,
  onAddQuantity,
  onDeductQuantity,
}: MenuItemProps) {
  return (
    <li className={`border-2 p-4 rounded-lg flex flex-col h-full 
      transition-[background-color,border-color,shadow] duration-200 ${
      quantity > 0 
        ? 'border-teal-400 shadow-lg shadow-teal-100 bg-teal-50' 
        : 'border-transparent hover:shadow-md hover:border-teal-200 bg-white'
    }`}>
      <div className="relative w-full h-32 mb-4">
        <Image 
          src={getImageUrl(item)} 
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
      
      {quantity > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-2 w-full">
          <button
            onClick={() => onDeductQuantity(item)}
            className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {quantity === 1 ? '🗑️' : '-'}
          </button>
          <span className="font-bold text-teal-600 flex items-center justify-center bg-teal-50 rounded-lg">
            {quantity}
          </span>
          <button
            onClick={() => onAddQuantity(item)}
            className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAddQuantity(item)}
          className="mt-4 w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          Add to Cart
        </button>
      )}
    </li>
  );
} 