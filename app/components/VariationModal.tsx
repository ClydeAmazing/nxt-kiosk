import { useState, useEffect } from "react";
import { MenuItem } from "@/app/types";

interface SelectedVariations {
  [groupId: string]: string[]; // Array of variation IDs for each group
}

interface VariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onConfirm: (variations: SelectedVariations, quantity: number) => void; // Updated to handle multiple variations
}

export default function VariationModal({ isOpen, onClose, item, onConfirm }: VariationModalProps) {
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>(() => {
    const initial: SelectedVariations = {};
    item.expand?.variation_groups?.forEach(group => {
      initial[group.id] = [];
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      const initial: SelectedVariations = {};
      item.expand?.variation_groups?.forEach(group => {
        initial[group.id] = [];
      });
      setSelectedVariations(initial);
      setQuantity(1);
    }
  }, [isOpen, item]);

  const handleVariationChange = (groupId: string, variationId: string, checked: boolean) => {
    setSelectedVariations(prev => {
      const group = item.expand?.variation_groups?.find(g => g.id === groupId);
      if (!group) return prev;

      if (group.max_selections === 1) {
        // Radio button behavior
        return {
          ...prev,
          [groupId]: [variationId]
        };
      } else {
        // Checkbox behavior
        const currentSelections = prev[groupId] || [];
        const newSelections = checked
          ? [...currentSelections, variationId]
          : currentSelections.filter(id => id !== variationId);
        
        // Enforce max_selections limit
        if (group.max_selections && newSelections.length > group.max_selections) {
          return prev;
        }
        
        return {
          ...prev,
          [groupId]: newSelections
        };
      }
    });
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const isValid = () => {
    return item.expand?.variation_groups?.every(group => {
      const selections = selectedVariations[group.id] || [];
      if (group.required && selections.length === 0) return false;
      if (group.max_selections && selections.length > group.max_selections) return false;
      return true;
    });
  };

  const handleConfirm = (variations: SelectedVariations, quantity: number) => {
    // Handle the selected variations and quantity
    console.log('Selected variations:', variations);
    console.log('Quantity:', quantity);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{item.name} Options</h2>
        
        <div className="mb-4">
          {item.expand?.variation_groups?.map((variation_group) => (
            <div key={variation_group.id} className="mb-4">
              <div className="font-medium mb-2">
                {variation_group.name}
                {variation_group.required && <span className="text-red-500 ml-1">*</span>}
                {variation_group.max_selections > 1 && (
                  <span className="text-sm text-gray-500 ml-2">
                    (Select up to {variation_group.max_selections})
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                {variation_group.expand?.variations?.map((variation) => (
                  <label 
                    key={`${variation_group.id}-${variation.id}`}
                    className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type={variation_group.max_selections === 1 ? "radio" : "checkbox"}
                      name={`variation-${variation_group.id}`}
                      value={variation.id}
                      checked={selectedVariations[variation_group.id]?.includes(variation.id)}
                      onChange={(e) => handleVariationChange(
                        variation_group.id,
                        variation.id,
                        e.target.checked
                      )}
                      className={variation_group.max_selections === 1 ? "radio" : "checkbox"}
                    />
                    <span>{variation.name}</span>
                    {variation.price_variation !== "0" && (
                      <span className="text-gray-500">
                        ({Number(variation.price_variation) > 0 ? '+' : ''}
                        ${variation.price_variation})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
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
              if (isValid()) {
                onConfirm(selectedVariations, quantity);
                onClose();
              }
            }}
            disabled={!isValid()}
            className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 