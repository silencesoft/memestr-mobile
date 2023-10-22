import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtomValue } from "jotai";
import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { RootStackParamList } from "src/constants/RootStackParamList";
import HomeScreen from "src/screens/Home";
import LoginScreen from "src/screens/Login";
import { pubKeyAtom } from "src/state/User";
import { useTheme } from "src/Providers/ThemeProvider";
import CreateNavigator from "./CreateNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const userKey = useAtomValue(pubKeyAtom);
  const { theme } = useTheme();

  return (
      <Stack.Navigator>
        {!!userKey && (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create"
              component={CreateNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}
        {!userKey && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
  );
};

export default MainNavigator;
