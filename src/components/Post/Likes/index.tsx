import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { postsLikesAtom } from "src/state/Nostr";

type Props = {
  id: string;
};

const PostLikes = ({ id }: Props) => {
  const reactions = useAtomValue(postsLikesAtom);
  const likes = reactions?.[id]?.length || 0;

  return (
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      <Text style={{ fontWeight: 600 }}>
        {likes.toLocaleString("en")} likes
      </Text>
    </View>
  );
};

export default PostLikes;
