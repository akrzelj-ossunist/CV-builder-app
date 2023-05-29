import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/personalInfo.scss";

interface IProject {
  projectName: string;
  github: string;
  description?: string;
}

const Projects: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const cvInfo = {
    projectName: "",
    github: "",
    description: "",
  };
  const cvInfoVAlidation = yup.object().shape({
    projectName: yup
      .string()
      .min(2, "Must contain min. 2 letters!")
      .max(25, "First name too long!")
      .required(),
    github: yup.string().required(),
    description: yup.string().max(200, "Used max number of characters"),
  });
  console.log(projects);
  return (
    <>
      <Formik
        initialValues={cvInfo}
        validationSchema={cvInfoVAlidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();
          setProjects([...projects!, values]);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="personal-info-form">
              <div>
                <label>Project name:</label>
                <Field
                  name="projectName"
                  placeholder="Flappy bird"
                  className="field"
                ></Field>
                {touched.projectName && errors.projectName && (
                  <label>{errors.projectName}</label>
                )}
              </div>
              <div>
                <label>Github:</label>
                <Field name="github" className="field"></Field>
                {touched.github && errors.github && (
                  <label>{errors.github}</label>
                )}
              </div>
              <div>
                <label>Project description:</label>
                <Field
                  name="description"
                  className="field"
                  as="textarea"
                ></Field>
                {touched.description && errors.description && (
                  <label>{errors.description}</label>
                )}
              </div>
              <div className="buttons">
                <button className="next" type="submit">
                  Add
                </button>
                <button
                  className="next"
                  type="button"
                  onClick={() => {
                    setInfo({ ...info, projects: projects });
                  }}
                >
                  Finish
                </button>
              </div>
              <div className="projects">
                {projects?.map((project, index) => (
                  <div key={index} className="project">
                    <p>{project.projectName}</p>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        projects.splice(index, 1);
                        setProjects([...projects]);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Projects;
