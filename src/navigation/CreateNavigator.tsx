import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CaptureScreen from "src/screens/Capture";
import NewPostScreen from "src/screens/NewPost";
import { RootStackParamList } from "src/constants/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOption = {};

type Props = {};

const CreateNavigator = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name="Capture" component={CaptureScreen} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
    </Stack.Navigator>
  );
};

export default CreateNavigator;
