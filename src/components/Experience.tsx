import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/personalInfo.scss";
import { Link } from "react-router-dom";

interface IJobs {
  jobName: string;
  firm: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Experience: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const [jobs, setJobs] = useState<Array<IJobs>>([]);
  const cvInfo = {
    jobName: "",
    firm: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const cvInfoVAlidation = yup.object().shape({
    jobName: yup
      .string()
      .min(5, "Must contain min. 5 letters!")
      .max(25, "First name too long!")
      .required(),
    firm: yup
      .string()
      .min(5, "Must contain min. 5 letters!")
      .max(25, "First name too long!")
      .required(),
    description: yup.string().max(500, "Used max number of characters"),
    startDate: yup.date().required(),
    endDate: yup
      .date()
      .when("startDate", (startDate, cvInfoVAlidation) =>
        cvInfoVAlidation.test(
          "is-after-start",
          "End date must be after start date",
          (endDate) => endDate && startDate && endDate > startDate[0]
        )
      ),
  });

  return (
    <>
      <Formik
        initialValues={cvInfo}
        validationSchema={cvInfoVAlidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();
          setJobs([...jobs!, values]);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="personal-info-form">
              <div>
                <label>Job name:</label>
                <Field
                  name="jobName"
                  placeholder="front-end web developer"
                  className="field"
                ></Field>
                {touched.jobName && errors.jobName && (
                  <label>{errors.jobName}</label>
                )}
              </div>
              <div>
                <label>Firm:</label>
                <Field
                  name="firm"
                  placeholder="IT firm"
                  className="field"
                ></Field>
                {touched.firm && errors.firm && <label>{errors.firm}</label>}
              </div>
              <div>
                <label>Job description:</label>
                <Field
                  name="description"
                  className="field"
                  as="textarea"
                ></Field>
                {touched.description && errors.description && (
                  <label>{errors.description}</label>
                )}
              </div>
              <div className="full-name">
                <div>
                  <label>Project description:</label>
                  <Field name="startDate" className="field" type="date"></Field>
                  {touched.startDate && errors.startDate && (
                    <label>{errors.startDate}</label>
                  )}
                </div>
                <div>
                  <label>Project description:</label>
                  <Field name="endDate" className="field" type="date"></Field>
                  {touched.endDate && errors.endDate && (
                    <label>{errors.endDate}</label>
                  )}
                </div>
              </div>
              <div className="buttons">
                <button className="next" type="submit">
                  Add
                </button>
                <button className="next" type="button">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/skills"
                    onClick={() => {
                      setInfo({ ...info, experience: jobs });
                    }}
                  >
                    Next
                  </Link>
                </button>
              </div>
              <div className="projects">
                {jobs?.map((job, index) => (
                  <div key={index} className="project">
                    <p>{job.jobName}</p>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        jobs.splice(index, 1);
                        setJobs([...jobs]);
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

export default Experience;
