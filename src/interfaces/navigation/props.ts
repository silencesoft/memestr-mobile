import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/constants/RootStackParamList";

export type homeScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type newPostScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "NewPost"
>;

export type createScreenProp= NativeStackNavigationProp<
RootStackParamList,
"Create"
>;
