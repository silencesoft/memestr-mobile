import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtomValue } from "jotai";
import React from "react";

import { RootStackParamList } from "src/constants/RootStackParamList";
import LoginScreen from "src/screens/Login";
import { pubKeyAtom } from "src/state/User";
import CreateNavigator from "./CreateNavigator";
import TabNavigator from "./TabNavigator";
import CommentsScreen from "src/screens/Comments";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const userKey = useAtomValue(pubKeyAtom);

  return (
    <Stack.Navigator>
      {!!userKey && (
        <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create"
            component={CreateNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              animation: "slide_from_bottom",
              headerShown: false,
              gestureDirection: "vertical",
            }}
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
