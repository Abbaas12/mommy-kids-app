import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ListItem from "../../components/lists/ListItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";
import colors from "../../config/Colors";
import useAuth from "../../auth/useAuth";
import AuthContext from "../../auth/context";

const myList = [
  {
    title: "Sales",
    subtitle: "Look! how many you've sold!",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.warning,
    },
    targetScreen: "Home",
  },
  {
    title: "Warehouse",
    subtitle: "Look! how many item left in your warehouse!",
    icon: {
      name: "warehouse",
      backgroundColor: colors.doger,
    },
    targetScreen: "WareHouse",
  },
];

export default function UserProfile({ navigation }) {
  const { user, logout } = useAuth();
  const context = useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subtitle={user.email}
          image={require("../../assets/headerIcon.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={myList}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              iconComponent={
                <Icon
                  name={item.icon.name}
                  size={25}
                  color={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
        {context.user.isAdmin && (
          <ListItem
            title="Create New User"
            subtitle="You can Create a new user account for someone. Would you like to do it? Just Press!"
            iconComponent={
              <Icon name="account-plus" size={25} color={colors.secondary} />
            }
            onPress={() => navigation.navigate("Create User")}
          />
        )}
      </View>
      <ListItem
        title="Logout"
        iconComponent={<Icon name="logout" size={25} color="#ffe66d" />}
        onPress={() => logout()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {},
});
