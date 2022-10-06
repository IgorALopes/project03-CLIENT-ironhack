import logo from "../../images/GameTastingLOGO-pan-BK.png";
import style from "./style.module.css";

export function Footer() {
  return (
    <div className={style.container}>
      <p>
        © Created by:{" "}
        <a
          href="https://www.linkedin.com/in/igor-lopes-83232ba9/"
          target="_blank"
          rel="noreferrer"
          className={style.linkAnima}
        >
          Igor Lopes
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/-maxpaulo/"
          target="_blank"
          rel="noreferrer"
          className={style.linkAnima}
        >
          Maxwell Paulo
        </a>{" "}
        and{" "}
        <a
          href="https://www.linkedin.com/in/roger-hainz-210577ba/"
          target="_blank"
          rel="noreferrer"
          className={style.linkAnima}
        >
          Roger Hainz
        </a>
        .
      </p>
      <img src={logo} alt="Game Tasting logo" style={{ width: "60px" }} />
      <div className={style.links}>
        <a href="/" className={style.linkAnima}>
          Home
        </a>
        <a href="about-us" className={style.linkAnima}>
          About
        </a>
      </div>
    </div>
  );
}
