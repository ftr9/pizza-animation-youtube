import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PIZZA_CONTAINER_WIDTH } from '../../../constants/ContentsWidth';
import { useRouter } from 'expo-router';

interface IFullPizzaProp {
  index: number;
  imageUrl: any;
  range: number[];
  scrollXOffset: SharedValue<number>;
}
const FullPizza = ({
  index,
  imageUrl,
  range,
  scrollXOffset,
}: IFullPizzaProp) => {
  const router = useRouter();

  const AnimatedPos_Rot_Scale = useAnimatedStyle(() => {
    const yFactor = interpolate(scrollXOffset.value, range, [0, -0.9, 0]);
    const rotation = interpolate(scrollXOffset.value, range, [0.2, 0, 0.2]);
    const scaleFactor = interpolate(scrollXOffset.value, range, [0.8, 1, 0.8], {
      extrapolateRight: Extrapolate.CLAMP,
      extrapolateLeft: Extrapolate.CLAMP,
    });

    return {
      transform: [
        { scale: scaleFactor },
        { translateY: yFactor },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  return (
    <Animated.View
      onStartShouldSetResponderCapture={e => {
        router.push(`/toppings/${index}`);
        return true;
      }}
      style={[
        AnimatedPos_Rot_Scale,
        {
          width: PIZZA_CONTAINER_WIDTH,
          height: PIZZA_CONTAINER_WIDTH,
          borderRadius: 1000,
          zIndex: 1000,
          // backgroundColor: 'blue',
        },
      ]}
    >
      <Animated.Image
        sharedTransitionTag={`actualPizza-${index}`}
        source={imageUrl}
        resizeMode="cover"
        style={[
          {
            height: PIZZA_CONTAINER_WIDTH,
            width: PIZZA_CONTAINER_WIDTH,
          },
        ]}
      />
    </Animated.View>
  );
};

export default FullPizza;
