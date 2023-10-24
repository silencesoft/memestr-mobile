import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { useTheme } from "./ThemeProvider";

type Props = {
    children: JSX.Element;
  };
  
const SuspenseProvider = ({children}: Props) => {
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
    {children}
  </Suspense>
)
}

export default SuspenseProvider

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
  });
  