import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import Colors from "../../config/Colors";
import itemApi from "../../api/adjective";
import authStorage from "../../auth/storage";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import AuthContext from "../../auth/context";

export default function UserListScreen({
  users,
  setUsers,
  refreshing,
  onRefresh,
}) {
  const context = useContext(AuthContext);

  const handleDelete = async (id, params) => {
    const token = await authStorage.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    itemApi.deleteItem("users", id, params, config).then(() => {
      const user = users.filter((item) => item.id != id);
      setUsers(user);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>USERS</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.email}
            image={require("../../assets/jm.jpg")}
            renderRightActions={() =>
              context.user.userId !== item.id && (
                <ListItemDeleteAction onPress={() => handleDelete(item.id)} />
              )
            }
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 10,
    borderColor: Colors.medium,
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
    alignSelf: "center",
  },
});
