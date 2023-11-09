import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { DEVICE_WIDTH } from '../../constants/Screen';
import IconBtn from '../Button/IconBtn';
import usePizzaStore from '../../store/Pizza.store';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import SizeSelector from '../SizeSelector';
import Ratings from '../Ratings';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const PizzaContentRenderer = () => {
  const [activeScrollIndex, pizzaData] = usePizzaStore(state => [
    state.activeIndex,
    state.pizzas,
  ]);

  const opacitySharedValue = useSharedValue(0);
  const posYSharedValue = useSharedValue(0);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacitySharedValue.value,
    };
  });

  const animatedYPosStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posYSharedValue.value }],
    };
  });

  const animatePriceAndName = () => {
    'worklet';
    opacitySharedValue.value = withSequence(
      withTiming(0, { duration: 10 }),
      withTiming(1, { duration: 500 })
    );
    posYSharedValue.value = withSequence(
      withTiming(5, { duration: 10 }),
      withTiming(0, { duration: 500 })
    );
  };

  //animate every time when scroll index changes
  useEffect(() => {
    runOnUI(animatePriceAndName)();
  }, [activeScrollIndex]);

  return (
    <AnimatedLinearGradient
      sharedTransitionTag="pizzaBg"
      colors={['transparent', '#F9F5F2']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      locations={[0.05, 0.1]}
      style={styles.contentDisplayContainer}
    >
      <Animated.Text
        style={[styles.pizzaTxtStyle, animatedOpacityStyle, animatedYPosStyles]}
      >
        {pizzaData[activeScrollIndex].name}
      </Animated.Text>

      <Ratings />

      <Animated.Text
        sharedTransitionTag="priceTagTransition"
        style={[animatedOpacityStyle, animatedYPosStyles, styles.priceTxtStyle]}
      >
        ${pizzaData[activeScrollIndex].price}
      </Animated.Text>
      <SizeSelector />
      <View style={styles.iconBtnContainer}>
        <IconBtn />
      </View>
    </AnimatedLinearGradient>
  );
};

export default PizzaContentRenderer;

const styles = StyleSheet.create({
  contentDisplayContainer: {
    width: (70 / 100) * DEVICE_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: -1,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    paddingHorizontal: 15,
    paddingVertical: 45,
    position: 'relative',
  },
  starIcon: {
    marginHorizontal: 5,
  },
  iconBtnContainer: {
    position: 'absolute',
    bottom: '-12%',
    width: (70 / 100) * DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceTxtStyle: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  pizzaTxtStyle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
});
