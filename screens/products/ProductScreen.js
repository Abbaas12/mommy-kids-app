import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Card from "../../components/Card";
import colors from "../../config/Colors";
import itemApi from "../../api/adjective";
import ListingHeader from "../../components/ListingHeader";
import listings from "../../api/listings";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function ProductScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getProducts = async () => {
    const result = await listings.getListings("products");
    if (!result.ok) console.log(result.problem);
    setProducts(result.data);
    setProductFilter(result.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      //get category
      itemApi.getItem("categories").then((res) => setCategories(res.data));

      //get brand
      itemApi.getItem("brands").then((res) => setBrands(res.data));

      //get color
      itemApi.getItem("colors").then((res) => setColors(res.data));

      //get size
      itemApi.getItem("sizes").then((res) => setSizes(res.data));

      //get type
      itemApi.getItem("types").then((res) => setTypes(res.data));

      //product get
      getProducts();

      return () => {
        setProducts([]);
        setCategories([]);
        setColors([]);
        setSizes([]);
        setBrands([]);
        setTypes([]);
        setLoading(true);
      };
    }, [])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator
          visible={loading}
          source={require("../../assets/animations/9329-loading.json")}
        />
      ) : (
        <>
          <ListingHeader
            icon="text-search"
            count={productFilter.length}
            setProductFilter={setProductFilter}
            products={products}
            categories={categories}
            types={types}
            sizes={sizes}
            colors={colors}
            brands={brands}
            navigation={navigation}
          />
          <View style={styles.container}>
            <FlatList
              data={productFilter}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card
                  imageUrl={item.image}
                  title={item.name}
                  price={item.originalPrice}
                  color={item.color.name}
                  stock={item.stock}
                  onPress={() => {
                    navigation.navigate("Product Detail", { item });
                    console.log(item);
                  }}
                />
              )}
              refreshing={refreshing}
              onRefresh={getProducts}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
});
