import { MenuCategory } from "@/app/types";

interface CategorySidebarProps {
  categories: MenuCategory[];
  selectedCategory: MenuCategory | undefined;
  onSelectCategory: (category: MenuCategory) => void;
}

export default function CategorySidebar({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySidebarProps) {
  return (
    <aside className="w-48 bg-white border-r border-gray-200">
      <nav className="sticky top-0">
        <ul className="py-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full px-4 py-2 text-left transition-colors ${
                  selectedCategory?.id === category.id
                    ? 'bg-teal-50 text-teal-600 font-medium'
                    : 'hover:bg-teal-50 text-gray-600 hover:text-teal-600'
                }`}
              >
                <span className="block truncate">
                  {category.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 