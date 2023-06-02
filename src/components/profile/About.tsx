const About: React.FC<{ image: string; info: any }> = ({ image, info }) => {
  return (
    <>
      <div className="navigation">
        <div className="name">
          <p>
            {info.firstName} {info.lastName}
          </p>
        </div>
        <div className="socials"></div>
      </div>
      <div className="personal-info">
        <img src={image} width={160} height={160} />
        <p className="description">{info.aboutYou}</p>
      </div>
    </>
  );
};

export default About;
