import React from "react";
import {
  getFieldError,
  processFilesWithCallback,
  ReadAsType,
  setValue,
} from "../../Utils";
import { FieldItemProps, FieldProps } from "../../Types";
import "./index.scss";
import { FormikValues } from "formik";
import clsx from "clsx";
import TextHelperError from "../TextHelperError";

export interface TFile {
  name: string;
  type: string;
  size: string | number;
  base64?: string | ArrayBuffer | null;
  file: File;
}

export interface FileInputField extends FieldItemProps {
  readAs?: ReadAsType;
  encoding?: string;
  multiple?: boolean;
  accept?: string;
  disableDefaultTooltip?: boolean;
  invisible?: boolean;
  onFilesChange?: (files: FileList) => void;
  onDone?: (imgFiles: TFile[], remFiles?: File[]) => void;
  wrapWith?: (input: JSX.Element) => JSX.Element;
  /* Function passed to wrapWith should take the input Element and return the same within the wrapped element.
	  The input element is always invisible if wrapWith is provided */
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
    name = "",
    onDone,
    multiple,
    disableDefaultTooltip,
    accept,
    readAs,
    disabled,
    onFilesChange,
    nativeInputProps,
    encoding = "utf-8",
    label,
    helperText,
    classNames,
    width,
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
    <div className={clsx("file-input-field", classNames)}>
      {label && (
        <label htmlFor={name} className="file-input-label fileinputlabel">
          {label}
        </label>
      )}

      <input
        className={clsx("file-input-box", width)}
        type="file"
        onChange={handleChange}
        id={name}
        disabled={disabled}
        multiple={multiple}
        title={disableDefaultTooltip ? " " : undefined}
        accept={accept}
        {...nativeInputProps}
      ></input>

      <TextHelperError fieldError={fieldError} helperText={helperText} />
    </div>
  );
};
export default FileInput;
