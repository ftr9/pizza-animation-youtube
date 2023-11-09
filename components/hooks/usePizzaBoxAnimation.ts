import {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  runOnJS,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import useCartStore from '../../store/Cart.store';
import usePizzaStore from '../../store/Pizza.store';

const usePizzaBoxAnimation = (
  setAddToCartClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const addToCartStore = useCartStore(state => state.addToCard);
  const [activePizzaIndex, pizzasData] = usePizzaStore(state => [
    state.activeIndex,
    state.pizzas,
  ]);

  //for box front cover only
  const yBoxCoverPosShared = useSharedValue(-100);
  const yBoxCoverRotateShared = useSharedValue(125);
  const scaleBoxSharedValue = useSharedValue(1);

  //for fullBox
  const fullBoxXPos = useSharedValue(0);
  const fullBoxYPos = useSharedValue(0);
  const fullBoxOpacity = useSharedValue(1);

  const addToCartStoreAndSetCartClicked = () => {
    setAddToCartClicked(false);
    addToCartStore(pizzasData[activePizzaIndex]);
  };

  const animatedBoxCoverStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 390 },
        { translateY: yBoxCoverPosShared.value },
        { rotateX: `${yBoxCoverRotateShared.value}deg` },
      ],
    };
  });

  const fullBoxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleBoxSharedValue.value },
        { translateX: fullBoxXPos.value },
        { translateY: fullBoxYPos.value },
      ],
      opacity: fullBoxOpacity.value,
    };
  });

  useEffect(() => {
    //Animated box when it renders for the first time
    runOnUI(() => {
      //Close the box
      yBoxCoverPosShared.value = withDelay(
        300,
        withTiming(-2, { duration: 500 })
      );
      yBoxCoverRotateShared.value = withDelay(
        300,
        withTiming(41, { duration: 500 })
      );

      //scale it down
      scaleBoxSharedValue.value = withDelay(
        1000,
        withTiming(0.8, { duration: 500 })
      );

      //move towards the cart icon
      fullBoxXPos.value = withDelay(1800, withTiming(150, { duration: 200 }));
      fullBoxYPos.value = withDelay(1800, withTiming(-150, { duration: 200 }));

      //make it invisible
      fullBoxOpacity.value = withDelay(
        1800,
        withTiming(0, { duration: 300 }, () => {
          runOnJS(addToCartStoreAndSetCartClicked)();
        })
      );
    })();
  }, []);

  return { fullBoxAnimatedStyle, animatedBoxCoverStyle };
};

export default usePizzaBoxAnimation;
