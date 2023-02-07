import React, { useEffect, useState } from "react";
import { FieldProps } from "../../Types";
import "./styles.scss";
import { CountryCodeFormat, COUNTRY_LIST } from "../Constants/CountryList";
import { get } from "lodash";
import { getFieldError } from "../../Utils";
import { FormikValues } from "formik";

export interface PhoneFieldProps {
  header?: string;
  helperText?: string;
  name?: string;
  countryCodeLabel?: string;
  phoneLabel?: string;
  emptyItem?: string | boolean;
  emptyItemText?: string;
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
    header,
    name,
    helperText,
    emptyItem,
    emptyItemText,
    countryCodeLabel,
    renderOption = handleRenderOption,
  } = fieldProps;

  const value = (get(formikProps, `values.${name}`) || "") as string;

  useEffect(() => {
    if (value) {
      setCode(value.split("-")[0] || "");
    }
  }, [name]);

  const newError = getFieldError(name || "", formikProps);
  const error = !!newError;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (formikProps && formikProps.handleBlur) formikProps?.handleBlur(e);
  };

  // console.log(formikProps);

  return (
    <div className="phone-field">
      <label className="phonefield-header" id={name}>
        {countryCodeLabel || "Country code"}
      </label>
      <div className="phonefield-container">
        <div>
          <select
            className="phonefield-select"
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
          className="phonefield-input"
          placeholder={`${header}`}
          name={name}
          // onBlur={handleBlur}
          onBlur={formikProps.handleBlur}
          autoComplete="nope"
          value={value.split("-")[1] || ""}
          onChange={onChange}
        />
      </div>
      {/* {error && <label className="phonefield-error error">{newError}</label>} */}

      {(error || helperText) && (
        <div className="label-error">
          {error ? (
            <span className="phonefield-error error">{newError}</span>
          ) : (
            <span className="phonefield-helper helpertext">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneField;
