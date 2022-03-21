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

export default function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [category, setCategory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //get category
      itemApi
        .getItem("categories")
        .then((res) => {
          setCategories(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));

      itemApi.getItem("products").then((res) => {
        const products = res.data.map((item) => item.category.id);
        setCategory(products);
      });

      return () => {
        setCategories([]);
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
      .deleteItem("categories", id, params, config)
      .then((res) => {
        const category = categories.filter((item) => item.id != id);
        setCategories(category);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {loading === false ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Add Category", { item })}
              title={item.name}
              renderRightActions={() =>
                !category.includes(item.id) && (
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
          onPress={() => navigation.navigate("Add Category")}
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
