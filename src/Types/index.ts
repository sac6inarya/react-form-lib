import { FormikProps } from "formik";

export interface FieldProps {
  formikProps?: FormikProps<any>;
}

export interface FieldItemProps {
  name: string;
  id: string;
  label?: string;
  disabled?: boolean;
  classNames?: string | Array<string>;
  helperText?: string;
  nativeInputProps?: React.InputHTMLAttributes<object>;
}

export interface Option {
  ilabel: string;
  value: string;
}
