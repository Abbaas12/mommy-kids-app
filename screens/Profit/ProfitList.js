import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import moment from "moment";

import Colors from "../../config/Colors";

const { width } = Dimensions.get("window");
export default function ProfitList({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>{moment(item.date).format("MMM ddd Do YYYY")}</Text>
      </View>
      <View style={styles.item}>
        <Text>{item.profit}Ks</Text>
      </View>
      <View style={styles.item}>
        <Text>{item.total}Ks</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 3,
  },
});
