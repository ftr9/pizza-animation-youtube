import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue } from 'react-native-reanimated';
import { IAvailableToppings } from '../../types';
import toppingsData from '../../constants/data/Toppings.data';
import useToppingsItemAnimation from '../hooks/useToppingsItemAnimation';

interface IToppingsData {
  imageUrl: any;
  index: number;
  name: IAvailableToppings;
}

interface IToppingsItem extends IToppingsData {
  isToppingsInDropAreaSharedValue: SharedValue<boolean>;
  setSelectedToppings: React.Dispatch<
    React.SetStateAction<IAvailableToppings[]>
  >;
}

interface IToppingsRenderer {
  isToppingsInDropAreaSharedValue: SharedValue<boolean>;
  setSelectedToppings: React.Dispatch<
    React.SetStateAction<IAvailableToppings[]>
  >;
}

const ToppingsRenderer = ({
  isToppingsInDropAreaSharedValue,
  setSelectedToppings,
}: IToppingsRenderer) => {
  return (
    <View
      style={{
        //backgroundColor: 'orange',
        flexDirection: 'row',
      }}
    >
      {toppingsData.map(topping => (
        <ToppingsItem
          key={topping.index}
          isToppingsInDropAreaSharedValue={isToppingsInDropAreaSharedValue}
          index={topping.index}
          imageUrl={topping.imageUrl}
          name={topping.name}
          setSelectedToppings={setSelectedToppings}
        />
      ))}
    </View>
  );
};

export default ToppingsRenderer;

const ToppingsItem = ({
  imageUrl,
  name,
  isToppingsInDropAreaSharedValue,
  setSelectedToppings,
}: IToppingsItem) => {
  const { pan, toppingAnimatedXAndYAndScale } = useToppingsItemAnimation(
    isToppingsInDropAreaSharedValue,
    setSelectedToppings,
    name
  );

  return (
    <View style={styles.toppingsContainer}>
      <GestureDetector gesture={pan}>
        <Animated.Image
          resizeMode="contain"
          source={imageUrl}
          style={[
            {
              height: 30,
              width: 30,
              position: 'relative',
              zIndex: 20,
            },
            toppingAnimatedXAndYAndScale,
          ]}
        />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  toppingsContainer: {
    height: 60,
    width: 60,
    position: 'relative',
    backgroundColor: '#F4EACB',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'visible',
  },
});
