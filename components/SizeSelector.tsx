import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
const SizeSelector = () => {
  return (
    <View style={styles.sizeSelectorContainer}>
      <TouchableOpacity style={styles.sizeBtn}>
        <Text>S</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeBtn}>
        <Text>M</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeBtn}>
        <Text>L</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SizeSelector;

const styles = StyleSheet.create({
  sizeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  sizeBtn: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 6,
  },
});
