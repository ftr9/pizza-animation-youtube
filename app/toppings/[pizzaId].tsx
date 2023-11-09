import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import usePizzaStore from '../../store/Pizza.store';
import { useLocalSearchParams } from 'expo-router';
import Animated, { FadeOut, useSharedValue } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import DetailsPageNavBar from '../../components/navbar/DetailsPageNavBar';
import SizeSelector from '../../components/SizeSelector';
import ToppingsRenderer from '../../components/renderer/ToppingsRenderer';
import IconBtn from '../../components/Button/IconBtn';
import { DEVICE_WIDTH } from '../../constants/Screen';
import { IAvailableToppings } from '../../types';
import PizzaWithPlate from '../../components/PizzaWithPlate';

const PizzaToppingsPage = () => {
  const { pizzaId } = useLocalSearchParams<{ pizzaId: string }>();
  const pizzaData = usePizzaStore(store => store.pizzas);
  const activeSelectedPizza = pizzaData[parseInt(pizzaId)];
  const isToppingsInDropAreaSharedValue = useSharedValue(false);
  const [selectedToppings, setSelectedToppings] = useState<
    IAvailableToppings[]
  >([]);
  const [isAddToCardClicked, setAddToCartClicked] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark" backgroundColor="#F9F5F2" />
      <DetailsPageNavBar title={activeSelectedPizza.name} />
      <Animated.View
        exiting={FadeOut}
        sharedTransitionTag="pizzaBg"
        style={{
          backgroundColor: '#F9F5F2',
          height: '86%',
          position: 'relative',
        }}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <PizzaWithPlate
            isAddToCartClicked={isAddToCardClicked}
            imageUrl={activeSelectedPizza.imageUri}
            pizzaId={pizzaId}
            isToppingsInDropAreaSharedValue={isToppingsInDropAreaSharedValue}
            selectedToppings={selectedToppings}
            setAddToCartClicked={setAddToCartClicked}
          />
        </View>

        <View
          style={{
            position: 'relative',
            zIndex: 0,
          }}
        >
          <Animated.Text
            sharedTransitionTag="priceTagTransition"
            style={[styles.itemPriceStyle]}
          >
            ${activeSelectedPizza.price}
          </Animated.Text>
          <SizeSelector />
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 30,
            }}
          >
            Toppings (Must be 2)
          </Text>
        </View>

        <ToppingsRenderer
          isToppingsInDropAreaSharedValue={isToppingsInDropAreaSharedValue}
          setSelectedToppings={setSelectedToppings}
        />

        <View style={styles.iconBtnContainer}>
          <IconBtn
            onPress={() => {
              setAddToCartClicked(!isAddToCardClicked);
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default PizzaToppingsPage;

const styles = StyleSheet.create({
  iconBtnContainer: {
    position: 'absolute',
    bottom: '-5%',
    left: 0,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemPriceStyle: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
