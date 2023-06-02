import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "../styles/personalInfo.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PresonalInfo: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(info.image);
  const handleImageChange = (e: any) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const cvInfo = info.personalInfo;
  const cvInfoVAlidation = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Must contain min. 2 letters!")
      .max(10, "First name too long!")
      .required(),
    lastName: yup
      .string()
      .min(2, "Must contain min. 2 letters!")
      .max(10, "Last name too long!")
      .required(),
    github: yup.string(),
    linkedIn: yup.string(),
    phone: yup
      .string()
      .min(6, "Must contain min. 6 letters!")
      .max(13, "Phone number too long!")
      .required(),
    aboutYou: yup.string().max(200, "Used max number of characters"),
  });
  return (
    <>
      <Formik
        initialValues={cvInfo}
        validationSchema={cvInfoVAlidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          setInfo({ ...info, personalInfo: values, image: img });
          navigate("/education");
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="personal-info-form">
              <div className="full-name">
                <div>
                  <label>First name:</label>
                  <Field
                    name="firstName"
                    placeholder="John"
                    className="field"
                  ></Field>
                  {touched.firstName && errors.firstName && (
                    <label>{errors.firstName}</label>
                  )}
                </div>
                <div>
                  <label>Last name:</label>
                  <Field
                    name="lastName"
                    placeholder="Doe"
                    className="field"
                  ></Field>
                  {touched.lastName && errors.lastName && (
                    <label>{errors.lastName}</label>
                  )}
                </div>
              </div>
              <div>
                <label>Phone number:</label>
                <Field
                  name="phone"
                  placeholder="+385 99 235 7633"
                  className="field"
                ></Field>
                {touched.phone && errors.phone && <label>{errors.phone}</label>}
              </div>
              <div>
                <label>Github:</label>
                <Field name="github" className="field"></Field>
                {touched.github && errors.github && (
                  <label>{errors.github}</label>
                )}
              </div>
              <div>
                <label>LinkedIn:</label>
                <Field name="linkedIn" className="field"></Field>
                {touched.linkedIn && errors.linkedIn && (
                  <label>{errors.linkedIn}</label>
                )}
              </div>
              <div>
                <label>About yourself:</label>
                <Field name="aboutYou" className="field" as="textarea"></Field>
                {touched.aboutYou && errors.aboutYou && (
                  <label>{errors.aboutYou}</label>
                )}
              </div>
              <div>
                <input type="file" onChange={handleImageChange} />
              </div>
              <button className="next" type="submit">
                Next
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PresonalInfo;
