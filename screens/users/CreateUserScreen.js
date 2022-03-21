import React, { useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormSwitch,
  SubmitButton,
} from "../../components/forms";
import defaultStyle from "../../config/styles";
import userApi from "../../api/user";
import authStorage from "../../auth/storage";
import UploadScreen from "../UploadScreen";

const userSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(15).label("Name"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.number().required().label("Phone"),
  password: Yup.string().required().min(6).label("Password"),
  isAdmin: Yup.boolean().required().nullable().label("Is Admin"),
});

export default function CreateUserScreen({ navigation }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (userInfo) => {
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
    const result = await userApi.register(userInfo, config);
    if (!result.ok) {
      setUploadVisible(false);
      console.log(result.problem);
    }
    navigation.navigate("Admin");
    return result;
  };

  return (
    <View style={defaultStyle.formContainer}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          isAdmin: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
        enableReinitialize={true}
      >
        <FormField name="name" icon="account-box" placeholder="User Name" />
        <FormField
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="phone"
          icon="phone"
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          secureTextEntry
          placeholder="Password"
        />
        <FormSwitch
          name="isAdmin"
          placeholder="Is Admin :"
          icon="account-star"
        />
        <SubmitButton title="Create" color="secondary" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
