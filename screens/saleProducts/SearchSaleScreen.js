import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppInput from "../../components/AppInput";
import colors from "../../config/Colors";
import { ListItem } from "../../components/lists";
import listings from "../../api/listings";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function SearchProductScreen({ navigation }) {
  const [saleFilter, setSaleFilter] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      listings.getListings("sales").then((res) => {
        setSaleFilter(res.data);
        setSales(res.data);
        setLoading(false);
      });

      return () => {
        setSales([]);
        setSaleFilter([]);
      };
    }, [])
  );

  const seatchProduct = (text) => {
    setSaleFilter(
      sales.filter((sale) =>
        sale.saleItem.salename.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Search"
        onChangeText={(text) => seatchProduct(text)}
      />
      {loading ? (
        <ActivityIndicator
          visible={loading}
          source={require("../../assets/animations/95944-loading-animation.json")}
        />
      ) : (
        <>
          {saleFilter.length > 0 ? (
            <FlatList
              data={saleFilter}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.textContainer}>
                  <ListItem
                    title={item.saleItem.salename}
                    subtitle={`Quantity: ${item.saleItem.quantity}  Price: $${item.saleItem.salePrice} `}
                    image={{ uri: item.product.image }}
                    onPress={() => navigation.navigate("Sale Detail", { item })}
                  />
                </View>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                No Item's Here!
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  textContainer: {},
});
