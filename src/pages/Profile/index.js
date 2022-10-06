import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import style from "./style.module.css"

export function Profile() {

  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    navigate(0)
  }

  function handleEditProfile() {
    navigate("/");
  }

  function handleCreateGame() {
    navigate("/profile/create-game");
  }

  return (
    <>
      <div className={style.userProfile}>
        <h1 className={style.profileTitle}>Taster Profile</h1>
        <div className={style.userAvatarName}>
          <img src={loggedInUser.user.avatar} className={style.userAvatar} alt="user avatar"/>
          <h1 >{loggedInUser.user.name}</h1>
        </div>
        <p>{loggedInUser.user.birthDate}</p>
        <p>{loggedInUser.user.email}</p>
        <button onClick={handleCreateGame}>Display a new Game</button>
        <div className={style.Buttons}>
          <button onClick={handleLogOut}>Logout</button>
          <button onClick={handleEditProfile}>Edit</button>
        </div>
      </div>
    </>
  );
}
