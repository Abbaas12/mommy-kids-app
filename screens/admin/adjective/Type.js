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

export default function Type({ navigation }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [type, setType] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //get types
      itemApi
        .getItem("types")
        .then((res) => {
          setTypes(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));

      itemApi.getItem("products").then((res) => {
        const products = res.data.map((item) => item.type.id);
        setType(products);
      });

      return () => {
        setTypes([]);
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
      .deleteItem("types", id, params, config)
      .then((res) => {
        const category = types.filter((item) => item.id != id);
        setTypes(category);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {loading === false ? (
        <FlatList
          data={types}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Add Type", { item })}
              title={item.name}
              renderRightActions={() =>
                !type.includes(item.id) && (
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
          onPress={() => navigation.navigate("Add Type")}
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
