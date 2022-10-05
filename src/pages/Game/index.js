import style from "./style.module.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {api} from "../../api/api";


export function Game() {
  
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [screenShotView, setScreen] = useState([])
  let hiddenDelete=true;

  // useEffect(()=>{
    

  // }, [game]);
  // useEffect(()=>{
    
  // }, []);
  
  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/${id}`);
        setGame(response.data);
        console.log(game)
        } catch (err) {
        console.log(err);
      }
    }
    fetchGame();
  }, [id]);

  useEffect(() => {
        //console.log(game)
        setScreen(game.screenShots);
        console.log(screenShotView);
        }, [game]);



return (<>

    <div>
      <div>
          <h1 className={style.sSV}>Screenshots</h1>
          <div className={style.shots}>
          { screenShotView ? screenShotView.map((current) => {
                            return (<>
                                    <div >
                                        <p></p>
                                        <img src={current} width="80px"></img>
                                    </div>
                                    </>);
          }) : <></>
        
        }
        </div>
        <div>
            <img src={game.gameLogo} width="40px"></img>
            <h1>{game.title}</h1>
            <button type="button">Play</button>
            <button type="button">Review</button>
            <button type="button" hidden={hiddenDelete}>Delete</button>
        </div>
        <div>
            <h2>{game.description}</h2>
        </div>




    </div>  
      
    
    
    
    
    </div>    
  
  
  
  </>);
}
