import React, { useRef } from "react";
import { Text } from "react-native-paper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import {
  Dimensions,
  Image,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  image: string[];
};

const PostCarousel = ({ image }: Props) => {
  const viewWidth = Dimensions.get("window").width - 30;
  const progressValue = useSharedValue<number>(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  Image.prefetch(image[0])
    .then(() => {
      Image.getSize(image[0], (width, height) => {
        let aspectRatio = height / width;

        setImageHeight(aspectRatio * viewWidth);
      });
    })
    .catch((error) => console.log(error));

  const gotoSlide = (slide: number) => {
    carouselRef?.current?.scrollTo({ index: slide, animated: true });
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={viewWidth}
        height={imageHeight}
        // autoPlay={true}
        pagingEnabled
        snapEnabled
        data={image}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: image[index] }}
              resizeMode="center"
              style={{
                width: "100%",
                height: imageHeight,
              }}
            />
          </View>
        )}
      />
      {!!progressValue && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 100,
            alignSelf: "center",
            marginTop: 10,
            gap: 10
          }}
        >
          {image.map((img, index) => (
            <PaginationItem
              length={image.length}
              index={index}
              key={index}
              backgroundColor={"#ffffff"}
              animValue={progressValue}
              isRotate={false}
              handleClick={() => gotoSlide(index)}
            />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  handleClick?: () => void;
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate, handleClick } =
    props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <TouchableOpacity onPress={() => handleClick?.()}>
      <View
        style={{
          backgroundColor: "#333333",
          width,
          height: width,
          borderRadius: 50,
          overflow: "hidden",
          transform: [
            {
              rotateZ: isRotate ? "90deg" : "0deg",
            },
          ],
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 50,
              backgroundColor,
              flex: 1,
            },
            animStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PostCarousel;
