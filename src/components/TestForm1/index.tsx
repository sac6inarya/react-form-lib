import { Formik, FormikValues } from "formik";
import React from "react";
import "./index.scss";
import MLFormBuilder from "../FormBuilder";
export * from "../FormBuilder";
export interface TestFormProps extends FormikValues {
  formId?: string;
  isInProgress?: boolean;
  isReadOnly?: boolean;
}
const TestForm: React.FC<TestFormProps> = (props) => {
  const {
    config,
    formId = "1",
    initialValues = {},
    onSubmit,
    actionConfig,
    formSettings,
    isInProgress = true,
    isReadOnly = false,
    ...formikProps
  } = props;
  return (
    <div className="test-form-field">
      <div className="test-form-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          {...formikProps}
        >
          {(formikProp) => {
            return (
              <MLFormBuilder
                schema={config}
                formId={formId}
                actionConfig={actionConfig}
                settings={{ ...formSettings, isReadOnly }}
                formikProps={formikProp}
                isInProgress={isInProgress}
              />
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default TestForm;
