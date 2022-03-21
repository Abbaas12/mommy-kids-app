import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import * as Yup from "yup";

import Colors from "../../config/Colors";
import defaultStyle from "../../config/styles";
import {
  Form,
  FormField,
  FormPicker,
  SubmitButton,
  FormImagePicker,
} from "../../components/forms";
import useApi from "./../../hooks/useApi";
import authStorage from "../../auth/storage";
import getItem from "../../api/adjective";
import listingsApi from "../../api/listings";
import UploadScreen from "../UploadScreen";

const productSchema = Yup.object().shape({
  name: Yup.string().required().label("Product's Name"),
  originalPrice: Yup.number().required().min(1).label("Price"),
  stock: Yup.number().required().label("Count In Stock"),
  category: Yup.object().required().nullable().label("Category"),
  size: Yup.object().required().nullable().label("Size"),
  brand: Yup.object().required().nullable().label("Brand"),
  color: Yup.object().required().nullable().label("Color"),
  type: Yup.object().required().nullable().label("Type"),
  image: Yup.string().label("Image").typeError("Image is a required field"),
});

export default function ProductAdminScreen({ navigation, route }) {
  const [item, setItem] = useState(null);
  const gettingCategory = useApi(getItem.getItem);
  const gettingBrand = useApi(getItem.getItem);
  const gettingSize = useApi(getItem.getItem);
  const gettingType = useApi(getItem.getItem);
  const gettingColor = useApi(getItem.getItem);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params) {
      setItem(route.params.item);
    } else {
      setItem(null);
    }
    gettingCategory.request("categories");
    gettingBrand.request("brands");
    gettingSize.request("sizes");
    gettingType.request("types");
    gettingColor.request("colors");

    return () => {
      setItem(null);
    };
  }, [route.params]);

  const handleSubmit = async (value, { resetForm }) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progress) =>
        setProgress(progress.loaded / progress.total),
    };

    if (!item) {
      setLoading(true);
      setProgress(0);
      setUploadVisible(true);
      const result = await listingsApi.addListings("products", value, config);
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the Product");
      }
      navigation.navigate("WareHouse", { screen: "Product" });
      setLoading(false);
    } else {
      setLoading(true);
      setProgress(0);
      setUploadVisible(true);
      const result = await listingsApi.updateListings(
        `products/${item.id}`,
        value,
        config
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the Product");
      }
      navigation.navigate("WareHouse", { screen: "Product" });
      setLoading(false);
    }

    resetForm();
  };

  return (
    <>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      {!loading && (
        <ScrollView>
          <View style={[styles.container, defaultStyle.formContainer]}>
            <Form
              initialValues={{
                name: item ? item.name : "",
                originalPrice: item ? item.originalPrice.toString() : "",
                stock: item ? item.stock.toString() : "",
                category: item ? item.category : null,
                size: item ? item.size : null,
                color: item ? item.color : null,
                type: item ? item.type : null,
                brand: item ? item.brand : null,
                image: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={productSchema}
              enableReinitialize={true}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
              >
                {item ? "Edit Product" : "Add Product"}
              </Text>
              {!item ? <FormImagePicker name="image" /> : null}
              <FormField
                icon="shopping"
                placeholder="Product's Name"
                name="name"
              />
              <FormPicker
                name="category"
                placeholder="Category"
                items={gettingCategory.data}
              />
              <FormField
                placeholder="Price"
                name="originalPrice"
                keyboardType="numeric"
                icon="currency-usd-circle-outline"
              />

              <FormPicker
                name="size"
                placeholder={item ? item.size.name : "Product's Size"}
                items={gettingSize.data}
              />
              <FormPicker
                name="color"
                placeholder={item ? item.color.name : "Product's Color"}
                items={gettingColor.data}
              />
              <FormPicker
                name="brand"
                placeholder={item ? item.brand.name : "Brand"}
                items={gettingBrand.data}
              />
              <FormPicker
                name="type"
                placeholder="Type"
                items={gettingType.data}
              />
              <FormField
                placeholder="Stock"
                name="stock"
                keyboardType="numeric"
                icon="numeric-9-plus-box-multiple"
              />
              <SubmitButton
                title={item ? "Edit" : "Create"}
                color="secondary"
              />
            </Form>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 1,
    height: "100%",
  },
});
