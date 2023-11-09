import { DimensionValue } from 'react-native';

export interface IPIZZAS {
  imageUri: any;
  name: string;
  price: number;
  rating: number;
}

export type IAbsolutePositionDimensionValues = {
  top?: DimensionValue;
  left?: DimensionValue;
  bottom?: DimensionValue;
  right?: DimensionValue;
};

export interface IParticleImage {
  index: number;
  top?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  imageUrl: any;
}

export type IAvailableToppings =
  | 'chilli'
  | 'mushroom'
  | 'olive'
  | 'peas'
  | 'pickle';

export interface IToppingsData {
  imageUrl: any;
  index: number;
  name: IAvailableToppings;
}
