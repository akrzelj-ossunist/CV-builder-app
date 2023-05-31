import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/personalInfo.scss";
import { Link } from "react-router-dom";
import Back from "../assets/Back";

interface ISchools {
  schoolName: string;
  major: string;
  startDate: string;
  endDate: string;
}

const Education: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const [schools, setSchools] = useState<Array<ISchools>>(info.education);
  const cvInfo = {
    schoolName: "",
    major: "",
    startDate: "",
    endDate: "",
  };
  const cvInfoVAlidation = yup.object().shape({
    schoolName: yup
      .string()
      .min(5, "Must contain min. 5 letters!")
      .max(25, "First name too long!")
      .required(),
    major: yup
      .string()
      .min(5, "Must contain min. 5 letters!")
      .max(25, "First name too long!")
      .required(),
    startDate: yup.date(),
    endDate: yup
      .date()
      .when("startDate", (startDate, cvInfoVAlidation) =>
        cvInfoVAlidation.test(
          "is-after-start",
          "End date must be after start date",
          (endDate) => endDate && startDate && endDate >= startDate[0]
        )
      ),
  });

  return (
    <>
      <Back path={"/"} />
      <Formik
        initialValues={cvInfo}
        validationSchema={cvInfoVAlidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();
          setSchools([...schools!, values]);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="personal-info-form">
              <div>
                <label>School name:</label>
                <Field
                  name="schoolName"
                  placeholder="University department of professional studies, Split"
                  className="field"
                ></Field>
                {touched.schoolName && errors.schoolName && (
                  <label>{errors.schoolName}</label>
                )}
              </div>
              <div>
                <label>Major:</label>
                <Field
                  name="major"
                  placeholder="Bachelor of Science (B.S.) - Information technology"
                  className="field"
                ></Field>
                {touched.major && errors.major && <label>{errors.major}</label>}
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
                <button
                  className="next"
                  type="submit"
                  style={{ background: "blue" }}
                >
                  Add
                </button>
                <button className="next" type="button">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/experience"
                    onClick={() => {
                      setInfo({ ...info, education: schools });
                    }}
                  >
                    Next
                  </Link>
                </button>
              </div>
              <div className="projects">
                {schools?.map((school, index) => (
                  <div key={index} className="project">
                    <p>{school.schoolName}</p>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        schools.splice(index, 1);
                        setSchools([...schools]);
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

export default Education;
