import { MenuItem, MenuCategory, MenuData } from '@/app/types';
import PocketBase from 'pocketbase';

export class MenuService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');
  }

  async getMenu(): Promise<MenuData> {
    try {
      const [categories, menuItems] = await Promise.all([
        this.pb.collection('categories').getFullList<MenuCategory>(),
        this.pb.collection('menu').getFullList<MenuItem>({
          sort: '-created',
          expand: 'variations',
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

// Export a simple instance
export const menuService = new MenuService(); 