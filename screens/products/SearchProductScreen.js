import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppInput from "../../components/AppInput";
import colors from "../../config/Colors";
import { ListItem } from "../../components/lists";
import listings from "../../api/listings";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function SearchProductScreen({ navigation }) {
  const [productFilter, setProductFilter] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      listings.getListings("products").then((res) => {
        setProductFilter(res.data);
        setProducts(res.data);
        setLoading(false);
      });

      return () => {
        setProducts([]);
        setProductFilter([]);
      };
    }, [])
  );

  const seatchProduct = (text) => {
    setProductFilter(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
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
          {productFilter.length > 0 ? (
            <FlatList
              data={productFilter}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.textContainer}>
                  <ListItem
                    title={item.name}
                    subtitle={`Stock: ${item.stock}  Price: $${item.originalPrice} `}
                    image={{ uri: item.image }}
                    onPress={() =>
                      navigation.navigate("Product Detail", { item })
                    }
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
