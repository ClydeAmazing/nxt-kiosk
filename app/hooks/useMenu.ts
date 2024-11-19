import { useState, useEffect } from 'react';
import { MenuData } from '../api/types';
import { menuService } from '../services/menuService';

export function useMenu() {
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const data = await menuService.getMenu(abortController.signal);
        setMenuData(data);
        setError(null);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch menu'));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMenu();

    return () => {
      abortController.abort();
    };
  }, []);

  return { menuData, isLoading, error };
} 