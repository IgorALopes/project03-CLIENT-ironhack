import style from "./style.module.css"
import { SearchBar } from "../../components/Searchbar";

export function Home() {
  return <>
    <header className={style.headerHome}>
      <div className={style.headerInnerContent}>
        <h1><span>Fresh new games</span></h1>
      </div>
    </header>
  </>
}
