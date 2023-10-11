import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Post } from "src/interfaces/post";

type Props = {
  post: Post;
};

const PostComments = ({ post }: Props) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: 600 }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

export default PostComments;
