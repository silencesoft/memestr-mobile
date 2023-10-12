import React from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import Post from "src/components/Post";
import { useGetPosts } from "src/hooks/useGetPosts";
import { Post as PostProps } from "src/interfaces/post";

type Props = {};

const Feed = (props: Props) => {
  const { posts, loading, nextPage, refresh } = useGetPosts({});
  const items = posts.filter(
    (value: PostProps, index: number, self: PostProps[]) =>
      self.findIndex((v: { id: any }) => v.id === value.id) === index
  );

  return (
    <FlatList
      // pagingEnabled={true}
      data={items}
      keyExtractor={(item) => item.id}
      onEndReached={() => nextPage()}
      renderItem={({ item, index }) => {
        return <Post post={item} key={item.id} />;
      }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => refresh()}
          // tintColor="#F8852D"
        />
      }
      ListFooterComponent={() => {
        return loading && <ActivityIndicator />;
      }}
    />
  );
};

export default Feed;
