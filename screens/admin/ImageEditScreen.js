import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import { Form, SubmitButton, FormImagePicker } from "../../components/forms";
import defaultStyle from "../../config/styles";
import authStorage from "../../auth/storage";
import listingsApi from "../../api/listings";

const imageSchema = Yup.object().shape({
  image: Yup.string().required().typeError("Image is a required field"),
});

export default function ImageEditScreen({ route, navigation }) {
  const [item, setItem] = useState();

  useEffect(() => {
    if (!route.params) {
      setItem(null);
    } else {
      setItem(route.params.item);
    }
    return () => {
      setItem(null);
    };
  }, [route.params]);

  const handleSubmit = async (value) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await listingsApi.updateImage(
      `products/image/${item.id}`,
      value,
      config
    );
    if (!result.ok) console.log(result.problem);
    navigation.navigate("WareHouse", {
      screen: "Product Detail",
      params: { item: result.data },
    });
    console.log(result.data);
    return result;
  };

  return (
    <View style={defaultStyle.formContainer}>
      <Form
        initialValues={{ image: item ? item.image : "" }}
        onSubmit={handleSubmit}
        validationSchema={imageSchema}
        enableReinitialize={true}
      >
        <View
          style={{
            marginBottom: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormImagePicker name="image" />
        </View>
        <SubmitButton title="Upload" color="secondary" />
      </Form>
    </View>
  );
}
