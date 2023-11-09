import { StyleSheet, DimensionValue, Image } from 'react-native';
import React from 'react';
import Animated, { FadeOut, ZoomInUp } from 'react-native-reanimated';
import { IAbsolutePositionDimensionValues } from '../types';

interface IToppingsUnit {
  positions: IAbsolutePositionDimensionValues[];
  imageUrl: any;
}

const ToppingsUnit = ({ positions, imageUrl }: IToppingsUnit) => {
  return positions.map((el, index) => {
    return (
      <Animated.Image
        entering={ZoomInUp.duration(index * 100)}
        key={index}
        source={imageUrl}
        style={{
          position: 'absolute',
          top: el.top,
          bottom: el.bottom,
          right: el.right,
          left: el.left,
          height: 30,
          width: 30,
          zIndex: 10,
        }}
        resizeMode="contain"
      />
    );
  });
};

export default ToppingsUnit;

const styles = StyleSheet.create({});
