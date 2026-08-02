import { commonStyles } from "@/styles/commonStyles";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";

type params = {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
};

const CommonButton = ({
  onPress,
  style,
  textStyle,
  title,
  loading,
}: params) => {
  return (
    <Pressable style={[commonStyles.button, style]} onPress={onPress}>
      {!loading && (
        <Text style={[commonStyles.buttonText, textStyle]}>{title}</Text>
      )}
      {loading && (
        <ActivityIndicator
          style={[commonStyles.buttonText as ViewStyle]}
          color={"white"}
          size={20}
        />
      )}
    </Pressable>
  );
};

export default CommonButton;

const styles = StyleSheet.create({});
