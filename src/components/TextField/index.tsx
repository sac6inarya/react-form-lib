import { get } from "lodash";
import React from "react";
import "./styles.scss";
import clsx from "clsx";
import { FieldProps } from "../../Types";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";

export interface TextFieldProps {
  header?: string;
  name?: string;
  helperText?: string;
  type?: number | string;
  width?: string;
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
  const { header, helperText, name = "", width, type } = fieldProps;
  const fieldValue = get(formikProps, `values.${name}`) as string;
  const fieldError = getFieldError(name || "", formikProps);

  return (
    <div className={clsx("text-field", name)}>
      {header && <label className="text-header textheader">{header}</label>}
      <div className="text-field-box">
        <input
          className={clsx("input-box inputbox", width)}
          type="text"
          placeholder={`${header}`}
          name={name}
          value={fieldValue || ""}
          onBlur={formikProps.handleBlur}
          onChange={formikProps.handleChange}
        />
      </div>
      {console.log(formikProps)}
      {(fieldError || helperText) && (
        <div className="label-error">
          {fieldError ? (
            <span className="text-error error">{fieldError}</span>
          ) : (
            <span className="text-helper helpertext">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextField;
