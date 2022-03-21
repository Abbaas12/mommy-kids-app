import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../../components/forms";
import defaultStyle from "../../../config/styles";
import typeApi from "../../../api/adjective";
import authStorage from "../../../auth/storage";

const typeSchema = Yup.object().shape({
  name: Yup.string().required().max(15).label("Type's Name"),
});
export default function TypeAdminScreen({ navigation, route }) {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setType(null);
    } else {
      setType(route.params.item);
    }

    return () => {
      setType(null);
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
    if (!type) {
      result = await typeApi.addItem("types", data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Type");
    } else {
      result = await typeApi.editItem(`types/${type.id}`, data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Type");
    }
    return result;
  };
  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>{type ? "Update Type" : "Add Type"}</Text>
      <Form
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        validationSchema={typeSchema}
      >
        <FormField
          name="name"
          placeholder={type ? type.name : "Type Name"}
          icon="format-list-bulleted-type"
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
