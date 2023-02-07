import React, { useState } from "react";
import "./App.scss";
import { Option } from "./Types/index";
import * as Yup from "yup";

import { RadioFieldProps } from "./components/Radio/index";
import { CheckboxFieldProps } from "./components/Checkbox";
import { SwitchFieldProps } from "./components/Switch";
import { SelectFProps } from "./components/Selectfield";
import { FileInputField } from "./components/Fileinput";

// import ReactForm from "./components/ReactForm";
import TestForm from "./components/TestForm";

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

const config = [
  [
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
  ],
  {
    type: "select",
    fieldProps: SelectFP,
    valueKey: "languages",
  },
  {
    type: "file",
    fieldProps: FileInputFP,
    valueKey: "files",
  },

  {
    type: "text",
    valueKey: "name",
    fieldProps: {
      header: "Enter your Name",
      helperText: "Enter your text",
      width: "full",
      fullWidth: true,
    },
  },

  {
    type: "password",
    valueKey: "Password",
    fieldProps: {
      header: "Password",
      helperText: "Enter your password",
    },
  },

  {
    type: "password",
    valueKey: "confirmPass",
    fieldProps: {
      header: "Confirm password",
      helperText: "Confirm your password",
    },
  },
  {
    type: "phone",
    valueKey: "phoneNo",
    fieldProps: {
      header: "phone No. ",
      helperText: "Enter your phone no.",
    },
  },
  {
    type: "array",
    valueKey: "array",
    fieldProps: {
      itemType: "text",
      defaultItemValue: "",
      arrayItemFieldProps: {
        header: "Header text",
      },
    },
  },
];

function App() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    gender: Yup.string().required("Required"),
    books: Yup.array().min(1, "Required").required("Required"),
    language: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),

    name: Yup.string().required("Text Required"),
    Password: Yup.string()
      .min(5, "Password must be 5 characters long")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Password Required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("Password"), null], ' "Password" did not match ')
      .required("Required"),
    phoneNo: Yup.string().required("Phone number is required"),
    array: Yup.array().of(
      Yup.string().required("At least one string is required")
    ),
  });

  const initialValues = {};
  return (
    <div className="App">
      <TestForm
        config={config}
        initialValues={initialValues}
        isInProgress={loading}
        validationSchema={validationSchema}
        onSubmit={(values: object) => {
          setLoading(true);
          console.log(values);
          setTimeout(() => setLoading(false), 2000);
        }}
      />
    </div>
  );
}

export default App;
