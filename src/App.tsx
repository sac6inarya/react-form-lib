import "./App.css";
import CheckBox, { FieldProps } from "./components/Checkbox/index";
import { Option } from "./components/Checkbox/index";
import { Formik } from "formik";
import * as Yup from "yup";

const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const genderFieldProps: FieldProps = {
  name: "gender",
  options: genderOptions,
  header: "Select Gender",
  helperText: "Choose one or more options",
};

const placedOptions: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const placedFieldProps: FieldProps = {
  name: "placed",
  options: placedOptions,
  header: "Placed?",
  helperText: "Choose at least one options",
  column: true,
};

function App() {
  const validationSchema = Yup.object({
    gender: Yup.array()
      .min(1, "At least one option is required")
      .of(Yup.string()),
    placed: Yup.array()
      .min(1, "At least one option is required")
      .of(Yup.string()),
  });

  return (
    <div className="App">
      <Formik
        initialValues={{
          gender: ["male"],
          placed: ["yes"],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formikProps) => {
          return (
            <form onSubmit={formikProps.handleSubmit} className="checkbox-form">
              <CheckBox
                formikProps={formikProps}
                fieldProps={genderFieldProps}
              />
              <CheckBox
                formikProps={formikProps}
                fieldProps={placedFieldProps}
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
