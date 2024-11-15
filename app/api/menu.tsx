import PocketBase from 'pocketbase';

import { MenuItem, MenuCategory, MenuData } from "./types";

const pbURL = 'http://127.0.0.1:8090';
const pb = new PocketBase(pbURL);

export async function fetchMenu(): Promise<MenuData>{
  const categories = await pb.collection('categories').getFullList<MenuCategory>();

  const menuItems = await pb.collection('menu').getFullList<MenuItem>({
    sort: '-created',
  });
  
  const data:MenuData = {
    'categories': categories,
    'items': menuItems
  };

  return data;
}

export function getImageUrl(item: MenuItem): string {
  return `${pbURL}/api/files/menu/${item.id}/${item.image}`;
}