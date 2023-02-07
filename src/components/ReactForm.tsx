import React from "react";
import { Formik, FormikValues } from "formik";
import MLFormBuilder from "../components/Formbuilder";
export * from "../components/Formbuilder";
export interface ReactFormProps extends FormikValues {
  //   config: Array<RowSchema>;
  formId?: string;
  isInProgress?: boolean;
  isReadOnly?: boolean;
}
export const ReactForm: React.FC<ReactFormProps> = (props) => {
  const {
    config,
    formId = "1",
    initialValues = {},
    onSubmit,
    actionConfig,
    formSettings,
    isInProgress = false,
    isReadOnly = false,
    ...formikProps
  } = props;
  return (
    <div>
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
  );
};
export default ReactForm;
