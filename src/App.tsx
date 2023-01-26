import "./App.css";
import Radio, { RadioFieldProps } from "./components/Radio/index";
import { Option } from "./components/Radio/index";
import { Formik } from "formik";
import * as Yup from "yup";
// import { ReactForm } from "react-forms";

const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const genderFieldProps: RadioFieldProps = {
  name: "gender",
  options: genderOptions,
  header: "Select Gender",
  helperText: "Select any one option",
  column: true,
};

const placedOptions: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const placedFieldProps: RadioFieldProps = {
  name: "placed",
  options: placedOptions,
  header: "Placed?",
  helperText: "Select any one option",
};

function App() {
  const validationSchema = Yup.object({
    gender: Yup.string().required("Required"),
    placed: Yup.string().required("Required"),
  });

  const initialValues = {
    gender: "",
    placed: "",
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
            <form onSubmit={formikProps.handleSubmit} className="radio-form">
              <Radio formikProps={formikProps} fieldProps={genderFieldProps} />
              <Radio formikProps={formikProps} fieldProps={placedFieldProps} />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
