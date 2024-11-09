// Define types for menu items and categories

export interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
  }
  
  export interface MenuCategory {
    id: string;
    name: string;
  }
  
  export interface MenuData {
    categories: MenuCategory[];
    items: MenuItem[];
  }