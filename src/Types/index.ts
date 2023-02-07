import { FormikProps } from "formik";

export interface FieldProps {
  formikProps?: FormikProps<any>;
}

export interface Option {
  label: string;
  value: string;
}
