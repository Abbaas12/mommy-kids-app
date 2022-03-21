import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../config/Colors";

export default function AppButton({
  onPress,
  title,
  style,
  color = "primary",
  icon,
  fontSize = 18,
  iconSize = 20,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors[color] }, style]}
    >
      {icon && (
        <Icon
          style={{ marginRight: 2 }}
          name={icon}
          size={iconSize}
          color={colors.white}
        />
      )}
      <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
