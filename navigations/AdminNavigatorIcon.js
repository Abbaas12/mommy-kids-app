import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../config/Colors";

export default function AdminNavigatorIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name="cog" size={40} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.doger,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 10,
    borderColor: Colors.white,
    justifyContent: "center",
    bottom: 15,
  },
});
