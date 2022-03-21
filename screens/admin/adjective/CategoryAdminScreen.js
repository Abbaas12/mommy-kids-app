import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../../../components/forms";
import defaultStyle from "../../../config/styles";
import categoryApi from "../../../api/adjective";
import authStorage from "../../../auth/storage";

const categorySchema = Yup.object().shape({
  name: Yup.string().max(15).label("Category's Name"),
});

export default function CategoryAdminScreen({ navigation, route }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!route.params) {
      setCategory(null);
    } else {
      setCategory(route.params.item);
    }

    return () => {
      setCategory(null);
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
    if (!category) {
      result = await categoryApi.addItem("categories", data, config);
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Category");
    } else {
      result = await categoryApi.editItem(
        `categories/${category.id}`,
        data,
        config
      );
      if (!result.ok) console.log(result.problem);
      navigation.navigate("Category");
    }
    return result;
  };

  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>
        {category ? "Update Category" : "Add Category"}
      </Text>
      <Form
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
      >
        <FormField
          name="name"
          placeholder={category ? category.name : "Category Name"}
          icon="filter"
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
