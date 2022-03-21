import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../../components/forms";
import defaultStyle from "../../../config/styles";
import brandApi from "../../../api/adjective";
import authStorage from "../../../auth/storage";

const brandSchema = Yup.object().shape({
  name: Yup.string().required().max(15).label("Brand's Name"),
});

export default function BrandAdminScreen({ navigation, route }) {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setBrand(null);
    } else {
      setBrand(route.params.item);
    }

    return () => {
      setBrand(null);
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
    if (!brand) {
      result = await brandApi.addItem("brands", data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Brand");
    } else {
      result = await brandApi.editItem(`brands/${brand.id}`, data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Brand");
    }
    return result;
  };
  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>{brand ? "Update Brand" : "Add Brand"}</Text>
      <Form
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        validationSchema={brandSchema}
      >
        <FormField
          name="name"
          placeholder={brand ? brand.name : "Brand Name"}
          icon="shoe-heel"
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
