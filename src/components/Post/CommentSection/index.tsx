import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Post } from "src/interfaces/post";

type Props = {
  post: Post;
};

const PostCommentSection = ({ post }: Props) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

export default PostCommentSection;
