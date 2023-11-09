import { IAvailableToppings } from '../../types';
const availabletoppingsImages: Record<IAvailableToppings, { imageUrl: any }> = {
  chilli: {
    imageUrl: require('../../assets/pizza/chili_unit.png'),
  },
  mushroom: {
    imageUrl: require('../../assets/pizza/mushroom_unit.png'),
  },
  olive: {
    imageUrl: require('../../assets/pizza/olive_unit.png'),
  },
  peas: {
    imageUrl: require('../../assets/pizza/pea_unit.png'),
  },
  pickle: {
    imageUrl: require('../../assets/pizza/pickle_unit.png'),
  },
};

export default availabletoppingsImages;
