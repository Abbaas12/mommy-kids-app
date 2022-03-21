import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductScreen from "../screens/products/ProductScreen";
import ProductDetailScreen from "../screens/products/ProductDetailScreen";
import SearchProductScreen from "../screens/products/SearchProductScreen";

const Stack = createStackNavigator();

export default function ProductNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchProduct"
        component={SearchProductScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
