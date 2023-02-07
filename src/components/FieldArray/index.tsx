import React from "react";
import { get } from "lodash";
import "./styles.scss";
import { FieldArray, FieldArrayRenderProps, FormikValues } from "formik";
import { FieldProps, getComponentConfig } from "../Formbuilder/index";

export interface FieldArrayProps {
  name: string;
  header: string;
  itemType: string;
  helperText?: string;
  id?: string;
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
    header,
    name,
    itemType,
    addButton,
    removeButton,
    onAddButtonClick,
    onRemoveButtonClick,
    arrayItemFieldProps = {},
    defaultItemValue = "",
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
    <div className="array-field">
      {header && <label className="fieldarray-header">{header}</label>}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>
            {(values || []).map((value: any, index: number) => (
              <div
                key={`${fieldProps.name}-${index}`}
                className="fieldarray-box"
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
                    className="array-remove-icon"
                    onClick={() => handleElementRemove(arrayHelpers, index)}
                  >
                    ➖{/* - */}
                  </button>
                )}
              </div>
            ))}
            {addButton ? (
              addButton
            ) : (
              <button
                type="button"
                className="array-add-icon"
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
