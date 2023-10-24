import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";

import Logo from "../../../assets/memestr-c.svg";
import { useTheme } from "src/Providers/ThemeProvider";
import ButtonIcon from "../ButtonIcon";
import { globalAtom } from "src/state/Nostr";
import { createScreenProp } from "src/interfaces/navigation/props";
import { useGetPosts } from "src/hooks/useGetPosts";

const Header = () => {
  const { theme } = useTheme();
  const { loading } = useGetPosts({});
  const [global, setGlobal] = useAtom(globalAtom);
  const navigation = useNavigation<createScreenProp>();
  const signOutUser = async () => {};

  const handleCreate = () => navigation.navigate("Create");

  const handleGlobalClick = () => !loading && setGlobal(!global);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOutUser}>
        <Logo fill={theme.colors.text} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <ButtonIcon icon={"md-add-circle-outline"} handleClick={handleCreate} />
        <ButtonIcon
          icon={global ? "people-outline" : "earth-outline"}
          handleClick={handleGlobalClick}
        />
        {/* <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>12</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 75,
    height: 20,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
