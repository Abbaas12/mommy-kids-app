import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";

import authStorage from "../../../auth/storage";
import itemApi from "../../../api/adjective";
import AppButton from "../../../components/AppButton";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../../components/lists";

export default function Brand({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [brand, setBrand] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //get brand
      itemApi
        .getItem("brands")
        .then((res) => {
          setBrands(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));

      itemApi.getItem("products").then((res) => {
        const products = res.data.map((item) => item.brand.id);
        setBrand(products);
      });

      return () => {
        setBrands([]);
        setLoading(true);
      };
    }, [])
  );

  authStorage
    .getToken()
    .then((token) => setToken(token))
    .catch((error) => console.log(error));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDelete = (id, params) => {
    itemApi
      .deleteItem("brands", id, params, config)
      .then((res) => {
        const brand = brands.filter((item) => item.id != id);
        setBrands(brand);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {loading === false ? (
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Add Brand", { item })}
              title={item.name}
              renderRightActions={() =>
                !brand.includes(item.id) && (
                  <ListItemDeleteAction onPress={() => handleDelete(item.id)} />
                )
              }
            />
          )}
        />
      ) : null}
      <View style={styles.button}>
        <AppButton
          title="Add"
          color="secondary"
          onPress={() => navigation.navigate("Add Brand")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    bottom: 10,
    marginHorizontal: 10,
  },
});
