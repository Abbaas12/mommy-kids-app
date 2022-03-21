import React, { useContext } from "react";
import { View, StyleSheet, Text, ScrollView, Image, Alert } from "react-native";

import AppButton from "../../components/AppButton";
import colors from "../../config/Colors";
import itemApi from "../../api/adjective";
import authStorage from "../../auth/storage";
import AuthContext from "../../auth/context";

export default function SaleItemDetailScreen({ navigation, route }) {
  const { item } = route.params;
  const context = useContext(AuthContext);

  const handleDelete = async (id, params) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    itemApi
      .deleteItem("sales", id, params, config)
      .then(async (res) => {
        await itemApi.deleteItem(
          "saleItems",
          res.data.s.saleItem,
          params,
          config
        );
        navigation.navigate("Sale");
      })
      .catch((error) => console.log(error));
  };

  const handlePress = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      { text: "Yes", onPress: () => handleDelete(id) },
      { text: "No" },
    ]);
  };

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: item.product.image,
        }}
      />
      <View style={styles.container}>
        <View sytle={styles.detailContainer}>
          <Text style={styles.title}>Customer Name: {item.customerName}</Text>
          <Text style={styles.price}>
            Original Price:{" "}
            <Text style={{ color: colors.primary }}>
              ${item.product.originalPrice}
            </Text>
          </Text>
          <Text style={styles.price}>
            Sale Price:{" "}
            <Text style={{ color: colors.primary }}>
              ${item.saleItem.salePrice}
            </Text>
          </Text>
          <Text style={styles.text}>
            Total:{" "}
            <Text style={{ color: colors.secondary }}>${item.total}</Text>
          </Text>
          <Text style={styles.text}>
            Profit: $
            <Text
              style={{
                color: item.profit > 0 ? colors.secondary : colors.danger,
              }}
            >
              {item.profit}
            </Text>
          </Text>
          <Text style={styles.text}>Quantity: {item.saleItem.quantity}</Text>
          <Text style={styles.text}>Ads Fee: ${item.adsFee}</Text>
          <Text style={styles.text}>Date: {item.date.split("T")[0]}</Text>
          {context.user.isAdmin && (
            <AppButton
              color="danger"
              title="Delete"
              onPress={() => handlePress(item.id)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  detailContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    margin: 10,
    fontSize: 18,
    fontWeight: "300",
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "300",
    margin: 10,
  },
});
