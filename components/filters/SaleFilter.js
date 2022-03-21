import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import ProductFilterPicker from "./ProductFilterPicker";

export default function SaleFilter({ items, setSaleFilter, sales }) {
  const [product, setProduct] = useState();

  const itemFilter = (itemId) => {
    {
      itemId === "all" ||
      itemId === "" ||
      itemId === null ||
      itemId === undefined
        ? setSaleFilter(sales)
        : setSaleFilter(sales.filter((item) => item.product.id === itemId));
    }
  };

  return (
    <View style={styles.container}>
      <ProductFilterPicker
        items={items}
        placeholder="Product"
        onSelectItem={(item) => setProduct(item)}
        selectedItem={product}
        itemFilter={itemFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
