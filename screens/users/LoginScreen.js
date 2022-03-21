import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../../components/forms";

import authApi from "../../api/auth";
import defaultStyle from "../../config/styles";
import useAuth from "../../auth/useAuth";

const loginUserSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setErrorVisible(true);

    setErrorVisible(false);

    return login(result.data.token);
  };

  return (
    <View style={defaultStyle.formContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/headerIcon.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <Form
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={loginUserSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password!"
          visible={errorVisible}
        />
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
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" color="doger" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
