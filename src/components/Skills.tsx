import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/skills.scss";
import { Link } from "react-router-dom";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<{
    job: Array<string>;
    personal: Array<string>;
    language: Array<string>;
  }>({
    job: [],
    personal: [],
    language: [],
  });
  const arr = ["job", "personal", "language"];
  const object = { name: "" };
  const validation = yup.object().shape({
    name: yup
      .string()
      .min(2, "Must contain at least 2 letters")
      .max(20, "Too long"),
  });
  console.log(skills);
  return (
    <div className="skills">
      {arr.map((form, index) => {
        return (
          <Formik
            key={index}
            initialValues={object}
            validationSchema={validation}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              actions.resetForm();
              skills[form].push(values);
              setSkills({ ...skills });
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form className="skill">
                  <div>
                    <label>{form} skill:</label>
                    <Field name="name" className="field"></Field>
                    {touched.name && errors.name && (
                      <label>{errors.name}</label>
                    )}
                  </div>
                  <div>
                    {skills[form].map((skill) => (
                      <p>{skill}</p>
                    ))}
                  </div>
                  <button className="next" type="submit">
                    Add
                  </button>
                </Form>
              );
            }}
          </Formik>
        );
      })}
    </div>
  );
};

export default Skills;
