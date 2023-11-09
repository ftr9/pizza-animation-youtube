import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const AnimatedIonIcons = Animated.createAnimatedComponent(Ionicons);

interface ICartIconInfoProps {
  cartSize: number;
}

const CartIconInfo = ({ cartSize }: ICartIconInfoProps) => {
  return (
    <View
      style={{
        position: 'relative',
      }}
    >
      {cartSize > 0 && (
        <View style={styles.cartSizeDisplayContainer}>
          <Text style={{ fontSize: 14, color: 'white' }}>{cartSize}</Text>
        </View>
      )}
      <AnimatedIonIcons
        sharedTransitionTag="cart"
        name="cart-outline"
        size={32}
        style={{
          marginRight: 15,
        }}
      />
    </View>
  );
};

export default CartIconInfo;

const styles = StyleSheet.create({
  cartSizeDisplayContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 100,
  },
});
