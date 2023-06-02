import { useRoutes, useLocation, Link } from "react-router-dom";
import PresonalInfo from "./components/PersonalInfo";
import Projects from "./components/Projects";
import "./styles/index.scss";
import SideBgImage from "./assets/SideBgImage";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import { useState } from "react";
import Profile from "./Profile";

function App() {
  const [info, setInfo] = useState({
    image: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      github: "",
      linkedIn: "",
      phone: "",
      aboutYou: "",
    },
    education: [],
    experience: [],
    jobSkills: [],
    personalSkills: [],
    languageSkills: [],
    projects: {},
  });
  const location = useLocation();
  const navigation = [
    {
      href: "/",
      name: "Personal info",
    },
    {
      href: "/education",
      name: "Education",
    },
    {
      href: "/experience",
      name: "Experience",
    },
    {
      href: "/skills",
      name: "Skills",
    },
    {
      href: "/projects",
      name: "Projects",
    },
  ];
  const routes = useRoutes([
    {
      path: "/",
      element: <PresonalInfo info={info} setInfo={setInfo} />,
    },
    {
      path: "/education",
      element: <Education info={info} setInfo={setInfo} />,
    },
    {
      path: "/experience",
      element: <Experience info={info} setInfo={setInfo} />,
    },
    {
      path: "/skills",
      element: <Skills info={info} setInfo={setInfo} />,
    },
    {
      path: "/projects",
      element: <Projects info={info} setInfo={setInfo} />,
    },
    {
      path: "*",
      element: <div>Not found</div>,
    },
  ]);
  console.log(info);
  return (
    <>
      {location.pathname === "/profile" ? (
        <Profile info={info} />
      ) : (
        <div className="container">
          <div className="content">
            <div className="side-nav">
              <div className="side-nav-btns">
                {navigation.map((link, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        location.pathname === link.href
                          ? "side-nav-btn btn-active"
                          : "side-nav-btn"
                      }
                    >
                      <label>{index + 1}</label>
                      <p>{link.name}</p>
                    </div>
                  );
                })}
              </div>
              <SideBgImage />
            </div>
            {routes}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
