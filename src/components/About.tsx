import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const About: React.FC = () => {
  const cvInfo = {
    firstName: "",
    lastName: "",
    github: "",
    linkedIn: "",
    phone: "",
    aboutYou: "",
  };
  const cvInfoVAlidation = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Must contain min. 2 letters!")
      .max(10, "First name too long!"),
    lastName: yup
      .string()
      .min(2, "Must contain min. 2 letters!")
      .max(10, "Last name too long!"),
    github: yup.string(),
    linkedIn: yup.string(),
    phone: yup
      .string()
      .min(6, "Must contain min. 6 letters!")
      .max(11, "Phone number too long!"),
    aboutYou: yup.string().max(200, "Used max number of characters"),
  });
  return (
    <>
      <Formik
        initialValues={cvInfo}
        validationSchema={cvInfoVAlidation}
        onSubmit={(values, actions) => {}}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div>
                <label>First name:</label>
                <Field name="firstName" placeholder="John"></Field>
                {touched.firstName && errors.firstName && (
                  <label>{errors.firstName}</label>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default About;
