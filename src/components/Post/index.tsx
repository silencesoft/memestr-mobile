import React from "react";
import { View } from "react-native";

import PostHeader from "./Header";
import PostImage from "./Image";
import PostFooter from "./Footer";
import PostLikes from "./Likes";
import PostCaption from "./Caption";
import PostCommentSection from "./CommentSection";
import PostComments from "./Comments";

const Post = ({ post }: any) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader author={post.author} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostImage image={post.image} />
        <PostFooter post={post} />
        <PostLikes post={post} />
        <PostCaption post={post} />
        <PostCommentSection post={post} />
        <PostComments post={post} />
      </View>
    </View>
  );
};

export default Post;
