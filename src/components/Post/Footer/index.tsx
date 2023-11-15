import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "src/Providers/ThemeProvider";
import Like from "./Like";
import { User } from "src/interfaces/user/user";

type Props = {
  id: string;
  author: User;
};

const PostFooter = ({ id, author }: Props) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
      }}
    >
      <View style={styles.leftFooterIconContainer}>
        <Like id={id} authorkey={author?.id || ""} />
        <TouchableOpacity>
          <Ionicons
            name="md-chatbubble-outline"
            size={32}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="md-paper-plane-outline"
            size={32}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity>
          <Ionicons
            name="md-bookmark-outline"
            size={32}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  footerIcon: {
    height: 33,
    width: 33,
  },
  leftFooterIconContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
