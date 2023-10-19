import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtomValue } from "jotai";
import React from "react";

import { RootStackParamList } from "src/constants/RootStackParamList";
import HomeScreen from "src/screens/Home";
import LoginScreen from "src/screens/Login";
import { pubKeyAtom } from "src/state/User";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const userKey = useAtomValue(pubKeyAtom);

  return (
    <Stack.Navigator>
      {!!userKey && <Stack.Screen name="Home" component={HomeScreen} />}
      {!userKey && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;
