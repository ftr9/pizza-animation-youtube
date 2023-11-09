import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedIonIcons = Animated.createAnimatedComponent(Ionicons);

interface IIconBtn {
  onPress?: () => void;
}

const IconBtn = ({ onPress }: IIconBtn) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AnimatedLinearGradient
        sharedTransitionTag="buttonContainer"
        style={styles.buttonContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#FFd285', '#F7603A']}
      >
        <AnimatedIonIcons
          sharedTransitionTag="buttonIcon"
          name="cart-outline"
          color={'white'}
          style={{
            fontWeight: 'bold',
          }}
          size={24}
        />
      </AnimatedLinearGradient>
    </TouchableOpacity>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
