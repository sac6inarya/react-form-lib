import { get } from "lodash";
import React from "react";
import "./index.scss";
import clsx from "clsx";
import { FieldItemProps, FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";
import TextHelperError from "../TextHelperError";
import { Option } from "../../Types";
export interface RadioFieldProps extends FieldItemProps {
  options?: Option[];
  column?: boolean;
}
interface RadioProps extends FieldProps {
  fieldProps?: RadioFieldProps;
}

const Radio: React.FC<RadioProps> = (props) => {
  const {
    formikProps = {} as FormikValues,
    fieldProps = {} as RadioFieldProps,
  } = props;
  const {
    options = [],
    name = "",
    helperText,
    label,
    column,
    classNames,
  } = fieldProps;
  const fieldValue: string = get(formikProps, `values.${name}`) || "";

  const fieldError = getFieldError(name, formikProps) as string;

  return (
    <div className={clsx("radio-field", classNames)}>
      {label && <span className="radio-label radiolabel">{label}</span>}
      <div className={clsx("radio-container", column ? "column" : undefined)}>
        {options.map((it) => (
          <span key={it.value} className="radio-name radioname">
            <input
              className="radio-input"
              type="radio"
              name={name}
              value={it.value}
              checked={fieldValue === it.value}
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
export default Radio;
