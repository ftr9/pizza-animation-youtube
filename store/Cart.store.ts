import { create } from 'zustand';

import { IPIZZAS } from '../types';

interface IuseCartStore {
  cart: IPIZZAS[];
  addToCard: (activeSelectedPizza: IPIZZAS) => void;
}

const useCartStore = create<IuseCartStore>(set => {
  return {
    cart: [],
    addToCard: (activeSelectedPizza: IPIZZAS) => {
      set(state => {
        const newCartState = { ...state };
        newCartState.cart.push(activeSelectedPizza);
        return newCartState;
      });
    },
  };
});

export default useCartStore;
