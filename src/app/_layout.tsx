// css
import "../styles/global.css";

// Expo
import { Slot } from "expo-router";

// React native
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#1465D1" barStyle="light-content" />
      <Slot />
    </>
  );
}
