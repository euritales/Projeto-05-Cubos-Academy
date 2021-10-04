import "./styles.css";
import SadIcon from "../../assets/sad-icon.svg";
import HappyIcon from "../../assets/happy-icon.svg";

function Profile() {
  return (
    <div className="container-profile">
      <img src={SadIcon} alt="" />
      <span>Site ainda em construção. Volte em breve!</span>
      <img src={HappyIcon} alt="" />
    </div>
  );
}

export default Profile;
