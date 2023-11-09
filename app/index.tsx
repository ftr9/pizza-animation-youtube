import { StyleSheet, View } from 'react-native';
import MainPageNavBar from '../components/navbar/MainPageNavBar';
import PizzaPlate from '../components/PizzaPlate';
import PizzaContentRenderer from '../components/renderer/PizzaContentRenderer';
import { useSharedValue } from 'react-native-reanimated';
import PizzaListRenderer from '../components/renderer/PizzaListRenderer';
import { StatusBar } from 'expo-status-bar';

const MainPage = () => {
  const scrollOffsetXSharedValue = useSharedValue(0);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark" backgroundColor="white" />
      <MainPageNavBar />

      <View
        style={{
          position: 'relative',
          marginTop: 20,
        }}
      >
        <PizzaPlate scrollOffsetXSharedValue={scrollOffsetXSharedValue} />
        <PizzaContentRenderer />
        <PizzaListRenderer
          scrollOffsetXSharedValue={scrollOffsetXSharedValue}
        />
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});
