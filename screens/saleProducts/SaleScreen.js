import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import itemApi from "../../api/adjective";
import Card from "../../components/Card";
import colors from "../../config/Colors";
import SaleHeader from "../../components/SaleHeader";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function SaleScreen({ navigation }) {
  const [sales, setSales] = useState([]);
  const [saleFilter, setSaleFilter] = useState([]);
  const [products, setProduct] = useState([]);
  const [saleItemFilter, setSaleItemFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getSales = async () => {
    const result = await itemApi.getItem("sales");
    if (!result.ok) console.log(result.problem);
    setSales(result.data);
    setSaleFilter(result.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      //get sales
      getSales();

      //get Products
      itemApi
        .getItem("products")
        .then((item) => setProduct(item.data))
        .catch((e) => console.log(e));

      itemApi
        .getItem("sales")
        .then((res) => {
          const sale = res.data.map((item) => item.saleItem.id);
          itemApi.getItem("saleItems").then((data) => {
            setSaleItemFilter(
              data.data.filter((item) => !sale.includes(item.id))
            );
          });
        })
        .catch((e) => console.log(e));

      return () => {
        setSales([]);
        setSaleFilter([]);
        setProduct([]);
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
          <SaleHeader
            items={products}
            sales={sales}
            setSaleFilter={setSaleFilter}
            count={saleFilter.length}
            navigation={navigation}
            trash={saleItemFilter.length}
          />
          <View style={styles.container}>
            <FlatList
              data={saleFilter}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                let image;
                if (item.product) image = item.product.image;

                return (
                  <Card
                    imageUrl={image}
                    title={item.customerName ? item.customerName : "Empty"}
                    price={item.saleItem.salePrice}
                    total={item.total}
                    quantity={item.saleItem.quantity}
                    onPress={() => {
                      navigation.navigate("Sale Detail", { item });
                      console.log(item);
                    }}
                  />
                );
              }}
              refreshing={refreshing}
              onRefresh={getSales}
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
