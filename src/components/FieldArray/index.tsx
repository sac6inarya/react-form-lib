import React from "react";
import { get } from "lodash";
import "./styles.scss";
import { FieldArray, FieldArrayRenderProps, FormikValues } from "formik";
import { FieldProps, getComponentConfig } from "../FormBuilder/index";
import clsx from "clsx";
import { FieldItemProps } from "../../Types";

export interface FieldArrayProps extends FieldItemProps {
  itemType: string;
  addButtonText?: string;
  addButton?: JSX.Element;
  removeButton?: JSX.Element;
  onAddButtonClick?: () => Promise<any | undefined>;
  onRemoveButtonClick?: (index: number) => Promise<boolean>;
  arrayItemFieldProps?: object;
  defaultItemValue?: any;
}

interface FieldsArrayprops extends FieldProps {
  fieldProps?: FieldArrayProps;
}

const ArrayField: React.FC<FieldsArrayprops> = (props) => {
  const {
    fieldProps = {} as FieldArrayProps,
    formikProps = {} as FormikValues,
  } = props;

  const {
    addButtonText = "Add",
    label,
    name = "",
    itemType,
    addButton,
    removeButton,
    onAddButtonClick,
    onRemoveButtonClick,
    arrayItemFieldProps = {},
    defaultItemValue = "",
    classNames,
    width,
  } = fieldProps;

  const values = get(formikProps, `values.${name}`);

  const itemComponentConfig = getComponentConfig(itemType);

  const handleElementAdd = async (arrayHelpers: FieldArrayRenderProps) => {
    if (!onAddButtonClick) {
      arrayHelpers.push(defaultItemValue);
      return;
    }
    const res = await onAddButtonClick();
    if (res) {
      arrayHelpers.push(res ?? {});
    }
  };

  const handleElementRemove = async (
    arrayHelpers: FieldArrayRenderProps,
    index: number
  ) => {
    if (!onRemoveButtonClick) {
      arrayHelpers.remove(index);
      return;
    }
    const isRemoved = await onRemoveButtonClick(index);
    if (isRemoved) arrayHelpers.remove(index);
  };

  return (
    <div className={clsx("array-field", classNames)}>
      {label && (
        <label className="fieldarray-label fieldarraylabel">{label}</label>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>
            {(values || []).map((value: any, index: number) => (
              <div
                key={`${fieldProps.name}-${index}`}
                className="fieldarray-box fieldarraybox"
              >
                {React.cloneElement(itemComponentConfig.component, {
                  itemIndex: index,
                  arrayHelpers,
                  formikProps,
                  fieldProps: {
                    ...arrayItemFieldProps,
                    name: `${name}[${index}]`,
                  },
                  ...itemComponentConfig.props,
                })}
                {removeButton ? (
                  removeButton
                ) : (
                  <button
                    className="array-remove-icon arrayremoveicon"
                    onClick={() => handleElementRemove(arrayHelpers, index)}
                  >
                    {/* - */}
                    {<p style={{ fontSize: "8px" }}>❌</p>}
                  </button>
                )}
              </div>
            ))}
            {addButton ? (
              addButton
            ) : (
              <button
                type="button"
                className="array-add-icon arrayaddicon"
                onClick={() => handleElementAdd(arrayHelpers)}
              >
                {addButtonText}
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ArrayField;
