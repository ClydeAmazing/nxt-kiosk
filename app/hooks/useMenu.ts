import { useState, useEffect, useRef } from 'react';
import { MenuData } from '@/app/types';
import { menuService } from '../services/menuService';

export function useMenu() {
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchStarted = useRef(false);

  useEffect(() => {
    if (fetchStarted.current) return;
    fetchStarted.current = true;
    
    console.log('Starting menu fetch...');
    
    async function fetchMenu() {
      try {
        const data = await menuService.getMenu();
        console.log('Menu fetch successful:', data);
        setMenuData(data);
      } catch (err) {
        console.error('Menu fetch error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch menu'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return { menuData, isLoading, error };
} 