import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Post } from "src/interfaces/post";

type Props = {
  post: Post;
};

const PostCaption = ({ post }: Props) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: 600 }}>{post.author?.username}</Text>
      <Text> {post.content}</Text>
    </Text>
  </View>
);

export default PostCaption;
