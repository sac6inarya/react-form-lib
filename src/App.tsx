import React from "react";
import "./App.scss";
import { Option } from "./Types/index";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

// import { ReactForm } from "react-forms";
import Radio, { RadioFieldProps } from "./components/Radio/index";
import CheckBox, { CheckboxFieldProps } from "./components/Checkbox";
import Switch, { SwitchFieldProps } from "./components/Switch";
import SelectField, { SelectFProps } from "./components/Selectfield";
import FileInput, { FileInputField } from "./components/Fileinput";

const genderoptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const bookoptions: Option[] = [
  { value: "book1", label: "Book1" },
  { value: "book2", label: "Book2" },
  { value: "book3", label: "Book3" },
];
const languageoptions: Option[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "french", label: "French" },
];

const CheckBoxFP: CheckboxFieldProps = {
  name: "books",
  options: bookoptions,
  header: "Select books",
  helperText: "Select one or more option",
  column: false,
};
const RadioFP: RadioFieldProps = {
  name: "gender",
  options: genderoptions,
  header: "Select gender",
  helperText: "Select any one option",
  column: true,
};
const SelectFP: SelectFProps = {
  name: "language",
  options: languageoptions,
  header: "Select Gender",
  emptyItem: "Select something",
  helperText: "Select any one option",
};

const FileInputFP: FileInputField = {
  name: "file",
  header: "Select",
  helperText: "Select any files",
  multiple: true,
};

const SwitchFP: SwitchFieldProps = {
  name: "switch",
  header: "Toggle",
  helperText: "Click for toggle",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formikProps = {} as FormikProps<any>;

console.log(formikProps);

const componentConfigMap: { [key: string]: JSX.Element } = {
  radio: <Radio formikProps={formikProps} fieldProps={RadioFP} />,
  checkbox: <CheckBox formikProps={formikProps} fieldProps={CheckBoxFP} />,
  switch: <Switch formikProps={formikProps} fieldProps={SwitchFP} />,
  select: <SelectField fieldProps={SelectFP} formikProps={formikProps} />,
  fileinput: <FileInput formikProps={formikProps} fieldProps={FileInputFP} />,
};

const config = [
  {
    type: "radio",
    fieldProps: RadioFP,
    valueKey: "gender",
  },
  {
    type: "checkbox",
    fieldProps: CheckBoxFP,
    valueKey: "books",
  },
  {
    type: "switch",
    fieldProps: SwitchFP,
    valueKey: "toggle",
  },
  {
    type: "select",
    fieldProps: SelectFP,
    valueKey: "languages",
  },
  {
    type: "fileinput",
    fieldProps: FileInputFP,
    valueKey: "files",
  },
];

function App() {
  const validationSchema = Yup.object({
    gender: Yup.string().required("Required"),
    books: Yup.array().min(1, "Required").required("Required"),
    language: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),
    // switch: Yup.string().required("Required"),
  });

  const initialValues = {};
  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formikProps) => {
          return (
            <form onSubmit={formikProps.handleSubmit}>
              {config.map((it) => {
                return (
                  <div key={it.valueKey}>
                    {React.cloneElement(componentConfigMap[it.type], {
                      formikProps,
                      fieldProps: it.fieldProps,
                    })}
                  </div>
                );
              })}
              {/* <CheckBox formikProps={formikProps} fieldProps={CheckBoxFP} />
              <Radio formikProps={formikProps} fieldProps={RadioFP} />
              <Switch formikProps={formikProps} fieldProps={SwitchFP} />
              <SelectField fieldProps={SelectFP} formikProps={formikProps} />
              <FileInput formikProps={formikProps} fieldProps={FileInputFP} /> */}
              <button type="submit" className="">
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
