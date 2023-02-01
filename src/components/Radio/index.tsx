import { get } from "lodash";
import React from "react";
import "./index.scss";
import clsx from "clsx";
import { FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";

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
  disabled?: boolean;
  nativeInputProps?: React.InputHTMLAttributes<object>;
}
interface RadioProps extends FieldProps {
  fieldProps: RadioFieldProps;
}

const Radio: React.FC<RadioProps> = ({ formikProps, fieldProps }) => {
  const { options = [], name, helperText, header, column } = fieldProps;
  const fieldValue: string = get(formikProps, `values.${name}`) || "";

  const fieldError = getFieldError(name, formikProps) as string;

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
            <span className="radio-error error">{fieldError}</span>
          ) : (
            <span className="helper-text helpertext">{helperText}</span>
          )}
        </span>
      )}
    </div>
  );
};
export default Radio;
