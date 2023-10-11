import React from "react";
import { ScrollView, View } from "react-native";

import Post from "src/components/Post";
import { useGetPosts } from "src/hooks/useGetPosts";

type Props = {};

const Feed = (props: Props) => {
  const { posts } = useGetPosts({});

  return (
    <ScrollView pagingEnabled>
      {posts.map((post, index) => (
        <Post post={post} key={post.id} />
      ))}
    </ScrollView>
  );
};

export default Feed;
