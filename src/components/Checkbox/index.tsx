import React from "react";
import "./styles.css";
import { FormikProps } from "formik";
import { get } from "lodash";
import clsx from "clsx";

export interface Option {
  value: string;
  label: string;
}

export interface FieldProps {
  options: Option[];
  name: string;
  header?: string;
  helperText?: string;
  column?: boolean;
}
interface CheckBoxProps {
  formikProps: FormikProps<{ gender: string[]; placed: string[] }>;
  fieldProps: FieldProps;
}

const CheckBox: React.FC<CheckBoxProps> = ({ formikProps, fieldProps }) => {
  const fieldValue: string[] =
    get(formikProps, `values.${fieldProps.name}`) || [];
  console.log(fieldProps.name, fieldValue);

  const fieldError = get(formikProps, `errors.${fieldProps.name}`);
  console.log(formikProps);
  console.log(fieldError);
  const { options = [], name, helperText, column = false } = fieldProps;
  return (
    <div className="checkbox-field other-class">
      <span className="checkbox-header">{fieldProps.header}</span>
      <div
        className={clsx("checkbox-container", column ? "column" : undefined)}
      >
        {options.map((it) => (
          <span key={it.value} className="checkbox-label">
            <input
              className="checkbox-input"
              type="checkbox"
              name={name}
              value={it.value}
              checked={fieldValue?.includes(it.value)}
              onChange={formikProps.handleChange}
            />
            {it.label}
          </span>
        ))}
      </div>
      {(fieldError || helperText) && (
        <div>
          {fieldError ? (
            <span className="error">{fieldError}</span>
          ) : (
            <span className="helper-text">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckBox;
