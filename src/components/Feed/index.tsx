import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Post from "src/components/Post";
import { useGetPosts } from "src/hooks/useGetPosts";
import { Post as PostProps } from "src/interfaces/post";
import { useTheme } from "src/Providers/ThemeProvider";
import { Text } from "react-native-paper";

type Props = {};

const Feed = (props: Props) => {
  const { posts, loading, empty, nextPage, refresh } = useGetPosts({});
  const items = posts.filter(
    (value: PostProps, index: number, self: PostProps[]) =>
      self.findIndex((v: { id: any }) => v.id === value.id) === index
  );
  const { theme } = useTheme();

  if (empty) {
    return (
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Ionicons name="ios-close-circle" size={48} color={theme.colors.text} />
        <Text variant="labelSmall">No results</Text>
      </View>
    );
  }

  return (
    <>
      {!!items.length && (
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
      )}
    </>
  );
};

export default Feed;
