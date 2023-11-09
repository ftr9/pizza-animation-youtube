import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import useCartStore from '../../store/Cart.store';

import CartIconInfo from '../CartIconInfo';

const MainPageNavBar = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <View style={styles.navContainer}>
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '600',
          }}
        >
          Order Manually
        </Text>
        <View style={styles.locationWithText}>
          <Ionicons name="location-sharp" size={24} />
          <Text>Washington Park</Text>
        </View>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>Pizza</Text>
        </View>
      </View>

      <CartIconInfo cartSize={cart.length} />
    </View>
  );
};

export default MainPageNavBar;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  locationWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  btn: {
    backgroundColor: '#FFD285',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
