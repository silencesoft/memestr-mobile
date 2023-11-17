import { useNavigation } from "@react-navigation/native";
import React from "react";

import ButtonIcon from "src/components/ButtonIcon";
import { commentsScreenProp } from "src/interfaces/navigation/props";

type Props = { id: string };

const Comments = ({ id }: Props) => {
  const navigation = useNavigation<commentsScreenProp>();

  const handleComments = () => {
    navigation.navigate("Comments");
  };

  return (
    <ButtonIcon
      icon="md-chatbubble-outline"
      handleClick={() => handleComments()}
    />
  );
};

export default Comments;
