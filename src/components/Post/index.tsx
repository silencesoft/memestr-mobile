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
import { Post as PostProps } from "src/interfaces/post";

type Props = {
  post: PostProps;
};

const Post = ({ post }: Props) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader author={post.author} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        {post.image.length === 1 && <PostImage image={post.image[0]} />}
        {post.image.length > 1 && <PostCarousel image={post.image} />}
        <PostFooter post={post} />
        <PostLikes id={post.id} />
        <PostCaption post={post} />
        <PostCommentSection post={post} />
        <PostComments post={post} />
      </View>
    </View>
  );
};

export default Post;
