import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

type Props = {};

const CommentsScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Comments</Text>
      <Button onPress={() => navigation.goBack()}>Dismiss</Button>
    </View>
  );
};

export default CommentsScreen;
