import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import Logo from "../../../assets/memestr.svg";
import { useTheme } from "src/Providers/ThemeProvider";
import LoginForm from "src/components/Login";

const LoginScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width="100" height="100" fill={theme.colors.text} />
      </View>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 12,
    height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    fill: "red",
  },
});

// Web svg error: https://github.com/kristerkari/react-native-svg-transformer/issues/89
