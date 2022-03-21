import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../config/Colors";

export default function OfflineNotice() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
  },
});
