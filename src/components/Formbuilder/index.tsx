import clsx from "clsx";
import { FormikProps } from "formik";
import { get, isArray, isFunction, map, uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import CheckBox from "../CheckBox";
import Radio from "../Radio";
import SelectField from "../SelectField";
import Switch from "../Switch";
import FileInput from "../FileInput";
import PhoneField from "../PhoneField";
import ArrayField from "../FieldArray";
import TextField from "../TextField";
import { FieldItemProps } from "../../Types";
import "./index.scss";

import {
  getConditionalProps,
  TFieldConditions,
} from "../ConditionalOperations";
export interface ReadOnlyProps {
  renderer: (props: FieldProps) => React.ReactNode;
}
export interface FormConfig extends FieldItemProps {
  type: string;
  valueKey: string;
  flex?: number | string;
  fieldProps?: object;
  styles?: object;
  condition?: TFieldConditions;
  readOnlyProps?: ReadOnlyProps;
}

interface RowSettingsProps {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  columnHorizontalPadding?: number;
}
export interface BuilderSettingsProps extends RowSettingsProps {
  isReadOnly?: boolean;
}

export type RowSchema =
  | Array<FormConfig>
  | FormConfig
  | { columns: Array<FormConfig>; settings?: RowSettingsProps };
export interface FormRowProps<T = any> {
  schema: RowSchema;
  rowId: string;
  formikProps?: FormikProps<T>;
  settings?: BuilderSettingsProps;
}

type submitButtonLayout = "right" | "center" | "fullWidth";
export interface FormActionProps {
  submitButtonText?: string;
  submitButtonLayout?: submitButtonLayout;
  actionContent?: JSX.Element;
  containerClassNames?: string | string[];
  displayActions?: boolean;
}
export interface BuilderProps<T = any> {
  schema: Array<RowSchema>;
  formId: string;
  formikProps?: FormikProps<T>;
  actionConfig?: FormActionProps;
  settings?: BuilderSettingsProps;
  isInProgress?: boolean;
}

export interface FieldProps<T = any> {
  formikProps?: FormikProps<T>;
  fieldConfig?: FormConfig;
  isReadOnly?: boolean;
}

const ComponentMapConfig: {
  [key: string]: { component: JSX.Element; props?: object };
} = {};

export const getComponentConfig = (type: string) => {
  return ComponentMapConfig[type];
};

export const attachField = (
  type: Array<string> | string,
  component: JSX.Element,
  props?: object
) => {
  if (isArray(type)) {
    map(type, (item) => (ComponentMapConfig[item] = { component, props }));
  } else ComponentMapConfig[type] = { component, props };
};
export const setDefaultProps = (
  type: Array<string> | string,
  props: object
) => {
  if (isArray(type)) {
    map(
      type,
      (item) =>
        (ComponentMapConfig[item].props = {
          ...ComponentMapConfig[item].props,
          ...props,
        })
    );
  } else if (ComponentMapConfig[type])
    ComponentMapConfig[type].props = {
      ...ComponentMapConfig[type]?.props,
      ...props,
    };
};

attachField("select", <SelectField />, { type: "select" });
attachField("checkbox", <CheckBox />);
attachField("switch", <Switch />);
attachField("radio", <Radio />);
attachField("file", <FileInput />);
attachField("phone", <PhoneField />);
attachField("array", <ArrayField />);
attachField("password", <TextField />, { type: "password" });
attachField("text", <TextField />, { type: "text" });

export const BuildFormRow: React.FC<FormRowProps> = (props) => {
  const {
    schema,
    rowId,
    formikProps = {} as FormikProps<any>,
    settings = {
      horizontalSpacing: 10,
      verticalSpacing: 10,
      columnHorizontalPadding: 0,
      isReadOnly: false,
    },
  } = props;
  //need modification in type of columnItems
  const columnItems = get(schema, "columns") as unknown as Array<FormConfig>;
  const rowSettings = {
    ...settings,
  } as RowSettingsProps;
  const colItems = isArray(schema)
    ? schema
    : isArray(columnItems)
    ? columnItems
    : [schema];

  const rowStyle = { marginBottom: rowSettings.verticalSpacing || 10 };
  return (
    <div className="row" style={rowStyle}>
      {map(colItems, (item: FormConfig, index: number) => {
        const componentConfig = ComponentMapConfig[item.type];
        const horizontalSpacing =
          index === colItems.length - 1
            ? 0
            : rowSettings.horizontalSpacing || 10;
        if (!componentConfig) return <div key={`${rowId}_field_${index}`} />;

        const conditionalProps = getConditionalProps(item, formikProps);
        const fieldProps = {
          id: item.id,
          name: item.name || item.valueKey,
          ...componentConfig.props,
          ...item.fieldProps,
          ...conditionalProps.finalProps,
        };
        const Component = componentConfig.component;

        if (conditionalProps.hidden === true)
          return <div key={`${rowId}_field_${index}`} />;
        return (
          <div
            key={`${rowId}_field_${index}`}
            className={clsx(item.classNames, "column")}
            style={{
              flex: item.flex || 1,
              marginRight: horizontalSpacing,
              paddingLeft: rowSettings.columnHorizontalPadding,
              paddingRight: rowSettings.columnHorizontalPadding,
              maxWidth: "100%",
              ...item.styles,
            }}
          >
            {settings.isReadOnly &&
            item.readOnlyProps &&
            isFunction(item.readOnlyProps.renderer)
              ? item.readOnlyProps.renderer({
                  formikProps,
                  fieldConfig: item,
                  isReadOnly: settings.isReadOnly,
                })
              : React.cloneElement(Component, {
                  fieldProps,
                  formikProps,
                  fieldConfig: item,
                  isReadOnly: settings.isReadOnly,
                })}
          </div>
        );
      })}
    </div>
  );
};

const getUpdateSchema = (schema: Array<RowSchema>, formId: string) => {
  return map(schema, (schemaItem) => {
    if (isArray(schemaItem)) {
      return map(schemaItem, (item) => ({
        ...item,
        id: `${formId}_${uniqueId()}`,
      }));
    }
    return { ...schemaItem, id: `${formId}_${uniqueId()}` };
  });
};

export const MLFormContent: React.FC<BuilderProps> = (props) => {
  const { schema, formId, formikProps, settings } = props;
  const [formSchema, setFormSchema] = useState<Array<RowSchema>>(schema);
  useEffect(() => {
    setFormSchema(getUpdateSchema(schema, formId));
  }, [schema]);
  return (
    <>
      {map(formSchema, (configRow, index) => {
        const rowId = `${formId}_row_${index}`;
        return (
          <BuildFormRow
            key={rowId}
            rowId={rowId}
            schema={configRow}
            formikProps={formikProps}
            settings={settings}
          />
        );
      })}
    </>
  );
};

export const MLFormAction: React.FC<
  FormActionProps & Pick<BuilderProps, "formId" | "formikProps">
> = (props) => {
  const {
    formId,
    formikProps = {} as FormikProps<any>,
    containerClassNames,
    submitButtonLayout = "center",
    submitButtonText = "Submit",
  } = props;

  if (props.actionContent)
    return React.cloneElement(props.actionContent || <div />, { formikProps });
  const layoutClassName = `action-${submitButtonLayout}`;

  return (
    <div
      className={clsx("actionContainer", layoutClassName, containerClassNames)}
    >
      {props.actionContent ? (
        React.cloneElement(props.actionContent || <div />, {
          formikProps,
          formId,
        })
      ) : (
        <div>
          {formikProps.isSubmitting ? (
            <div className="loader"></div>
          ) : (
            <button
              className={clsx(
                "submit-btn",
                layoutClassName === "action-fullWidth"
                  ? "action-fullWidth"
                  : "right" || "center"
              )}
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              {submitButtonText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const MLFormBuilder: React.FC<BuilderProps> = (props) => {
  const {
    formikProps = {} as FormikProps<any>,
    isInProgress = false,
    actionConfig = {} as FormActionProps,
  } = props;

  useEffect(() => {
    if (isInProgress === false) formikProps.setSubmitting(false);
  }, [isInProgress]);

  return (
    <form onSubmit={formikProps.handleSubmit}>
      <MLFormContent {...props} />
      {actionConfig.displayActions !== false && (
        <MLFormAction
          formId={props.formId}
          formikProps={formikProps}
          {...actionConfig}
        />
      )}
    </form>
  );
};
export default MLFormBuilder;
