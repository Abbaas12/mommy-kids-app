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

export default function Size({ navigation }) {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [size, setSize] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //get sizes
      itemApi
        .getItem("sizes")
        .then((res) => {
          setSizes(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));

      itemApi.getItem("products").then((res) => {
        const products = res.data.map((item) => item.size.id);
        setSize(products);
      });

      return () => {
        setSizes([]);
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
      .deleteItem("sizes", id, params, config)
      .then((res) => {
        const category = sizes.filter((item) => item.id != id);
        setSizes(category);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {loading === false ? (
        <FlatList
          data={sizes}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Add Size", { item })}
              title={item.name}
              renderRightActions={() =>
                !size.includes(item.id) && (
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
          onPress={() => navigation.navigate("Add Size")}
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
