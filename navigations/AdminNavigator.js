import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductAdminScreen from "../screens/admin/ProductAdminScreen";
import SaleAdminScreen from "../screens/admin/SaleAdminScreen";
import SaleItemAdmin from "../screens/admin/SaleItemAdmin";
import Admin from "../screens/admin/Admin";
import CategoryAdminScreen from "../screens/admin/adjective/CategoryAdminScreen";
import BrandAdminScreen from "../screens/admin/adjective/BrandAdminScreen";
import SizeAdminScreen from "../screens/admin/adjective/SizeAdminScreen";
import TypeAdminScreen from "../screens/admin/adjective/TypeAdminScreen";
import Category from "../screens/admin/adjective/Category";
import Brand from "../screens/admin/adjective/Brand";
import Size from "../screens/admin/adjective/Size";
import Type from "../screens/admin/adjective/Type";
import Color from "./../screens/admin/adjective/Color";
import ColorAdminScreen from "./../screens/admin/adjective/ColorAdminScreen";
import ImageEditScreen from "../screens/admin/ImageEditScreen";

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin Screen"
        component={Admin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Product"
        component={ProductAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Upload Image"
        component={ImageEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sale Item"
        component={SaleItemAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sale Product"
        component={SaleAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Category"
        component={CategoryAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Brand"
        component={Brand}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Brand"
        component={BrandAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Size"
        component={Size}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Size"
        component={SizeAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Type"
        component={Type}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Type"
        component={TypeAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Color"
        component={Color}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Color"
        component={ColorAdminScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
