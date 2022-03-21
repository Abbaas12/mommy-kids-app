import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppButton from "../../components/AppButton";
import itemApi from "../../api/adjective";
import UserListScreen from "./UserListScreen";

const { width } = Dimensions.get("window");

export default function Admin({ navigation }) {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = async () => {
    const result = await itemApi.getItem("users");
    if (!result.ok) console.log(result.problem);
    setUsers(result.data);
  };

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <AppButton
          title="Product"
          icon="home-plus"
          onPress={() => navigation.navigate("Add Product")}
          style={styles.button}
          fontSize={14}
          color="doger"
        />
        <AppButton
          title="Sale"
          icon="cart-arrow-right"
          onPress={() => navigation.navigate("Sale Item")}
          style={styles.button}
          fontSize={14}
          color="doger"
        />
        <AppButton
          title="Category"
          icon="filter"
          onPress={() => navigation.navigate("Category")}
          style={styles.button}
          fontSize={12}
          color="doger"
        />
        <AppButton
          title="Brand"
          icon="tshirt-v"
          onPress={() => navigation.navigate("Brand")}
          style={styles.button}
          fontSize={14}
          color="doger"
        />
        <AppButton
          title="Size"
          icon="size-xxl"
          onPress={() => navigation.navigate("Size")}
          style={styles.button}
          fontSize={14}
          iconSize={25}
          color="doger"
        />
        <AppButton
          title="Type"
          icon="format-list-bulleted-type"
          onPress={() => navigation.navigate("Type")}
          style={styles.button}
          fontSize={14}
          color="doger"
        />
        <View style={{ width: "95%" }}>
          <AppButton
            title="Color"
            icon="format-color-fill"
            onPress={() => navigation.navigate("Color")}
            style={styles.color}
            fontSize={14}
            color="doger"
          />
        </View>
        <View style={styles.userContainer}>
          <UserListScreen
            refreshing={refreshing}
            onRefresh={getUsers}
            users={users}
            setUsers={setUsers}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: width / 3.5,
  },
  color: {
    flexDirection: "row",
  },
  userContainer: {
    marginTop: 20,
    width,
  },
});
