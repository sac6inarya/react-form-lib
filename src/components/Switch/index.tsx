import React from "react";
import { FieldProps } from "../../Types";
import "./styles.css";
import { get } from "lodash";

export interface SwitchFieldProps {
  name?: string;
  label?: string;
  helperText?: string;
}

interface SwithcProps extends FieldProps {
  fieldProps: SwitchFieldProps;
}

const Switch: React.FC<SwithcProps> = ({ formikProps, fieldProps }) => {
  const { label, name, helperText } = fieldProps;

  const fieldValue = get(formikProps, `values.${name}`);
  const handleOnChange = () => {
    formikProps.setFieldValue(`${name}`, !fieldValue);
  };
  return (
    <div className="switch-field">
      <span className="switch-label">{label}</span>
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
      <span className="helper-text">{helperText}</span>
    </div>
  );
};

export default Switch;
