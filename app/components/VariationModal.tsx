import { useState } from "react";
import { MenuItem } from "@/app/types";

interface VariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onConfirm: (variation: string, quantity: number) => void;
}

export default function VariationModal({ isOpen, onClose, item, onConfirm }: VariationModalProps) {
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{item.name} Options</h2>
        
        <div className="mb-4">
          {/* <div className="font-medium mb-2">{item.variationType}</div> */}
          {item.variations?.map((variation) => (
            <label key={variation.name} className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="variation"
                value={variation.name}
                checked={selectedVariation === variation.name}
                onChange={(e) => setSelectedVariation(e.target.value)}
              />
              {variation.name}
            </label>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center border rounded-full"
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center border rounded-full"
          >
            +
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedVariation) {
                onConfirm(selectedVariation, quantity);
              }
            }}
            disabled={!selectedVariation}
            className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 