import { create } from 'zustand';

import { IPIZZAS } from '../types';

interface IUsePizzaStore {
  pizzas: IPIZZAS[];
  activeIndex: number;
  setActivePizzaIndex: (index: number) => void;
}

const pizzas: IPIZZAS[] = [
  {
    imageUri: require('../assets/pizza/pizza-2.png'),
    name: 'Pizza 1',
    price: 12,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-3.png'),
    name: 'Pizza 2',
    price: 17,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-4.png'),
    name: 'Pizza 3',
    price: 18,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-5.png'),
    name: 'Pizza 4',
    price: 19,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-6.png'),
    name: 'Pizza 5',
    price: 20,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-8.png'),
    name: 'Pizza 6',
    price: 23,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-9.png'),
    name: 'Pizza 7',
    price: 24,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-1.png'),
    name: 'Pizza 8',
    price: 12,
    rating: 5,
  },
  {
    imageUri: require('../assets/pizza/pizza-0.png'),
    name: 'Pizza 9',
    price: 23,
    rating: 5,
  },
];

const usePizzaStore = create<IUsePizzaStore>(set => {
  return {
    pizzas: pizzas,
    activeIndex: 0,
    setActivePizzaIndex: (index: number) => {
      set(state => {
        const newState = { ...state };
        newState.activeIndex = index;
        return newState;
      });
    },
  };
});

export default usePizzaStore;
