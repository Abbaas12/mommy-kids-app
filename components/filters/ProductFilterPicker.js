import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Modal,
  Button,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../config/Colors";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import { ListItem } from "../lists";

export default function ProductPicker({
  icon,
  selectedItem,
  placeholder,
  width = "100%",
  items,
  onSelectItem,
  rightIcon = "chevron-down",
  itemFilter,
}) {
  const [modelVisible, setModelVisible] = useState(false);
  const [productFilter, setProductFilter] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(items);
    setProductFilter(items);

    return () => {
      setProducts([]);
      setProductFilter([]);
    };
  }, [modelVisible]);

  const seatchProduct = (text) => {
    setProductFilter(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModelVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <Icon
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.name}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <Icon name={rightIcon} size={20} color={colors.medium} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modelVisible} animationType="slide">
        <View style={{ width: "95%", alignSelf: "center" }}>
          <AppButton
            title="Close"
            onPress={() => setModelVisible(false)}
            color="doger"
          />
        </View>
        <AppInput
          placeholder="Search"
          onChangeText={(text) => seatchProduct(text)}
        />
        <FlatList
          data={productFilter}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={`Stock: ${item.stock}  Price: $${item.originalPrice}`}
              image={{ uri: item.image }}
              onPress={() => {
                setModelVisible(false);
                onSelectItem(item);
                itemFilter(item.id);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: "black",
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
});
