import logoText from "../../images/GameTastingLOGO-Typo-BK.png";
import logoimg from "../../images/GameTastingLOGO-geometric-BK.png";
import style from "./style.module.css";
import github from "../../images/GitHub icon.png";
import linkedin from "../../images/linkedin icon.png";
import max from "../../images/max.png";
import roger from "../../images/roger.png";
import igor from "../../images/igor.png";

export function AboutUs() {
  return (
    <div className={style.Container}>
      <img src={logoText} alt="Game tasting img" style={{ width: "150px" }} />

      <p className={style.p}>
        This is a website for game developers and for who likes to test new
        games. If you are a game developer you have the chance to show your game
        under development, and receive feedback from other users, this way you
        can improve it. If you enjoy testing games, feel free to test, give
        feedback and like the games. If you really liked you can add to your
        favorites and follow its development.
      </p>

      <img src={logoimg} alt="Game tasting img" style={{ width: "15px" }} />

      <p className={style.p}>
        This project was the third and the final one made during Ironhack's Web
        Development bootcamp. After 9 weeks we could develop a full stack
        application. The API was developed using NodeJS and MongoDB. For the
        Client side we used ReactJS, formik, bootstrap, React Hot Toast, all
        based in JavaScript, HTML and CSS.
      </p>

      <img src={logoimg} alt="Game tasting img" style={{ width: "15px" }} />

      <p>repository links: </p>

      <div className={style.repositoryLinks}>
        <a
          href="https://github.com/IgorALopes/project03-API-ironhack"
          target="_blank"
          rel="noreferrer"
          className={style.linkAnima}
        >
          API
        </a>{" "}
        <a
          href="https://github.com/IgorALopes/project03-CLIENT-ironhack"
          target="_blank"
          rel="noreferrer"
          className={style.linkAnima}
        >
          CLIENT
        </a>
      </div>

      <img src={logoimg} alt="Game tasting img" style={{ width: "15px" }} />

      <h2 className={style.creatorsTitle}>Creators</h2>

      <img src={logoimg} alt="Game tasting img" style={{ width: "15px" }} />

      <div className={style.creatorsInfos}>
        <div className={style.creator}>
          <p>Igor Lopes</p>

          <img src={igor} alt="Igor img" className={style.ourImg} />

          <div className={style.links}>
            <a
              href="https://github.com/IgorALopes"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={github} alt="giticon" />
              </button>
            </a>

            <a
              href="https://www.linkedin.com/in/igor-lopes-83232ba9/"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={linkedin} alt="linkdinicon" />
              </button>
            </a>
          </div>
        </div>
        <div className={style.creator}>
          <p>Maxwell Paulo</p>
          <img src={max} alt="Max img" className={style.ourImg} />

          <div className={style.links}>
            <a
              href="https://github.com/maxwell-paulo"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={github} alt="giticon" />
              </button>
            </a>

            <a
              href="https://www.linkedin.com/in/-maxpaulo/"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={linkedin} alt="linkdinicon" />
              </button>
            </a>
          </div>
        </div>
        <div className={style.creator}>
          <p>Roger Hainz</p>
          <img src={roger} alt="Roger img" className={style.ourImg} />

          <div className={style.links}>
            <a
              href="https://github.com/RHainz"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={github} alt="giticon" />
              </button>
            </a>

            <a
              href="https://www.linkedin.com/in/roger-hainz-210577ba/"
              target="_blank"
              rel="noreferrer"
            >
              <button className={style.btn}>
                <img className={style.img} src={linkedin} alt="linkdinicon" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
