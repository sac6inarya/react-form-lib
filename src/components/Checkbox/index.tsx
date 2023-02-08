import React from "react";
import "./index.scss";
import { get } from "lodash";
import clsx from "clsx";
import { FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";

export interface Option {
  value: string;
  label: string;
}

export interface CheckboxFieldProps {
  options?: Option[];
  name?: string;
  header?: string;
  helperText?: string;
  column?: boolean;
  disabled?: boolean;
  nativeInputProps?: React.InputHTMLAttributes<object>;
}
interface CheckBoxProps extends FieldProps {
  fieldProps?: CheckboxFieldProps;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const {
    formikProps = {} as FormikValues,
    fieldProps = {} as CheckboxFieldProps,
  } = props;
  const {
    options = [],
    name = "",
    header,
    helperText,
    column = false,
  } = fieldProps;

  const fieldValue: string[] = get(formikProps, `values.${name}`) || [] || "";

  const fieldError = getFieldError(name, formikProps) as string;

  return (
    <div className={clsx("checkbox-field ", name)}>
      {header && (
        <span className="checkbox-header checkboxheader">{header}</span>
      )}
      <div
        className={clsx("checkbox-container", column ? "column" : undefined)}
      >
        {options.map((it) => (
          <span key={it.value} className="checkbox-label checkboxlabel">
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
            <span className="checkbox-error error">{fieldError}</span>
          ) : (
            <span className="helper-text helpertext">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckBox;
