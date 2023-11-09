import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Ratings = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {new Array(5).fill('-').map((_, index) => {
        return (
          <Ionicons
            key={index}
            name="star"
            size={18}
            color={'#ffd285'}
            style={styles.starIcon}
          />
        );
      })}
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  starIcon: {
    marginHorizontal: 5,
  },
});
