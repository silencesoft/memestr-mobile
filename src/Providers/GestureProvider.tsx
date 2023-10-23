import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = { children: JSX.Element };

const GestureProvider = ({ children }: Props) => {
  return <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>;
};

export default GestureProvider;
