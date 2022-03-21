import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import Colors from "../../config/Colors";

const { width } = Dimensions.get("window");

export default function TotalProfit({ total, profit }) {
  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total Sales</Text>
        <Text style={styles.totalText}>{total}</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total Profits</Text>
        <Text style={styles.totalText}>{profit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  total: {
    width: width / 2.1,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  totalText: {
    fontSize: 16,
    color: Colors.light,
    fontWeight: "bold",
  },
});
