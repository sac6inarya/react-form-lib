import React from "react";
import "./styles.css";
import { get } from "lodash";
import clsx from "clsx";
import { FieldProps } from "../../Types";

export interface Option {
  value: string;
  label: string;
}

export interface CheckboxFieldProps {
  options: Option[];
  name: string;
  header?: string;
  helperText?: string;
  column?: boolean;
}
interface CheckBoxProps extends FieldProps {
  fieldProps: CheckboxFieldProps;
}

const CheckBox: React.FC<CheckBoxProps> = ({ formikProps, fieldProps }) => {
  const fieldValue: string[] =
    get(formikProps, `values.${fieldProps.name}`) || [];

  const fieldError = get(formikProps, `errors.${fieldProps.name}`) as string;
  const { options = [], name, helperText, column = false } = fieldProps;

  return (
    <div className={clsx("checkbox-field ", name)}>
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
