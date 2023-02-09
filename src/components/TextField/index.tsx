import { get } from "lodash";
import React from "react";
import "./styles.scss";
import clsx from "clsx";
import { FieldItemProps, FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";
import TextHelperError from "../TextHelperError";

export interface TextFieldProps extends FieldItemProps {
  type?: string;
  width?: string;
  placeholder?: string;
}

interface TextFieldsProps extends FieldProps {
  fieldProps?: TextFieldProps;
}

const TextField: React.FC<TextFieldsProps> = (props) => {
  const {
    fieldProps = {} as TextFieldProps,
    formikProps = {} as FormikValues,
  } = props;
  console.log(fieldProps);
  const {
    label,
    helperText,
    name = "",
    width,
    type = "",
    classNames,
    placeholder,
  } = fieldProps;
  const fieldValue = get(formikProps, `values.${name}`) as string;
  const fieldError = getFieldError(name || "", formikProps);

  return (
    <div className={clsx("text-field", classNames)}>
      {label && <label className="text-label textlabel">{label}</label>}
      <div className={clsx("text-field-box textfieldbox")}>
        <input
          className={clsx("input-box inputbox", width)}
          type={type}
          placeholder={`${placeholder || ""}`}
          name={name}
          value={fieldValue || ""}
          onBlur={formikProps.handleBlur}
          onChange={formikProps.handleChange}
        />
      </div>

      <TextHelperError fieldError={fieldError} helperText={helperText} />
    </div>
  );
};

export default TextField;
