import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AppButton from "./AppButton";
import colors from "../config/Colors";
import PickerItem from "./PickerItem";

export default function Picker({
  icon,
  selectedItem,
  placeholder,
  width = "100%",
  items,
  onSelectItem,
  rightIcon = "chevron-down",
}) {
  const [modelVisible, setModelVisible] = useState(false);
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
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PickerItem
              item={item}
              onPress={() => {
                setModelVisible(false);
                onSelectItem(item);
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
