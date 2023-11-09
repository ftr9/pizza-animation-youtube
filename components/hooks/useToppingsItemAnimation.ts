import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { EIGHTY_PER_OF_SC_WIDTH } from '../../constants/ContentsWidth';
import { IAvailableToppings } from '../../types';
const NAVBAR_HEIGHT = 32;

const useToppingsItemAnimation = (
  isToppingsInDropAreaSharedValue: SharedValue<boolean>,
  setSelectedToppings: React.Dispatch<
    React.SetStateAction<IAvailableToppings[]>
  >,
  toppingsName: IAvailableToppings
) => {
  const toppingItemPosXSharedVal = useSharedValue(0);
  const toppingItemPosYSharedVal = useSharedValue(0);
  const isPressedSharedValue = useSharedValue(false);

  const toppingAnimatedXAndYAndScale = useAnimatedStyle(() => {
    const scaleFactor = withTiming(isPressedSharedValue.value ? 2 : 1, {
      duration: 100,
    });
    return {
      transform: [
        { translateX: toppingItemPosXSharedVal.value },
        { translateY: toppingItemPosYSharedVal.value },
        { scale: scaleFactor },
      ],
    };
  });

  const _setToppings = () => {
    setSelectedToppings(prevToppings => {
      const newToppings = [...prevToppings];
      newToppings.push(toppingsName);
      return newToppings;
    });
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressedSharedValue.value = true;
    })
    .onChange(e => {
      //check if toppings has entered pizza drop zone
      if (e.absoluteY < EIGHTY_PER_OF_SC_WIDTH + NAVBAR_HEIGHT) {
        isToppingsInDropAreaSharedValue.value = true;
      } else {
        isToppingsInDropAreaSharedValue.value = false;
      }
      toppingItemPosXSharedVal.value = e.translationX;
      toppingItemPosYSharedVal.value = e.translationY;
    })
    .onFinalize(() => {
      //if toppings are dropped in pizza Area update toppings array
      if (isToppingsInDropAreaSharedValue.value) {
        runOnJS(_setToppings)();
      }
      isToppingsInDropAreaSharedValue.value = false;
      isPressedSharedValue.value = false;
      toppingItemPosXSharedVal.value = 0;
      toppingItemPosYSharedVal.value = 0;
    });

  return { pan, toppingAnimatedXAndYAndScale };
};

export default useToppingsItemAnimation;
