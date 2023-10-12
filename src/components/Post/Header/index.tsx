import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import { User } from "src/interfaces/user/user";

type Props = {
  author: User;
};

const PostHeader = ({ author }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: author?.picture }} style={styles.story} />
        <Text style={styles.userName}>{author?.username}</Text>
      </View>
      <Text style={{ color: "white", fontWeight: 700 }}>...</Text>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  story: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "#ff8501",
  },
  userName: {
    fontWeight: 700,
    marginLeft: 5,
  },
});
