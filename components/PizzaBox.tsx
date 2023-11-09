import { StyleSheet, Image } from 'react-native';
import Animated from 'react-native-reanimated';

import usePizzaBoxAnimation from './hooks/usePizzaBoxAnimation';

interface IPizzaBoxProps {
  setAddToCartClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PizzaBox = ({ setAddToCartClicked }: IPizzaBoxProps) => {
  const { fullBoxAnimatedStyle, animatedBoxCoverStyle } =
    usePizzaBoxAnimation(setAddToCartClicked);

  return (
    <Animated.View style={[styles.boxContainer, fullBoxAnimatedStyle]}>
      <Image
        resizeMode="contain"
        source={require('../assets/pizza/box_inside.png')}
        style={styles.boxBase}
      />
      <Animated.Image
        resizeMode="contain"
        source={require('../assets/pizza/box_front.png')}
        style={[styles.boxCover, animatedBoxCoverStyle]}
      />
    </Animated.View>
  );
};

export default PizzaBox;

const styles = StyleSheet.create({
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  boxCover: {
    height: 184,
    width: 184,
    backfaceVisibility: 'visible',
  },
  boxBase: {
    height: 198,
    position: 'absolute',
    width: 196,
    transform: [{ rotateX: '42deg' }, { perspective: 300 }, { translateY: 1 }],
  },
});
