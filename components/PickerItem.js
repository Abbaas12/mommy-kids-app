import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import Colors from "../config/Colors";

const { width } = Dimensions.get("window");

export default function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 18,
  },
});
