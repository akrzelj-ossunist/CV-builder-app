import "../styles/skills.scss";
import Skill from "./Skill";

const Skills: React.FC<{ info: any; setInfo: (info: any) => void }> = ({
  info,
  setInfo,
}) => {
  const arr = ["job", "personal", "language"];
  return (
    <div className="skills">
      {arr.map((form, index) => {
        return <Skill form={form} key={index} info={info} setInfo={setInfo} />;
      })}
    </div>
  );
};

export default Skills;
