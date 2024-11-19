import { getPocketbaseInstance } from '../lib/pocketbase';
import { MenuItem, MenuCategory, MenuData } from '../api/types';

export class MenuService {
  private static instance: MenuService;
  private pb = getPocketbaseInstance();

  private constructor() {}

  public static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }

  async getMenu(signal?: AbortSignal): Promise<MenuData> {
    try {
      const [categories, menuItems] = await Promise.all([
        this.pb.collection('categories').getFullList<MenuCategory>({ signal }),
        this.pb.collection('menu').getFullList<MenuItem>({
          sort: '-created',
          expand: 'variations',
          signal
        })
      ]);

      const itemsWithVariations = menuItems.map(item => ({
        ...item,
        variations: item.expand?.variations || []
      }));

      return {
        categories,
        items: itemsWithVariations
      };
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  }

  getImageUrl(item: MenuItem): string {
    return `${this.pb.baseUrl}/api/files/menu/${item.id}/${item.image}`;
  }
}

// Export singleton instance
export const menuService = MenuService.getInstance(); 