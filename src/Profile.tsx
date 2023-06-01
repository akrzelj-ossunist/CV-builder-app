import { Preview, print } from "react-html2pdf";

const Profile: React.FC<{ info: any }> = ({ info }) => {
  return (
    <>
      <Preview id={"jsx-template"}>
        <div id="content">{JSON.stringify(info)}</div>
      </Preview>
      <button onClick={() => print("a", "jsx-template")}> print</button>
    </>
  );
};

export default Profile;
