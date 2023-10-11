import React from "react";
import {
  DimensionValue,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

type Props = {
  image: string;
};

// snippet from https://stackoverflow.com/a/66263016
// Thomas Bones - https://stackoverflow.com/users/14764631/thomas-bones
const PostImage = ({ image }: Props) => {
  const [imageHeight, setImageHeight] = React.useState(0);
  Image.prefetch(image)
    .then(() => {
      Image.getSize(image, (width, height) => {
        let aspectRatio = height / width;
        setImageHeight(aspectRatio * Dimensions.get("window").width);
      });
    })
    .catch((error) => console.log(error));

  if (imageHeight < 1) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const height = `${imageHeight}px` as DimensionValue;
  return (
    <View>
      <Image
        source={{ uri: image }}
        resizeMode="center"
        style={{
          width: "100%",
          height,
        }}
      />
    </View>
  );
};

export default PostImage;
