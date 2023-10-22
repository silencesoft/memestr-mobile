import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feed from "src/components/Feed";
import Header from "src/components/Header";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Feed />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
