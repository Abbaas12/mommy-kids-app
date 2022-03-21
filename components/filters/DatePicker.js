import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Colors from "../../config/Colors";

export default function DatePicker({ show, onPress, value, onChange, name }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>
          {name}:{moment(value).format("MMM ddd Do YYYY")}
        </Text>
      </TouchableOpacity>
      {show && <DateTimePicker mode="date" value={value} onChange={onChange} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: Colors.secondary,
    marginRight: 5,
  },
});
