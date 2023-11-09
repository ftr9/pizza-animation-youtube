import {
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { PIZZA_CONTAINER_WIDTH } from '../../../constants/ContentsWidth';
import FullPizza from './FullPizza';
import { generateOffsets } from './utils';
import ListDummyComponent from './ListDummyComponent';

import usePizzaStore from '../../../store/Pizza.store';

interface IPizzaListRendererProp {
  scrollOffsetXSharedValue: SharedValue<number>;
}

const PizzaListRenderer = ({
  scrollOffsetXSharedValue,
}: IPizzaListRendererProp) => {
  //Grab Pizza from global store
  const pizzasData = usePizzaStore(state => state.pizzas);
  const setActivePizzaIndex = usePizzaStore(state => state.setActivePizzaIndex);

  //set global scrollOffsetSharedValue
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollOffsetXSharedValue.value = e.contentOffset.x;
  });

  //used for getting which scrollIndex we are in... based on that scrollIndex we are going to get activePizzaContent  from array
  const momentumScrollHandle = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const activeScrollIndex = Math.ceil(
      e.nativeEvent.contentOffset.x /
        ((60 / 100) * e.nativeEvent.layoutMeasurement.width)
    );
    setActivePizzaIndex(activeScrollIndex);
  };

  return (
    <Animated.FlatList
      onMomentumScrollEnd={momentumScrollHandle}
      onScroll={scrollHandler}
      snapToAlignment={'center'}
      decelerationRate={0.85}
      style={styles.pizzaFlatListContainer}
      snapToOffsets={generateOffsets(pizzasData.length, PIZZA_CONTAINER_WIDTH)}
      initialNumToRender={1}
      horizontal
      ListHeaderComponent={<ListDummyComponent />}
      ListFooterComponent={<ListDummyComponent />}
      showsHorizontalScrollIndicator={false}
      data={pizzasData}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              width: 20,
            }}
          ></View>
        );
      }}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item, index }) => (
        <FullPizza
          index={index}
          scrollXOffset={scrollOffsetXSharedValue}
          range={[
            PIZZA_CONTAINER_WIDTH * index - 1,
            PIZZA_CONTAINER_WIDTH * index,
            PIZZA_CONTAINER_WIDTH * index + 1,
          ]}
          imageUrl={item.imageUri}
        />
      )}
    />
  );
};

export default PizzaListRenderer;

const styles = StyleSheet.create({
  pizzaFlatListContainer: {
    position: 'absolute',
    top: '3%',
    height: 400,
    //backgroundColor: 'red',
  },
});
