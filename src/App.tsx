import React from "react";
import "./App.css";

import { Formik } from "formik";
import * as Yup from "yup";

import SelectField, { SelectFProps } from "./components/Selectfield";
import { Option } from "./Types";

const options: Option[] = [
  // { value: "", label: "Select something" },
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
];

const selectFieldProps: SelectFProps = {
  name: "select",
  label: "Select",
  options: options,
  helperText: "Select any option",
  emptyItem: "Select something",
};

function App() {
  const validationSchema = Yup.object({
    select: Yup.string().required("Required"),
  });

  const initialValues = {
    name: "",
    label: "",
  };
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
              <SelectField
                fieldProps={selectFieldProps}
                formikProps={formikProps}
              />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
