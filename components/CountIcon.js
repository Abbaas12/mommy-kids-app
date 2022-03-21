import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../config/Colors";

export default function CountIcon({ count }) {
  return (
    <>
      {count > 0 && (
        <View style={styles.container}>
          <Text style={styles.text}>{count}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -3,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
});
