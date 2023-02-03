import { FormikProps } from "formik";

export interface FieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formikProps?: FormikProps<any>;
}

export interface Option {
  label: string;
  value: string;
}
