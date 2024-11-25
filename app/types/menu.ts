export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
} 

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  expand?: {
    variation_groups: VariationGroup[];
  };
  variation_groups: VariationGroup[];
}

export interface MenuVariation {
  id: string;
  name: string;
  price_variation: string;
}

export interface VariationGroup {
  id: string;
  name: string;
  description: string;
  required: boolean;
  max_selections: number;
  expand?: {
    variations: MenuVariation[];
  };
  variations: MenuVariation[];
}
