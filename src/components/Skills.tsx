import { Link } from "react-router-dom";
import Back from "../assets/Back";
import "../styles/skills.scss";
import Skill from "./Skill";

const Skills: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const arr = ["jobSkills", "personalSkills", "languageSkills"];
  return (
    <div className="skills">
      <Back path={"/experience"} />
      {arr.map((form, index) => {
        return <Skill form={form} key={index} info={info} setInfo={setInfo} />;
      })}
      <button className="next" style={{ marginTop: "10px" }}>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/projects"
        >
          Next
        </Link>
      </button>
    </div>
  );
};

export default Skills;
