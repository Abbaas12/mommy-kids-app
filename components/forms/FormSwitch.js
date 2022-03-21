import React from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { useFormikContext } from "formik";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function FormSwitch({ name, icon, placeholder, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={20} />}
      <Text style={styles.text}>{placeholder}</Text>
      <Switch
        {...otherProps}
        onValueChange={(item) => setFieldValue(name, item)}
        value={values[name]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
