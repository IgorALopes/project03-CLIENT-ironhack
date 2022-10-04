import style from "./style.module.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "../../components/GameCard";
import { SearchBar } from "../../components/Searchbar";
import graph from "../../images/GameTastingLOGO-geometric-BK.png"

export function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/TheBestSoccerTeams"
        );

        setCards([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCards();
  }, []);

  return <>
    <header className={style.headerHome}>
      <div className={style.headerInnerContent}>
        <h1><span>Fresh new games ready to taste</span></h1>
      </div>
    </header>
    <main className={style.gamesMenu}>
      <img style={{width: "15px"}} src={graph} alt="Graphism"/>
      <h2><span>Menu</span></h2>
      <img style={{width: "15px"}} src={graph} alt="Graphism"/>
      <div className={style.gameCards}>
      {cards
          .slice(0)
          .reverse()
          .map((currentCard) => {
            return (
              <>
                <Link to={`/game/${currentCard._id}`}>
                  <Card
                    team={currentCard.team}
                    year={currentCard.year}
                    team_logo={currentCard.team_logo}
                  />
                </Link>
              </>
            );
          })}
      </div>
    </main>
  </>
}
