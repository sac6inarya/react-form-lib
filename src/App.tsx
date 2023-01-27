import "./App.css";
import { Formik } from "formik";
import Switch, { SwitchFieldProps } from "./components/Switch";

const onOrOff: SwitchFieldProps = {
  name: "switchValue",
  label: "Switch",
  helperText: "Off On",
};

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formikProps) => {
          return (
            <form>
              <Switch formikProps={formikProps} fieldProps={onOrOff} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
