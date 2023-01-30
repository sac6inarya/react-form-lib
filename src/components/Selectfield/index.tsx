import React from "react";
import { getFieldError } from "../../Utils";
import { FieldProps, Option } from "../../Types";
import { isString } from "lodash";
import "./styles.css";

export interface SelectFProps {
  name: string;
  label?: string;
  options?: Option[];
  emptyItem?: string | boolean;
  helperText?: string;
}
interface SelectFieldProps extends FieldProps {
  fieldProps: SelectFProps;
}

const SelectField: React.FC<SelectFieldProps> = ({
  fieldProps,
  formikProps,
}) => {
  const { name, label, options = [], emptyItem, helperText } = fieldProps;
  const fieldError = getFieldError(name, formikProps) || "";
  const emptyItemText = isString(emptyItem) ? emptyItem : "Empty";

  console.log(fieldError, emptyItemText);
  const optionList = emptyItem
    ? [{ value: "", label: emptyItemText }, ...options]
    : options;

  return (
    <div className="select-field">
      <label htmlFor={name} className="select-label">
        {label}
      </label>
      <div className="select-container">
        <select id={name} onChange={formikProps.handleChange}>
          {optionList.map((it) => {
            return (
              <option key={it.value} value={it.value}>
                {it.label}
              </option>
            );
          })}
        </select>
      </div>

      {(helperText || fieldError) && (
        <span>
          {fieldError ? (
            <span className="select-error error">{fieldError}</span>
          ) : (
            <span className="helper-text helpertext">{helperText}</span>
          )}
        </span>
      )}
    </div>
  );
};
export default SelectField;
