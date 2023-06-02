import { Preview, print } from "react-html2pdf";
import About from "./components/profile/About";
import Career from "./components/profile/Career";
import Projects from "./components/profile/Projects";
import "./styles/profile.scss";

const Profile: React.FC<{ info: any }> = ({ info }) => {
  return (
    <>
      <Preview id={"jsx-template"}>
        <div id="content">
          <div className="profile-container">
            <About image={info.image} info={info.personalInfo} />
            <Career
              education={info.education}
              experience={info.experience}
              skills={{
                personal: info.personalSkills,
                language: info.languageSkills,
                job: info.jobSkills,
              }}
            />
            <Projects />
          </div>
        </div>
      </Preview>
      <button onClick={() => print("a", "jsx-template")}> print</button>
    </>
  );
};

export default Profile;
