import React from "react";
import { SafeAreaView, StyleSheet, } from "react-native";

import Feed from "src/components/Feed";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
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
