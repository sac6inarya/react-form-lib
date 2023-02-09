import React, { useEffect, useState } from "react";
import { FieldItemProps, FieldProps } from "../../Types";
import "./styles.scss";
import { CountryCodeFormat, COUNTRY_LIST } from "../Constants/CountryList";
import { get } from "lodash";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";
import clsx from "clsx";
import TextHelperError from "../TextHelperError";

export interface PhoneFieldProps extends FieldItemProps {
  countryCodeLabel?: string;
  phoneLabel?: string;
  emptyItem?: string | boolean;
  emptyItemText?: string;
  placeholder?: string;
  renderOption?: (country: CountryCodeFormat, index?: number) => JSX.Element;
}

export interface PhoneFieldsProps extends FieldProps {
  fieldProps?: PhoneFieldProps;
}

const PhoneField: React.FC<PhoneFieldsProps> = (props) => {
  const {
    fieldProps = {} as PhoneFieldProps,
    formikProps = {} as FormikValues,
  } = props;
  const [code, setCode] = useState<string>("");

  const handleRenderOption = (country: CountryCodeFormat, index: number) => {
    if (!country.dial_code) return null;
    return (
      <option key={index} value={country.dial_code}>
        {`${country.name} (${country.dial_code})`}
      </option>
    );
  };

  const {
    label,
    name = "",
    helperText,
    emptyItem,
    emptyItemText,
    countryCodeLabel,
    classNames,
    width,
    placeholder,
    renderOption = handleRenderOption,
  } = fieldProps;

  const value = (get(formikProps, `values.${name}`) || "") as string;

  useEffect(() => {
    if (value) {
      setCode(value.split("-")[0] || "");
    }
  }, [name]);

  const fieldError = getFieldError(name, formikProps);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const number = event.target.value.replace("-", "");
    formikProps.setFieldValue(`${name}`, `${code}-${number}`);
  };

  const codeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const number = value.split("-");
    formikProps.setFieldValue(
      `${name}`,
      `${e.target.value as string}-${number[1] || ""}`
    );
    setCode(e.target.value as string);
  };

  return (
    <div className={clsx("phone-field", classNames)}>
      <label className="phonefield-label phonefieldlabel" id={name}>
        {countryCodeLabel || "Country code"}
      </label>

      <div className="phonefield-container phonefieldcontainer">
        <div className="phone-field-box phonefieldbox">
          <select
            className="phonefield-select phonefieldselect"
            id={name}
            value={code}
            onChange={codeChange}
          >
            {emptyItem && <option value="">{emptyItemText}</option>}
            {(COUNTRY_LIST as unknown as CountryCodeFormat[]).map(renderOption)}
          </select>
        </div>
        <input
          type="tel"
          className={clsx("phonefield-input phonefieldinput", width)}
          placeholder={`${placeholder || ""}`}
          name={name}
          onBlur={formikProps.handleBlur}
          autoComplete="nope"
          value={value.split("-")[1] || ""}
          onChange={onChange}
        />
      </div>

      <TextHelperError fieldError={fieldError} helperText={helperText} />
    </div>
  );
};

export default PhoneField;
