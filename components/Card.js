import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
} from "react-native";

import colors from "../config/Colors";

export default function Card({
  imageUrl,
  title = "Empty",
  price,
  color,
  stock,
  onPress,
  quantity,
  total,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="repeat"
        />
        <View style={styles.detailContainer}>
          <View>
            <Text style={styles.title}>Name: {title}</Text>
            {color && <Text style={styles.stock}>Color: {color}</Text>}
            {total && <Text style={styles.stock}>Total: {total}</Text>}
          </View>
          <View>
            {price && <Text style={styles.price}>Price: {price}</Text>}
            {stock && <Text style={styles.stock}>Stock: {stock}</Text>}
            {quantity && <Text style={styles.stock}>Quantity: {quantity}</Text>}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    marginBottom: 5,
  },
  price: {
    marginBottom: 5,
  },
  stock: {},
});
