import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Filters from "./Filters";

export default function ProductFilter({
  products,
  setProductFilter,
  categories,
  sizes,
  types,
  colors,
  brands,
}) {
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [type, setType] = useState();

  const itemFiler = (itemId) => {
    {
      itemId === "all" || itemId === "" || itemId === null
        ? setProductFilter(products)
        : setProductFilter(
            products.filter(
              (item) =>
                item.category.id === itemId ||
                item.brand.id === itemId ||
                item.color.id === itemId ||
                item.size.id === itemId ||
                item.type.id === itemId
            )
          );
    }
  };
  return (
    <View style={styles.container}>
      <Filters
        placeholder="Category"
        selectedItem={category}
        items={categories}
        onSelectItem={(item) => setCategory(item)}
        itemFilter={itemFiler}
      />
      <Filters
        selectedItem={brand}
        placeholder="Brand"
        items={brands}
        onSelectItem={(item) => setBrand(item)}
        itemFilter={itemFiler}
      />
      <Filters
        selectedItem={color}
        placeholder="Color"
        items={colors}
        onSelectItem={(item) => setColor(item)}
        itemFilter={itemFiler}
      />
      <Filters
        selectedItem={size}
        placeholder="Size"
        items={sizes}
        onSelectItem={(item) => setSize(item)}
        itemFilter={itemFiler}
      />
      <Filters
        selectedItem={type}
        placeholder="Type"
        items={types}
        onSelectItem={(item) => setType(item)}
        itemFilter={itemFiler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
