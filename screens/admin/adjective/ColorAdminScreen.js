import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../../components/forms";
import defaultStyle from "../../../config/styles";
import colorApi from "../../../api/adjective";
import authStorage from "../../../auth/storage";

const colorSchema = Yup.object().shape({
  name: Yup.string().required().max(15).label("Color's Name"),
});

export default function ColorAdminScreen({ navigation, route }) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setColor(null);
    } else {
      setColor(route.params.item);
    }

    return () => {
      setColor(null);
    };
  }, []);

  const handleSubmit = async (data) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let result;
    if (!color) {
      result = await colorApi.addItem("colors", data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Color");
    } else {
      result = await colorApi.editItem(`colors/${color.id}`, data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Color");
    }
    return result;
  };
  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>{color ? "Update Color" : "Add Color"}</Text>
      <Form
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        validationSchema={colorSchema}
      >
        <FormField
          name="name"
          placeholder={color ? color.name : "Color Name"}
          icon="invert-colors"
        />
        <SubmitButton title="Create" color="secondary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 50,
  },
});
