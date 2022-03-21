import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import itemApi from "../../api/adjective";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import Colors from "../../config/Colors";
import authStorage from "../../auth/storage";

export default function SaleItemTrash() {
  const [saleItemFilter, setSaleItemFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // get sales
      itemApi.getItem("sales").then((res) => {
        const sale = res.data.map((item) => item.saleItem.id);
        itemApi.getItem("saleItems").then((data) => {
          setSaleItemFilter(
            data.data.filter((item) => !sale.includes(item.id))
          );
          setLoading(false);
        });
      });

      return () => {
        setSaleItemFilter([]);
        setLoading(true);
      };
    }, [])
  );

  const handleDelete = async (id, params) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    itemApi
      .deleteItem("saleItems", id, params, config)
      .then((res) => {
        const saleItem = saleItemFilter.filter((item) => item.id != id);
        setSaleItemFilter(saleItem);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {loading ? null : (
        <>
          {saleItemFilter.length > 0 ? (
            <>
              <Text style={styles.title}>You Should Delete All!</Text>
              <FlatList
                data={saleItemFilter}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.salename}
                    subtitle={`Quantity: ${item.quantity} Price: $${item.salePrice}`}
                    renderRightActions={() => (
                      <ListItemDeleteAction
                        onPress={() => handleDelete(item.id)}
                      />
                    )}
                  />
                )}
              />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.empty}>Empty!</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colors.danger,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
  },
  empty: {
    fontSize: 100,
    fontWeight: "bold",
    textShadowColor: Colors.dark,
    color: Colors.medium,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
    elevation: 3,
  },
});
