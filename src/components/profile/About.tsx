import Github from "../../assets/Github";
import Linkedin from "../../assets/Linkedin";
import Phone from "../../assets/Phone";

const About: React.FC<{ image: string; info: any }> = ({ image, info }) => {
  return (
    <>
      <div className="personal-info">
        <img src={image} width={160} height={160} />
        <p className="description">{info.aboutYou}</p>
      </div>
      <div className="name">
        <div>
          <label htmlFor="">Name:</label>
          <p className="full-name">
            {info.firstName} {info.lastName}
          </p>
        </div>
        <div className="links">
          {info.github && (
            <div className="link">
              <Github />
              <p>{info.github}</p>
            </div>
          )}
          {info.linkedIn && (
            <div className="link">
              <Linkedin />
              <p>{info.linkedIn}</p>
            </div>
          )}
          {info.phone && (
            <div className="link">
              <Phone />
              <p>{info.phone}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
