import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { IAvailableToppings } from '../types';
import {
  EIGHTY_PER_OF_SC_WIDTH,
  SEVENTY_PER_OF_SC_WIDTH,
} from '../constants/ContentsWidth';
import PizzaBox from './PizzaBox';
import ToppingsUnit from './ToppingsUnit';
import availabletoppingsImages from '../constants/data/AvailableToppingsImage.data';
import {
  firstToppingsPositions,
  secondToppingsPositions,
} from '../constants/Positions';

interface IPizzaWithPlateProps {
  imageUrl: any;
  isAddToCartClicked: boolean;
  setAddToCartClicked: React.Dispatch<React.SetStateAction<boolean>>;
  pizzaId: string;
  isToppingsInDropAreaSharedValue: SharedValue<boolean>;
  selectedToppings: IAvailableToppings[];
}
const PizzaWithPlate = ({
  imageUrl,
  pizzaId,
  isAddToCartClicked,
  setAddToCartClicked,
  selectedToppings,
  isToppingsInDropAreaSharedValue,
}: IPizzaWithPlateProps) => {
  const scaleSharedValue = useSharedValue(1);
  const opacitySharedValue = useSharedValue(0);

  const scaledPizzaAndPlateAnim = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSharedValue.value }],
      opacity: opacitySharedValue.value,
    };
  });

  const animatedPlateAndPizzaStyle = useAnimatedStyle(() => {
    const scaleFactor = withTiming(
      isToppingsInDropAreaSharedValue.value ? 1.06 : 1,
      {
        duration: 500,
      }
    );
    return {
      transform: [{ scale: scaleFactor }],
    };
  });

  useEffect(() => {
    if (isAddToCartClicked) {
      scaleSharedValue.value = withTiming(0.4, { duration: 400 });
      opacitySharedValue.value = withTiming(0, { duration: 800 });
    } else {
      scaleSharedValue.value = withTiming(1);
      opacitySharedValue.value = withTiming(1);
    }
  }, [isAddToCartClicked]);

  return (
    <View
      style={[
        {
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: 'orange',
          width: '100%',
          height: EIGHTY_PER_OF_SC_WIDTH,
        },
      ]}
    >
      {isAddToCartClicked && (
        <PizzaBox setAddToCartClicked={setAddToCartClicked} />
      )}
      <Animated.Image
        sharedTransitionTag={`actualPizza-${pizzaId}`}
        resizeMode={'cover'}
        source={imageUrl}
        style={[
          {
            position: 'absolute',
            width: SEVENTY_PER_OF_SC_WIDTH,
            height: SEVENTY_PER_OF_SC_WIDTH,
            zIndex: 0,
          },
          animatedPlateAndPizzaStyle,
          scaledPizzaAndPlateAnim,
        ]}
      />
      <Animated.Image
        sharedTransitionTag="pizzaPlate"
        style={[
          {
            position: 'absolute',
            zIndex: -1,
            width: EIGHTY_PER_OF_SC_WIDTH,
            height: EIGHTY_PER_OF_SC_WIDTH,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          animatedPlateAndPizzaStyle,
          scaledPizzaAndPlateAnim,
        ]}
        source={require('../assets/pizza/dish.png')}
      />

      <Animated.View
        style={[
          {
            width: SEVENTY_PER_OF_SC_WIDTH,
            height: SEVENTY_PER_OF_SC_WIDTH,
            position: 'absolute',
            borderRadius: 1000,
            //backgroundColor: 'blue',
            zIndex: 1,
          },
          scaledPizzaAndPlateAnim,
        ]}
      >
        {selectedToppings[0] && (
          <ToppingsUnit
            imageUrl={availabletoppingsImages[selectedToppings[0]].imageUrl}
            positions={firstToppingsPositions}
          />
        )}
        {selectedToppings[1] && (
          <ToppingsUnit
            imageUrl={availabletoppingsImages[selectedToppings[1]].imageUrl}
            positions={secondToppingsPositions}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default PizzaWithPlate;

const styles = StyleSheet.create({});
