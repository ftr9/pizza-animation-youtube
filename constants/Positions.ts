import { DimensionValue } from 'react-native';
interface IToppingsPositions {
  top?: DimensionValue;
  left?: DimensionValue;
  bottom?: DimensionValue;
  right?: DimensionValue;
}
export const firstToppingsPositions: IToppingsPositions[] = [
  { top: '10%', left: '60%' },
  { bottom: '10%', left: '30%' },
  { top: '10%', left: '30%' },
  { top: '50%', left: '60%' },
  { top: '80%', left: '60%' },
  { top: '40%', left: '10%' },
  { top: '40%', left: '40%' },
  { top: '40%', left: '80%' },
];

export const secondToppingsPositions: IToppingsPositions[] = [
  { top: '10%', left: '45%' },
  { top: '22%', left: '15%' },
  { top: '40%', left: '30%' },
  { top: '35%', left: '60%' },
  { top: '65%', left: '60%' },
  { top: '50%', left: '10%' },
  { top: '20%', left: '70%' },
  { top: '75%', left: '20%' },
];
