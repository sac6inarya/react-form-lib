import React from "react";
import { FieldProps } from "../../Types";
import "./index.scss";
import { get } from "lodash";
import { FormikValues } from "formik";
import clsx from "clsx";

export interface SwitchFieldProps {
  name?: string;
  header?: string;
  helperText?: string;
  disabled?: boolean;
  nativeInputProps?: React.InputHTMLAttributes<object>;
}

interface SwithcProps extends FieldProps {
  fieldProps?: SwitchFieldProps;
}

const Switch: React.FC<SwithcProps> = (props) => {
  const {
    formikProps = {} as FormikValues,
    fieldProps = {} as SwitchFieldProps,
  } = props;
  const { header, name = "", helperText } = fieldProps;

  const fieldValue = get(formikProps, `values.${name}`);
  const handleOnChange = () => {
    formikProps.setFieldValue(`${name}`, !fieldValue);
  };
  return (
    <div className={clsx("switch-field", name)}>
      {header && <span className="switch-header switchheader">{header}</span>}
      <label className="switch-container">
        <input
          className="slider"
          type="checkbox"
          checked={!!fieldValue}
          value={fieldValue}
          onChange={handleOnChange}
        />
        <span className="slider round"></span>
      </label>
      <span className="helper-text helpertext">{helperText}</span>
    </div>
  );
};

export default Switch;
