import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/skills.scss";
import { Link } from "react-router-dom";

const Skill: React.FC<{
  form: string;
  info: any;
  setInfo: (info: any) => void;
}> = ({ form, info, setInfo }) => {
  const [skills, setSkills] = useState(info[form]);
  const object = { name: "" };
  const validation = yup.object().shape({
    name: yup
      .string()
      .min(2, "Must contain at least 2 letters")
      .max(40, "Too long"),
  });
  const clearSkill = (skill: string) => {
    const index = skills.indexOf(skill);
    skills.splice(index, 1);
    setSkills([...skills]);
  };
  return (
    <>
      <Formik
        initialValues={object}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();
          setSkills([...skills, values.name]);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="skill">
              <div className="skill-field">
                <label>{form.substring(0, form.length - 6)} skill:</label>
                <Field name="name" className="field"></Field>
                {touched.name && errors.name && <label>{errors.name}</label>}
              </div>
              <div className="skill-list">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="skill-name">
                    <p>{skill}</p>
                    <button
                      onClick={() => clearSkill(skill)}
                      type="button"
                      className="clear-skill"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button
                style={{ background: "blue" }}
                className="next"
                type="submit"
                onClick={() => {
                  form === "jobSkills" &&
                    setInfo({ ...info, jobSkills: skills });
                  form === "personalSkills" &&
                    setInfo({ ...info, personalSkills: skills });
                  form === "languageSkills" &&
                    setInfo({ ...info, languageSkills: skills });
                }}
              >
                Add
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Skill;
