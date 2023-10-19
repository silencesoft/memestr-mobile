import React from "react";
import { View } from "react-native";

import PostHeader from "./Header";
import PostImage from "./Image";
import PostFooter from "./Footer";
import PostLikes from "./Likes";
import PostCaption from "./Caption";
import PostCommentSection from "./CommentSection";
import PostComments from "./Comments";
import PostCarousel from "./Carousel";

const Post = ({ post }: any) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader author={post.author} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        {post.image.length === 1 ?  <PostImage image={post.image} /> : <PostCarousel image={post.image} />}
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
