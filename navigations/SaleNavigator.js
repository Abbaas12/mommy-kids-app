import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SaleScreen from "../screens/saleProducts/SaleScreen";
import SaleItemDetailScreen from "./../screens/saleProducts/SaleItemDetailScreen";
import SearchSaleScreen from "./../screens/saleProducts/SearchSaleScreen";
import SaleItemTrash from "../screens/saleProducts/SaleItemTrash";

const Stack = createStackNavigator();

export default function SaleNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sale"
        component={SaleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sale Detail"
        component={SaleItemDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchSale"
        component={SearchSaleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Trash SaleItem"
        component={SaleItemTrash}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
