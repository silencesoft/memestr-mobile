import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Post } from "src/interfaces/post";

type Props = {
  post: Post;
};

const PostLikes = ({ post }: Props) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    <Text style={{ fontWeight: 600 }}>
      {post.liked?.length?.toLocaleString("en")} likes
    </Text>
  </View>
);

export default PostLikes;
