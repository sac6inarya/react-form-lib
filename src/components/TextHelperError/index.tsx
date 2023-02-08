import clsx from "clsx";
import React from "react";
import "./index.scss";

export interface TextHelperErrorProps {
  fieldError?: string;
  helperText?: string;
  classNames?: string | Array<string>;
}
const TextHelperError: React.FC<TextHelperErrorProps> = (props) => {
  const { fieldError, helperText, classNames } = props;
  return (
    <div className={clsx("text-error-helper-field", classNames)}>
      {(fieldError || helperText) && (
        <div className="label-error">
          {fieldError ? (
            <span className="error-text error">{fieldError}</span>
          ) : (
            <span className="helper-text helpertext">{helperText} </span>
          )}
        </div>
      )}
    </div>
  );
};
export default TextHelperError;
