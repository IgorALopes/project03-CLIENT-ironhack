import { Link } from "react-router-dom";
import style from "./style.module.css"
import logoBk from "../../images/GameTastingLOGO-BK.png"
import { AuthContext } from "../../contexts/authContext.js"
import { useContext } from "react"

export function Navbar() {

  const { loggedInUser } = useContext(AuthContext);
  const userName = loggedInUser.user.name
  let userName2 = String(userName).split(' ')[0]

  console.log(userName2)

  return (
    <nav className="nav">
      <div className={style.navContent}>
        <Link to={"/"}>
          <img
            style={{ width: "150px" }}
            src={logoBk}
            alt="Game Tasting logo"
          />
        </Link>

        <div className={style.navLinks}>
          <Link to={"/"}>
            <p className={style.navLinkAnima}>Home</p>
          </Link>
          <Link to={`/about-us`}>
            <p className={style.navLinkAnima}>About</p>
          </Link>
          <Link to={"/signup"}>
            <p className={style.navLinkAnima}>Sign up</p>
          </Link>
          {!loggedInUser ? 
            <Link to={"/login"}>
              <p className={style.navLinkAnima}>Login</p>
            </Link> :
            <Link to={"/profile"}>
              <p className={style.navLinkAnima}>{`Hello, ${userName2}`}</p>
            </Link>
          }
          
        </div>
      </div>
    </nav>
  );
}
