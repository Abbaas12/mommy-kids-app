import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Screen from "./Screen";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../assets/headerIcon.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white", //need fix
    padding: 20,
    marginBottom: 5,
  },
  image: {
    height: 80,
    position: "absolute",
    alignSelf: "center",
  },
});
