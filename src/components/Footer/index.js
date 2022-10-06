import logo from "../../images/GameTastingLOGO-BK.png";
import { FooterSearchBar } from "../FooterSearchBar";
import style from "./style.module.css"

export function Footer() {
  return (
    <footer className={style.footer}>
      <span className={style.copyRigths}>
        © 2022 Created by:{" "}
        <a
          href="https://www.linkedin.com/in/igor-lopes-83232ba9/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          <strong>Igor Lopes</strong>
        </a>{" "}
        ,{" "}
        <a
          href="https://www.linkedin.com/in/-maxpaulo/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          <strong>Maxwell Paulo</strong>{" "}
        </a>
        and{" "}
        <a
          href="https://www.linkedin.com/in/roger-hainz-210577ba/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          <strong>Roger Hainz</strong>
        </a>
        . All Rights Reserved.
      </span>
      <div className={style.searchAndLogo}>
        <img
          className=""
          style={{ width: "100px" }}
          src={logo}
          alt="Game Tasting logo"
          href="/"
        />
        <FooterSearchBar/>
      </div>
      <ul className={style.siteMapLinks}>
        <li>
          <a href="/about-us">
            About
          </a>
        </li>
        <li>
          <a href="/">
            Home
          </a>
        </li>
      </ul>
    </footer>
  );
}
