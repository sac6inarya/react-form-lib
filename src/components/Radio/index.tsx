import { get } from "lodash";
import React from "react";
import "./styles.css";
import clsx from "clsx";
import { FieldProps } from "../../Types";

export interface Option {
  value: string;
  label: string;
}

export interface RadioFieldProps {
  options: Option[];
  name: string;
  header?: string;
  helperText?: string;
  column?: boolean;
}
interface RadioProps extends FieldProps {
  fieldProps: RadioFieldProps;
}

const Radio: React.FC<RadioProps> = ({ formikProps, fieldProps }) => {
  const { options = [], name, helperText, header, column } = fieldProps;
  const fieldValue: string =
    get(formikProps, `values.${fieldProps.name}`) || "";

  const fieldError = get(formikProps, `errors.${fieldProps.name}`) as string;

  return (
    <div className={clsx("radio-field", name)}>
      {<span className="radio-header">{header}</span>}
      <div className={clsx("radio-container", column ? "column" : undefined)}>
        {options.map((it) => (
          <span key={it.value} className="radio-label">
            <input
              className="radio-input"
              type="radio"
              name={name}
              value={it.value}
              checked={fieldValue === it.value}
              onChange={formikProps.handleChange}
            />
            {it.label}
          </span>
        ))}
      </div>

      {(fieldError || helperText) && (
        <span>
          {fieldError ? (
            <span className="error">{fieldError}</span>
          ) : (
            <span className="helper-text">{helperText}</span>
          )}
        </span>
      )}
    </div>
  );
};
export default Radio;
