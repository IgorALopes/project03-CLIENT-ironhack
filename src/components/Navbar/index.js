import { Link } from "react-router-dom";
import { SearchBar } from "../Searchbar";

export function Navbar() {
  return (
    <div>
      <div>
        <Link to={"/"}>
          <h1>Logo do site</h1>
        </Link>
        <SearchBar />
        <div>
          <Link to={"/home"}>
            <p>Home</p>
          </Link>

          <Link to={`/about-us`}>
            <p>Sobre</p>
          </Link>

          <Link to={"/signup"}>
            <p>Sign up</p>
          </Link>

          <Link to={"/login"}>
            <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
