import { MenuVariation } from '../types/menu';

interface ItemVariationSelectorProps {
  variations: MenuVariation[];
  selectedVariations: Record<string, string>;
  onVariationChange: (type: string, value: string) => void;
}

export default function ItemVariationSelector({
  variations,
  selectedVariations,
  onVariationChange,
}: ItemVariationSelectorProps) {
  // Group variations by type
  const variationsByType = variations.reduce((acc, variation) => {
    if (!acc[variation.type]) {
      acc[variation.type] = [];
    }
    acc[variation.type].push(variation);
    return acc;
  }, {} as Record<string, MenuVariation[]>);

  return (
    <div className="space-y-4">
      {Object.entries(variationsByType).map(([type, options]) => (
        <div key={type} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {type}
          </label>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => onVariationChange(type, option.id)}
                className={`px-4 py-2 rounded-full text-sm
                  ${
                    selectedVariations[type] === option.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
              >
                {option.name}
                {option.price_variation !== '0' && 
                  ` (+$${parseFloat(option.price_variation).toFixed(2)})`
                }
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 