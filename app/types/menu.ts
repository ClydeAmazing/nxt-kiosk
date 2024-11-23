export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  expand?: {
    variations: MenuVariation[];
  };
  variations: MenuVariation[];
}

export interface MenuVariation {
  id: string;
  name: string;
  type: string;
  price_variation: string;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
} 