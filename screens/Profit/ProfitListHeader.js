import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import Colors from "../../config/Colors";

const { width } = Dimensions.get("window");
export default function ProfitListHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.headerItem}>
        <Text>Date</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Profit</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Sales</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.light,
    borderTopColor: Colors.light,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  headerItem: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 3,
  },
});
