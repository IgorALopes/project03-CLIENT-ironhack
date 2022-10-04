import { Link } from "react-router-dom";
import style from "./style.module.css"
import logoBk from "../../images/GameTastingLOGO-BK.png"

export function Navbar() {
  return (
    <nav className="nav">
      <div className={style.navContent}>
        <Link to={"/"}>
          <img style={{width: "150px"}} src={logoBk} alt="Game Tasting logo"/>
        </Link>

        <div className={style.navLinks}>
          <Link to={"/home"}>
            <p className={style.navLinkAnima}>Home</p>

          </Link>
          <Link to={`/about-us`}>
            <p className={style.navLinkAnima}>About</p>
          </Link>
          <Link to={"/signup"}>
            <p className={style.navLinkAnima}>Sign up</p>
          </Link>
          <Link to={"/login"}>
            <p className={style.navLinkAnima}>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
