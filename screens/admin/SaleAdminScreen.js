import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import authStorage from "../../auth/storage";

import { Form, FormField, SubmitButton } from "../../components/forms";
import colors from "../../config/Colors";
import defaultStyle from "../../config/styles";
import itemApi from "../../api/adjective";
import { useFocusEffect } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import UploadScreen from "../UploadScreen";

const saleSchema = Yup.object().shape({
  customerName: Yup.string().max(50).label("Customer Name"),
  adsFee: Yup.number().label("Ads Fee"),
});
export default function SaleAdminScreen({ route, navigation }) {
  const gettingSaleItem = useApi(itemApi.getItem);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useFocusEffect(
    useCallback(() => {
      gettingSaleItem.request(`saleItems/${route.params.id}`);
    }, [])
  );

  const handleSubmit = async (data) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progress) =>
        setProgress(progress.loaded / progress.total),
    };

    setProgress(0);
    setUploadVisible(true);
    const result = await itemApi.addItem("sales", data, config);
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the Sale");
    }
    navigation.navigate("Home");
  };
  return (
    <View style={defaultStyle.formContainer}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Text style={styles.title}>Sale Product</Text>
      <Form
        initialValues={{
          customerName: "",
          adsFee: "",
          saleItem: route.params ? gettingSaleItem.data.id : null,
        }}
        onSubmit={handleSubmit}
        validationSchema={saleSchema}
        enableReinitialize={true}
      >
        <View style={styles.textContainer}>
          <Text>{gettingSaleItem.data.salename}</Text>
        </View>
        <FormField
          name="customerName"
          placeholder="Customer Name"
          icon="account-tie"
        />
        <FormField
          name="adsFee"
          placeholder="Advertisement Fee"
          icon="google-ads"
          keyboardType="numeric"
        />
        <SubmitButton title="Create" color="secondary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.black,
    marginBottom: 40,
  },
  textContainer: {
    padding: 18,
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: colors.light,
  },
});
