import { FormikValues } from "formik";
import { get } from "lodash";

export const getFieldError = (fieldName: string, formikProps: FormikValues) => {
  const fieldError = get(formikProps, `errors.${fieldName}`);
  const isTouched = get(formikProps, `touched.${fieldName}`);
  if (!isTouched && formikProps.submitCount < 1) return "";
  return fieldError;
};
