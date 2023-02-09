import React from "react";
import "./index.scss";
import { get } from "lodash";
import clsx from "clsx";
import { FieldItemProps, FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";
import TextHelperError from "../TextHelperError";
import { Option } from "../../Types";

export interface CheckboxFieldProps extends FieldItemProps {
  options?: Option[];
  column?: boolean;
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
    label,
    helperText,
    column = false,
    classNames,
  } = fieldProps;

  const fieldValue: string[] = get(formikProps, `values.${name}`) || [] || "";

  const fieldError = getFieldError(name, formikProps) as string;

  return (
    <div className={clsx("checkbox-field ", classNames)}>
      {label && <span className="checkbox-label checkboxlabel">{label}</span>}
      <div
        className={clsx("checkbox-container", column ? "column" : undefined)}
      >
        {options.map((it) => (
          <span key={it.value} className="checkbox-name checkboxname">
            <input
              className="checkbox-input"
              type="checkbox"
              name={name}
              value={it.value}
              checked={fieldValue?.includes(it.value)}
              onChange={formikProps.handleChange}
            />
            {it.name}
          </span>
        ))}
      </div>
      <TextHelperError fieldError={fieldError} helperText={helperText} />
    </div>
  );
};

export default CheckBox;
