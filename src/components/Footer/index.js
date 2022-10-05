import logo from "../../images/GameTastingLOGO-BK.png";
import { FooterSearchBar } from "../FooterSearchBar";

export function Footer() {
  return (
    <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
        © 2022 Created by:{" "}
        <a
          href="https://www.linkedin.com/in/igor-lopes-83232ba9/"
          class="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Igor Lopes
        </a>{" "}
        ,{" "}
        <a
          href="https://www.linkedin.com/in/-maxpaulo/"
          class="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Maxwell Paulo{" "}
        </a>
        and{" "}
        <a
          href="https://www.linkedin.com/in/roger-hainz-210577ba/"
          class="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Roger Hainz
        </a>
        . All Rights Reserved.
      </span>
      <div class="flex flex-wrap items-center gap-x-6 border-solid border-2 ">
        <img
          class="border-solid border-2"
          style={{ width: "50px" }}
          src={logo}
          alt="Game Tasting logo"
        />
        <FooterSearchBar class="border-solid border-2" />
      </div>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 ">
        <li>
          <a href="/about-us" class="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="/" class="mr-4 hover:underline md:mr-6">
            Home
          </a>
        </li>
      </ul>
    </footer>
  );
}
