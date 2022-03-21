import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../../components/forms";
import defaultStyle from "../../../config/styles";
import sizeApi from "../../../api/adjective";
import authStorage from "../../../auth/storage";

const sizeSchema = Yup.object().shape({
  name: Yup.string().required().max(15).label("Size's Name"),
});

export default function SizeAdminScreen({ navigation, route }) {
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setSize(null);
    } else {
      setSize(route.params.item);
    }

    return () => {
      setSize(null);
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
    if (!size) {
      result = await sizeApi.addItem("sizes", data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Size");
    } else {
      result = await sizeApi.editItem(`sizes/${size.id}`, data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Size");
    }
    return result;
  };
  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>{size ? "Update Size" : "Add Size"}</Text>
      <Form
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        validationSchema={sizeSchema}
      >
        <FormField
          name="name"
          placeholder={size ? size.name : "Size Name"}
          icon="size-xxl"
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
