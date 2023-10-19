import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

import { useTheme } from "src/Providers/ThemeProvider";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  handleClick?: () => void;
};

const ButtonIcon = ({ icon, handleClick }: Props) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={() => handleClick?.()}>
      <Ionicons name={icon} size={30} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
