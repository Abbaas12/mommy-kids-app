import { Formik } from "formik";
import React from "react";

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  enableReinitialize,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
