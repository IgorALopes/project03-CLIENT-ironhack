import style from "./style.module.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "../../components/GameCard";
import { SearchBar } from "../../components/Searchbar";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png"

export function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/1.0/game/games"
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
        <h1><span>Fresh new games, ready to taste.</span></h1>
      </div>
    </header>
    <main className={style.gamesMenu}>
      <img style={{width: "15px"}} src={graphImg} alt="Graphism"/>
      <h2><span>Menu</span></h2>
      <img style={{width: "15px"}} src={graphImg} alt="Graphism"/>
      <p className={style.menuSub}>Choose a game plate, taste it and make a review.</p>
      <SearchBar/>
      <div className={style.gameCards}>
      {cards
          .slice(0)
          .reverse()
          .map((currentCard) => {
            return (
              <>
                <Link to={`/game/${currentCard._id}`}>
                  <Card
                    title={currentCard.title}
                    gameLogo={currentCard.gameLogo}
                    owner={currentCard.owner.name}
                  />
                </Link>
              </>
            );
          })}
      </div>
    </main>
  </>
}
