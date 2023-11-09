import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import {
  PIZZA_CONTAINER_WIDTH,
  SIXTYEIGHT_PER_OF_SC_WIDTH,
  SIXTYFIVE_PER_OF_SC_WIDTH,
  PARTICLE_HEIGHT_WIDTH,
} from '../constants/ContentsWidth';

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { generateOffsets } from './renderer/PizzaListRenderer/utils';
import usePizzaStore from '../store/Pizza.store';
import particleImageData from '../constants/data/ParticleImage.data';
import { IParticleImage } from '../types';

interface IPizzaPlateProp {
  scrollOffsetXSharedValue: SharedValue<number>;
}

const EACH_ROTATION_FACTOR = 45;

const PizzaPlate = ({ scrollOffsetXSharedValue }: IPizzaPlateProp) => {
  //Global store
  const pizzaData = usePizzaStore(state => state.pizzas);

  const scrollInputRange = generateOffsets(
    pizzaData.length + 1,
    PIZZA_CONTAINER_WIDTH
  );
  const scrollOutputRange = generateOffsets(
    pizzaData.length + 1,
    EACH_ROTATION_FACTOR
  );

  //Rotate the particle whenever scroll happens horizontally
  const rotationParticlesAnimationStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      scrollOffsetXSharedValue.value,
      scrollInputRange,
      scrollOutputRange
    );
    return {
      transform: [
        { translateX: -(SIXTYFIVE_PER_OF_SC_WIDTH / 2) },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  return (
    <View style={styles.pizzaPlateContainer}>
      {/**small Particle Around Pizza Base Plate that rotates when we scroll horizontally */}
      <Animated.View
        style={[rotationParticlesAnimationStyle, styles.particlePlateContainer]}
      >
        {particleImageData.map(particleData => (
          <PizzaPlate.ParticleImage
            key={particleData.index}
            {...particleData}
          />
        ))}
      </Animated.View>
      {/**Actually Pizza Base plate */}
      <Animated.Image
        sharedTransitionTag="pizzaPlate"
        source={require('../assets/pizza/dish.png')}
        resizeMode="cover"
        style={styles.dishImg}
      />
    </View>
  );
};

PizzaPlate.ParticleImage = (particleImageData: IParticleImage) => {
  return (
    <Image
      source={particleImageData.imageUrl}
      resizeMode="contain"
      style={{
        position: 'absolute',
        top: particleImageData.top,
        left: particleImageData.left,
        bottom: particleImageData.bottom,
        right: particleImageData.right,
        height: PARTICLE_HEIGHT_WIDTH,
        width: PARTICLE_HEIGHT_WIDTH,
      }}
    />
  );
};

export default PizzaPlate;

const styles = StyleSheet.create({
  pizzaPlateContainer: {
    width: SIXTYEIGHT_PER_OF_SC_WIDTH,
    height: SIXTYEIGHT_PER_OF_SC_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    //backgroundColor: 'orange',
    borderRadius: 1000,
  },
  particlePlateContainer: {
    height: SIXTYFIVE_PER_OF_SC_WIDTH,
    width: SIXTYFIVE_PER_OF_SC_WIDTH,
    //backgroundColor: 'blue',
    position: 'absolute',
    left: '50%',
    top: '2%',
    borderRadius: 1000,
  },
  dishImg: {
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
});
