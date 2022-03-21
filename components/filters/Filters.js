import React, { useState } from "react";
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
import PickerItem from "../PickerItem";

export default function Filters({
  itemFilter,
  items,
  selectedItem,
  onSelectItem,
  placeholder,
}) {
  const [modelVisible, setModelVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModelVisible(true)}>
        <View style={styles.container}>
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.name}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <Icon name="arrow-right" size={20} color={colors.medium} />
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
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PickerItem
              item={item}
              onPress={() => {
                setModelVisible(false);
                onSelectItem(item);
                itemFilter(item.id);
              }}
            />
          )}
          numColumns={2}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
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
