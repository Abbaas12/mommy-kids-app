import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormProductPicker,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/Colors";
import defaultStyle from "../../config/styles";
import useApi from "../../hooks/useApi";
import itemApi from "../../api/adjective";
import authStorage from "../../auth/storage";

export default function SaleItemAdmin({ navigation }) {
  const gettingProducts = useApi(itemApi.getItem);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const saleItemSchema = Yup.object().shape({
    product: Yup.object().required().nullable().label("Product"),
    quantity: Yup.number()
      .required()
      .max(selectedProduct === null ? null : selectedProduct.stock)
      .label("Quantity"),
    salePrice: Yup.number().required().label("Sale Price"),
  });

  useEffect(() => {
    gettingProducts.request("products");
  }, []);

  const handleSubmit = async (data) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await itemApi.addItem("saleItems", data, config);
    if (!result.ok) alert("Could not save the SaleItem");
    navigation.navigate("Sale Product", result.data);
  };

  return (
    <View style={defaultStyle.formContainer}>
      <Text style={styles.text}>Sale Item</Text>
      <Form
        initialValues={{
          product: null,
          quantity: "",
          salePrice: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={saleItemSchema}
      >
        <FormProductPicker
          name="product"
          placeholder="Product"
          items={gettingProducts.data}
          setSelectedProduct={setSelectedProduct}
        />
        <FormField
          name="quantity"
          placeholder="Quantity"
          keyboardType="numeric"
          icon="format-list-numbered-rtl"
        />
        <FormField
          name="salePrice"
          placeholder="Sale Price"
          keyboardType="numeric"
          icon="currency-usd-circle-outline"
        />
        <SubmitButton title="Next" color="primary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 40,
    textTransform: "uppercase",
  },
});
