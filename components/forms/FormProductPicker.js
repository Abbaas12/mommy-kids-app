import React from "react";
import { useFormikContext } from "formik";

import ProductPicker from "../ProductPicker";
import ErrorMessage from "./ErrorMessage";

export default function FormProductPicker({
  name,
  items,
  placeholder,
  setSelectedProduct,
}) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  return (
    <>
      <ProductPicker
        items={items}
        onSelectItem={(item) => {
          setFieldValue(name, item);
          setSelectedProduct(item);
        }}
        selectedItem={values[name]}
        placeholder={placeholder}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
