import logo from "../../images/GameTastingLOGO-BK.png";
import { FooterSearchBar } from "../FooterSearchBar";

export function Footer() {
  return (
    <footer className="">
      <span className="">
        © 2022 Created by:{" "}
        <a
          href="https://www.linkedin.com/in/igor-lopes-83232ba9/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          Igor Lopes
        </a>{" "}
        ,{" "}
        <a
          href="https://www.linkedin.com/in/-maxpaulo/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          Maxwell Paulo{" "}
        </a>
        and{" "}
        <a
          href="https://www.linkedin.com/in/roger-hainz-210577ba/"
          className=""
          target="_blank"
          rel="noreferrer"
        >
          Roger Hainz
        </a>
        . All Rights Reserved.
      </span>
      <div className="">
        <img
          className=""
          style={{ width: "50px" }}
          src={logo}
          alt="Game Tasting logo"
        />
        <FooterSearchBar className="" />
      </div>
      <ul className="">
        <li>
          <a href="/about-us" className="">
            About
          </a>
        </li>
        <li>
          <a href="/" className="">
            Home
          </a>
        </li>
      </ul>
    </footer>
  );
}
