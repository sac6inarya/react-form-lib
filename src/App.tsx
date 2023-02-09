import React, { useState } from "react";
import "./App.scss";
import { Option } from "./Types/index";
import * as Yup from "yup";
import { RadioFieldProps } from "./components/Radio/index";
import { CheckboxFieldProps } from "./components/CheckBox/index";
import TestForm from "./components/TestForm1";
import RegistrationForm from "./components/TestForm2";
import { SelectFProps } from "./components/SelectField";
import { SwitchFieldProps } from "./components/Switch";

const genderoptions: Option[] = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
  { value: "other", name: "Other" },
];
const languageoptions: Option[] = [
  { value: "english", name: "English" },
  { value: "hindi", name: "Hindi" },
  { value: "french", name: "French" },
];
const titleOptions: Option[] = [
  { value: "Mr", name: "Mr" },
  { value: "Mrs", name: "Mrs" },
  { value: "Miss", name: "Miss" },
];
const relationOptions: Option[] = [
  { value: "Customer", name: "Customer" },
  { value: "Partner", name: "Partner" },
  { value: "Employee", name: "Employee" },
  { value: "Other", name: "Other" },
];
const agreementoptions: Option[] = [
  {
    value: "check",
    name: "I agree to the Terms & Conditions and Privacy Policy Terms & Conditions and Privacy Policy",
  },
];
const RadioFP: RadioFieldProps = {
  name: "gender",
  options: genderoptions,
  label: "Select gender",
  helperText: "Select any one option",
  column: true,
};
const SelectFP: SelectFProps = {
  name: "language",
  options: languageoptions,
  label: "Language",
  emptyItem: "Select something",
  helperText: "Select your language",
};
const tilte: SelectFProps = {
  name: "title",
  options: titleOptions,
  label: "Title",
  emptyItem: "Select Title",
  helperText: "Select any one option",
  width: "selecttitlewidth",
};
const relationRadio: RadioFieldProps = {
  name: "relation",
  options: relationOptions,
  label: "Relation with Micro Focus",
  helperText: "Select any one option",
  column: true,
};
const SwitchFP: SwitchFieldProps = {
  name: "switch",
  label: "Toggle",
  helperText: "Click for toggle",
};
const agreement: SelectFProps = {
  name: "agreement",
  options: agreementoptions,
  emptyItem: "Select something",
};
const rgistrationconfig = [
  [
    {
      type: "select",
      fieldProps: tilte,
      valueKey: "title",
    },
    {
      type: "text",
      valueKey: "fname",
      fieldProps: {
        label: "First Name",
        placeholder: "Enter First Name",
        helperText: "Please fill your first name",
        width: "fnamewidth",
      },
    },

    {
      type: "text",
      valueKey: "lname",
      fieldProps: {
        label: "Last Name",
        placeholder: "Enter last Name",
        helperText: "Please fill  your last name",
        width: "lnamewidth",
      },
    },
  ],
  [
    {
      type: "text",
      valueKey: "jobTitle",
      fieldProps: {
        label: "Job Title",
        placeholder: "Enter job title",
        helperText: "Enter job title",
        width: "jobtitlewidth",
      },
    },

    {
      type: "text",
      valueKey: "street",
      fieldProps: {
        label: "Street",
        placeholder: "Enter street",
        helperText: "Enter street details",
        width: "streedwidth",
      },
    },
  ],
  {
    type: "text",
    valueKey: "postalcode",
    fieldProps: {
      label: "Postal Code",
      placeholder: "Enter postal code",
      helperText: "Enter postal code",
      width: "postelwidth",
    },
  },

  [
    {
      type: "radio",
      fieldProps: RadioFP,
      valueKey: "gender",
    },
    {
      type: "switch",
      fieldProps: SwitchFP,
      valueKey: "toggle",
    },
  ],

  [
    {
      type: "checkbox",
      fieldProps: SelectFP,
      valueKey: "language",
    },

    {
      type: "phone",
      valueKey: "phoneNo",
      fieldProps: {
        label: "phone No. ",
        helperText: "Enter your phone no.",
        widht: "phonewidth",
        placeholder: "Enter your phone no.",
      },
    },
  ],
  {
    type: "text",
    valueKey: "allergies",
    fieldProps: {
      label: "Do you have any allegeries and/or food intolerances ?",
      fullwidth: true,
      helperText:
        "I hereby consent to the following information regarding allergies and intolerances being shared and processed as part of the event.",
      width: "allergieswidth",
    },
  },
  {
    type: "text",
    valueKey: "submitquestions",
    fieldProps: {
      label: "Pre-submit your question/s here",
      width: "submitquestionswidht",
    },
  },
  {
    type: "checkbox",
    fieldProps: agreement,
    valueKey: "agreement",
  },
];

const rangeoptions: Option[] = [
  { value: "$", name: "$" },
  { value: "$$", name: "$$" },
  { value: "$$$", name: "$$$" },
  { value: "$$$$", name: "$$$$" },
];
const placetypeoptions: Option[] = [
  { value: "Distillery", name: "Distillery" },
  { value: "Brewery", name: "Brewery" },
  { value: "Restaurant", name: "Restaurant" },
  { value: "Bar", name: "Bar" },
  { value: "Cafe", name: "Cafe" },
  { value: "Cooking School", name: "Cooking School" },
  { value: "Food Hall", name: "Food Hall" },
  { value: "Bakery", name: "Bakery" },
  { value: "Food Truck", name: "Food Truck" },
];

const TestCheckBoxFP: CheckboxFieldProps = {
  options: placetypeoptions,
  label: "Place Type",
  column: true,
  name: "placetype",
  id: "",
};
const TestRadioFP: RadioFieldProps = {
  name: "range",
  options: rangeoptions,
  label: "$ Range",
  column: true,
  id: "",
};

const testformconfig = [
  {
    type: "text",
    valueKey: "place",
    fieldProps: {
      label: "Name of the Place",
      width: "placewidth",
    },
  },
  [
    {
      type: "text",
      valueKey: "contact",
      fieldProps: {
        label: "Contact Number",
        width: "contactwidth",
        className: "labeltextred",
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
      valueKey: "tandd",
      fieldProps: {
        label: "Takeout & Delivery",
        width: "tanddwidth",
      },
    },
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
        placeholder: "Enter email",
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
      fieldProps: TestCheckBoxFP,
      valueKey: "placetype",
    },
    {
      type: "radio",
      fieldProps: TestRadioFP,
      valueKey: "range",
    },
  ],
  [
    {
      type: "array",
      valueKey: "arrayText",
      fieldProps: {
        itemType: "text",
        defaultItemValue: "",
        arrayItemFieldProps: {
          label: "Label",
        },
      },
    },
  ],
];

function App() {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    place: Yup.string().required("Required"),
    range: Yup.string().required("Required"),
    dis: Yup.string().required("Required"),
    sdis: Yup.string().required("Required"),
    iglink: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    tandd: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    placetype: Yup.array().min(1, "Required").required("Required"),
    rlink: Yup.string().required("Required"),
    contact: Yup.string().required("Phone number is required"),
    arrayText: Yup.array().of(
      Yup.string().required("At least one string is required")
    ),
    title: Yup.string().required("Required"),
    fname: Yup.string().required("Required"),
    lname: Yup.string().required("Required"),
    jobTitle: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    postalcode: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Phone No. Required"),
    language: Yup.array().min(1, "Required").required("Required"),
    relation: Yup.string().required("Required"),
    allergies: Yup.string().required("Required"),
    submitquestions: Yup.string().required("Required"),
    agreement: Yup.array().min(1, "Required").required("Required"),
  });
  const initialValues = {};
  return (
    <div className="App">
      <TestForm
        config={testformconfig}
        initialValues={initialValues}
        isInProgress={loading}
        validationSchema={validationSchema}
        onSubmit={(values: object) => {
          setLoading(true);
          console.log(values);
          setTimeout(() => setLoading(false), 200);
        }}
      />
      <RegistrationForm
        config={rgistrationconfig}
        initialValues={initialValues}
        isInProgress={loading}
        validationSchema={validationSchema}
        onSubmit={(values: object) => {
          setLoading(true);
          console.log(values);
          setTimeout(() => setLoading(false), 1000);
        }}
      />
    </div>
  );
}
export default App;
