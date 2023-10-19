import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

type Props = {
  image: string;
};

const PostImage = ({ image }: Props) => {
  const [imageHeight, setImageHeight] = React.useState(0);
  
  // snippet from https://stackoverflow.com/a/66263016
  // Thomas Bones - https://stackoverflow.com/users/14764631/thomas-bones
  Image.prefetch(image[0])
    .then(() => {
      Image.getSize(image, (width, height) => {
        const aspectRatio = height / width;

        setImageHeight(aspectRatio * Dimensions.get("window").width - 30);
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

  return (
    <View>
      <Image
        source={{ uri: image[0] }}
        resizeMode="center"
        style={{
          width: "100%",
          height: imageHeight,
        }}
      />
    </View>
  );
};

export default PostImage;
