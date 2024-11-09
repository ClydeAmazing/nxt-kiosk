import { MenuData } from "./types";

// Simulating an API call to get the menu data
const menuData = {
    categories: [
      { id: '1', name: 'Burgers' },
      { id: '2', name: 'Drinks' },
      { id: '3', name: 'Sides' },
      { id: '4', name: 'Desserts' },
    ],
    items: [
      {
        id: '101',
        name: 'Big Mac',
        category: 'Burgers',
        price: 3.99,
        description: 'Two beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
        image: '/mock-images/big-mac.jpg'
      },
      {
        id: '102',
        name: 'Quarter Pounder',
        category: 'Burgers',
        price: 4.49,
        description: 'Quarter pound of 100% beef, with cheese, pickles, onions, ketchup, and mustard on a sesame seed bun.',
        image: '/mock-images/quarter-pounder.jpg'
      },
      {
        id: '201',
        name: 'Coke',
        category: 'Drinks',
        price: 1.49,
        description: 'Refreshing soft drink.',
        image: '/mock-images/coca-cola.jpg'
      },
      {
        id: '202',
        name: 'Sprite',
        category: 'Drinks',
        price: 1.49,
        description: 'Crisp, refreshing lemon-lime flavored soft drink.',
        image: '/mock-images/sprite.png'
      },
      {
        id: '301',
        name: 'French Fries',
        category: 'Sides',
        price: 1.89,
        description: 'Crispy golden fries, seasoned to perfection.',
        image: '/mock-images/french-fries.png'
      },
      {
        id: '401',
        name: 'McFlurry',
        category: 'Desserts',
        price: 2.49,
        description: 'Creamy vanilla soft serve with mix-ins.',
        image: '/mock-images/mcflurry.png'
      },
    ],
  };
  
  export const fetchMenu = (): Promise<MenuData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(menuData);
      }, 1000); // Simulating network delay
    });
  };