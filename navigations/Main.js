import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import AdminNavigatorIcon from "./AdminNavigatorIcon";
import AdminNavigator from "./AdminNavigator";
import UserNavigator from "./UserNavigator";
import ProductNavigator from "./ProductNavigator";
import SaleNavigator from "./SaleNavigator";
import ProfitScreen from "../screens/Profit/ProfitScreen";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";

const Tab = createBottomTabNavigator();

export default function Main() {
  const context = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={SaleNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WareHouse"
        component={ProductNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="warehouse"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {context.user.isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color }) => (
              <Icon name="cog" size={size} color={color} />
            ),
            tabBarButton: () => (
              <AdminNavigatorIcon
                onPress={() =>
                  navigation.navigate("Admin", { screen: "Admin Screen" })
                }
              />
            ),
          })}
        />
      )}

      <Tab.Screen
        name="Profit"
        component={ProfitScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="calculator-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
