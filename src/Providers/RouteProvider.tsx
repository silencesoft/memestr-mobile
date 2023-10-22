import { NavigationContainer } from "@react-navigation/native";
import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useTheme } from "./ThemeProvider";

type Props = {
  children: JSX.Element;
};

const RouteProvider = ({ children }: Props) => {
  const { theme } = useTheme();

  return (
    <Suspense
      fallback={
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      }
    >
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </Suspense>
  );
};

export default RouteProvider;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
});
