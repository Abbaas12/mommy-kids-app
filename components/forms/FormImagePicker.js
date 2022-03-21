import React from "react";
import { useFormikContext } from "formik";

import ImageInput from "../ImageInput";
import ErrorMessage from "./ErrorMessage";

export default function FormImagePicker({ name }) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const imageUri = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  const handleRemove = () => {
    setFieldValue(name, null);
  };
  return (
    <>
      <ImageInput
        imageUri={imageUri}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
