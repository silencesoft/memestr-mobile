import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";

import { useTheme } from "src/Providers/ThemeProvider";
import { postsLikesAtom } from "src/state/Nostr";
import { pubKeyAtom } from "src/state/User";

type Props = {
  id: string;
};

const PostFooter = ({ id }: Props) => {
  const { theme } = useTheme();
  const handleLike = (postId: string) => {};
  const userKey = useAtomValue(pubKeyAtom);
  const reactions = useAtomValue(postsLikesAtom);
  const likes = reactions?.[id] || [];
  const liked = likes?.includes(userKey);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
      }}
    >
      <View style={styles.leftFooterIconContainer}>
        <TouchableOpacity onPress={() => handleLike(id)}>
          {liked ? (
            <Ionicons
              name="md-heart-sharp"
              size={32}
              color={theme.colors.text}
            />
          ) : (
            <Ionicons
              name="md-heart-outline"
              size={32}
              color={theme.colors.text}
            />
          )}
        </TouchableOpacity>
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
