import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../config/Colors";

export default function AppInput({ icon, width = "100%", ...other }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <Icon name={icon} size={25} color={colors.medium} style={styles.icon} />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.text}
        {...other}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
});
