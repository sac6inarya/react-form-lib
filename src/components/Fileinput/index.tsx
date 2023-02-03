import React from "react";
import {
  getFieldError,
  processFilesWithCallback,
  ReadAsType,
  setValue,
} from "../../Utils";
import { FieldProps } from "../../Types";
import "./index.scss";
import { FormikValues } from "formik";

export interface TFile {
  name: string;
  type: string;
  size: string | number;
  base64?: string | ArrayBuffer | null;
  file: File;
}

export interface FileInputField {
  name: string;
  header?: string;
  helperText?: string;
  readAs?: ReadAsType;
  encoding?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  disableDefaultTooltip?: boolean;
  invisible?: boolean;
  onFilesChange?: (files: FileList) => void;
  onDone?: (imgFiles: TFile[], remFiles?: File[]) => void;
  wrapWith?: (input: JSX.Element) => JSX.Element;
  /* Function passed to wrapWith should take the input Element and return the same within the wrapped element.
	  The input element is always invisible if wrapWith is provided */
  // eslint-disable-next-line @typescript-eslint/ban-types
  nativeInputProps?: React.InputHTMLAttributes<{}>;
  inputClasses?: string | string[];
}
interface FileInputProps extends FieldProps {
  fieldProps?: FileInputField;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const {
    formikProps = {} as FormikValues,
    fieldProps = {} as FileInputField,
  } = props;
  const {
    name,
    onDone,
    multiple,
    disableDefaultTooltip,
    accept,
    readAs,
    disabled,
    onFilesChange,
    nativeInputProps,
    encoding = "utf-8",
    header,
    helperText,
  } = fieldProps;

  const fieldError = getFieldError(name, formikProps);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || new FileList();
    if (onFilesChange) {
      onFilesChange(files);
      setValue(files, formikProps, fieldProps);
    }
    processFilesWithCallback(
      files,
      (prop: { imgs: TFile[]; rem: any[] }) => {
        const { imgs, rem } = prop;
        onDone?.(imgs, rem);
        const files = ([] as TFile[]).concat(imgs || []).concat(rem || []);
        setValue(files, formikProps, fieldProps);
      },
      readAs,
      encoding
    );
  };

  return (
    <div className="file-input-field">
      <label htmlFor={name} className="file-input-header">
        {header}
      </label>

      <input
        className="file-input-input"
        type="file"
        onChange={handleChange}
        id={name}
        disabled={disabled}
        multiple={multiple}
        title={disableDefaultTooltip ? " " : undefined}
        accept={accept}
        {...nativeInputProps}
      ></input>

      {(fieldError || helperText) && (
        <span>
          {fieldError ? (
            <span className="file-input-error error">{fieldError}</span>
          ) : (
            <span className="helper-text helpertext">{helperText}</span>
          )}
        </span>
      )}
    </div>
  );
};
export default FileInput;
