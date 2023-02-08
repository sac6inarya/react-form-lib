import React from "react";
import { getFieldError } from "../../Utils";
import { FieldItemProps, FieldProps } from "../../Types";
import { isString } from "lodash";
import "./index.scss";
import { FormikValues } from "formik";
import clsx from "clsx";
import TextHelperError from "../TextHelperError";
import { Option } from "../../Types";
export interface SelectFProps extends FieldItemProps {
  options?: Option[];
  emptyItem?: string | boolean;
}
interface SelectFieldProps extends FieldProps {
  fieldProps?: SelectFProps;
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { formikProps = {} as FormikValues, fieldProps = {} as SelectFProps } =
    props;
  const {
    name = "",
    label,
    options = [],
    emptyItem,
    helperText,
    classNames,
  } = fieldProps;
  const fieldError = getFieldError(name, formikProps) || "";
  const emptyItemText = isString(emptyItem) ? emptyItem : "No option selected";

  const optionList = emptyItem
    ? [{ value: "", ilabel: emptyItemText }, ...options]
    : options;

  return (
    <div className={clsx("select-field", classNames)}>
      {label && (
        <label htmlFor={name} className="select-field-label selectfieldlabel">
          {label}
        </label>
      )}
      <div className="select-container">
        <select
          id={name}
          onChange={formikProps.handleChange}
          className="select-option selectoption"
        >
          {optionList.map((it) => {
            return (
              <option key={it.value} value={it.value}>
                {it.ilabel}
              </option>
            );
          })}
        </select>
      </div>

      <TextHelperError fieldError={fieldError} helperText={helperText} />
    </div>
  );
};
export default SelectField;
