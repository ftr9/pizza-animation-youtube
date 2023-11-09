import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useCartStore from '../../store/Cart.store';
import CartIconInfo from '../CartIconInfo';

interface IDetailsNavBarProps {
  title: string;
}

const DetailsPageNavBar = ({ title }: IDetailsNavBarProps) => {
  const sharedNavbarBg = useSharedValue('white');
  const animatedNavbarBg = useAnimatedStyle(() => {
    return {
      backgroundColor: sharedNavbarBg.value,
    };
  });
  const { cart } = useCartStore();

  useEffect(() => {
    //IMP:: just done to match shared element transition container color with this navbar
    runOnUI(() => {
      sharedNavbarBg.value = withTiming('#F9F5F2', {
        duration: 1000,
      });
    })();
  }, []);

  return (
    <Animated.View style={[styles.navContainer, animatedNavbarBg]}>
      <Ionicons name="chevron-back" size={32} />
      <Text
        style={{
          fontSize: 32,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
      <CartIconInfo cartSize={cart.length} />
    </Animated.View>
  );
};

export default DetailsPageNavBar;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#F9F5F2',
    alignItems: 'center',
    paddingVertical: 2,
  },
});
