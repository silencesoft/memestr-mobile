import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SuspenseProvider from "src/Providers/SuspenseProvider";
import Feed from "src/components/Feed";
import Header from "src/components/Header";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Suspense fallback={<></>}>
          <Header />
        </Suspense>
        <SuspenseProvider>
          <Feed />
        </SuspenseProvider>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
