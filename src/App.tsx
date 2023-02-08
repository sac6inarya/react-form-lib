import React, { useState } from "react";
import "./App.scss";
import { Option } from "./Types/index";
import * as Yup from "yup";
import { RadioFieldProps } from "./components/Radio/index";
import { CheckboxFieldProps } from "./components/Checkbox";
import TestForm from "./components/TestForm";

const rangeoptions: Option[] = [
  { value: "$", label: "$" },
  { value: "$$", label: "$$" },
  { value: "$$$", label: "$$$" },
  { value: "$$$$", label: "$$$$" },
];
const placetypeoptions: Option[] = [
  { value: "Distillery", label: "Distillery" },
  { value: "Brewery", label: "Brewery" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "Bar", label: "Bar" },
  { value: "Cafe", label: "Cafe" },
  { value: "Cooking School", label: "Cooking School" },
  { value: "Food Hall", label: "Food Hall" },
  { value: "Bakery", label: "Bakery" },
  { value: "Food Truck", label: "Food Truck" },
];

const CheckBoxFP: CheckboxFieldProps = {
  options: placetypeoptions,
  header: "Place Type",
  column: true,
};
const RadioFP: RadioFieldProps = {
  name: "range",
  options: rangeoptions,
  header: "$ Range",
  column: true,
};

const config = [
  [
    {
      type: "text",
      valueKey: "place",
      fieldProps: {
        header: "Name of the Place",
        width: "placewidth",
      },
    },
  ],

  [
    {
      type: "text",
      valueKey: "contact",
      fieldProps: {
        header: "Contact Number",
        width: "contactwidth",
      },
    },
    {
      type: "text",
      valueKey: "rlink",
      fieldProps: {
        header: "Reservation Link",
        width: "rlink",
      },
    },
  ],
  [
    {
      type: "text",
      valueKey: "t&d",
      fieldProps: {
        header: "Takeout & Delivery",
        width: "t&dwidth",
      },
    },
    {
      type: "text",
      valueKey: "website",
      fieldProps: {
        header: "Website",
        width: "websitewidth",
      },
    },
  ],
  [
    {
      type: "text",
      valueKey: "email",
      fieldProps: {
        header: "Email",
        width: "emailwidth",
      },
    },
    {
      type: "text",
      valueKey: "iglink",
      fieldProps: {
        header: "Instagram Link",
        width: "iglinkwidth",
      },
    },
  ],
  {
    type: "text",
    valueKey: "sdis",
    fieldProps: {
      header: "Short Discription",
      width: "sdiswidth",
    },
  },
  {
    type: "text",
    valueKey: "dis",
    fieldProps: {
      header: "Discription",
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
