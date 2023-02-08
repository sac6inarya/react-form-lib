import React, { useState } from "react";
import "./App.scss";
import { Option } from "./Types/index";
import * as Yup from "yup";
import { RadioFieldProps } from "./components/Radio/index";
import { CheckboxFieldProps } from "./components/CheckBox";
import TestForm from "./components/TestForm";

const rangeoptions: Option[] = [
  { value: "$", ilabel: "$" },
  { value: "$$", ilabel: "$$" },
  { value: "$$$", ilabel: "$$$" },
  { value: "$$$$", ilabel: "$$$$" },
];
const placetypeoptions: Option[] = [
  { value: "Distillery", ilabel: "Distillery" },
  { value: "Brewery", ilabel: "Brewery" },
  { value: "Restaurant", ilabel: "Restaurant" },
  { value: "Bar", ilabel: "Bar" },
  { value: "Cafe", ilabel: "Cafe" },
  { value: "Cooking School", ilabel: "Cooking School" },
  { value: "Food Hall", ilabel: "Food Hall" },
  { value: "Bakery", ilabel: "Bakery" },
  { value: "Food Truck", ilabel: "Food Truck" },
];

const CheckBoxFP: CheckboxFieldProps = {
  options: placetypeoptions,
  label: "Place Type",
  column: true,
  name: "",
  id: "",
};
const RadioFP: RadioFieldProps = {
  name: "range",
  options: rangeoptions,
  label: "$ Range",
  column: true,
  id: "",
};

const config = [
  [
    {
      type: "text",
      valueKey: "place",
      fieldProps: {
        label: "Name of the Place",
        width: "placewidth",
      },
    },
  ],

  [
    {
      type: "text",
      valueKey: "contact",
      fieldProps: {
        label: "Contact Number",
        width: "contactwidth",
      },
    },
    {
      type: "text",
      valueKey: "rlink",
      fieldProps: {
        label: "Reservation Link",
        width: "rlinkwidth",
      },
    },
  ],
  [
    {
      type: "text",
      valueKey: "t&d",
      fieldProps: {
        label: "Takeout & Delivery",
        width: "tanddwidth",
      },
    },
    // {
    //   type: "password",
    //   valueKey: "pass",
    //   fieldProps: {
    //     label: "password",
    //     width: "tanddwidth",
    //   },
    // },
    {
      type: "text",
      valueKey: "website",
      fieldProps: {
        label: "Website",
        width: "websitewidth",
      },
    },
  ],
  [
    {
      type: "text",
      valueKey: "email",
      fieldProps: {
        label: "Email",
        width: "emailwidth",
      },
    },
    {
      type: "text",
      valueKey: "iglink",
      fieldProps: {
        label: "Instagram Link",
        width: "iglinkwidth",
      },
    },
  ],
  {
    type: "text",
    valueKey: "sdis",
    fieldProps: {
      label: "Short Discription",
      width: "sdiswidth",
    },
  },
  {
    type: "text",
    valueKey: "dis",
    fieldProps: {
      label: "Discription",
      width: "diswidth",
    },
  },
  [
    {
      type: "checkbox",
      fieldProps: CheckBoxFP,
      valueKey: "placetype",
    },
    {
      type: "radio",
      fieldProps: RadioFP,
      valueKey: "range",
    },
  ],
];

function App() {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    range: Yup.string().required("Required"),
    placetype: Yup.array().min(1, "Required").required("Required"),
    language: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),
    name: Yup.string().required("Text Required"),
    // Password: Yup.string()
    //   .min(5, "Password must be 5 characters long")
    //   .matches(/[a-z]/, "Password requires a lowercase letter")
    //   .matches(/[A-Z]/, "Password requires an uppercase letter")
    //   .matches(/[0-9]/, "Password requires a number")
    //   .matches(/[^\w]/, "Password requires a symbol")
    //   .required("Password Required"),
    // confirmPass: Yup.string()
    //   .oneOf([Yup.ref("Password"), null], ' "Password" did not match ')
    //   .required("Required"),
    contact: Yup.string().required("Phone number is required"),
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
          setTimeout(() => setLoading(false), 200);
        }}
      />
    </div>
  );
}
export default App;
