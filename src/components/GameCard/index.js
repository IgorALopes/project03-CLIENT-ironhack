import style from "./style.module.css";
import plate from "../../images/plate-cut.png"

export function Card(props) {
  const { title, gameLogo, owner } = props;

  return (
      <div className={style.gameCard}>
        <div className={style.gamePlateAndLogo}>
            <img className={style.gamePlate} src={plate} alt="Game plate" />
            <img className={style.gameLogo} src={gameLogo} alt="Game logo" />
        </div>
        <p style={{fontSize: "1em"}}>{title}</p>
        <p style={{fontSize: "0.7em"}}>by {owner.split(' ')[0]} {owner.split(' ')[owner.split(' ').length - 1]
}</p>
      </div>
  );
}