import { useEffect, useState, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";
import style from "./style.module.css";

export function CreateGame() {
  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext);

  console.log(loggedInUser);

  const [files, setFiles] = useState("");
  const [files2, setFiles2] = useState("");
  const [screenshotsUp, setScreen] = useState([]);
  const [screenshotsShow, setSShow] = useState([]);

  function handleImage(e) {
    setFiles(e.target.files[0]);
  }

  function handleImage2(e) {
    setFiles2(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("pictures", files);
      const response = await api.post("/uploadImage/uploadImage", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload2(e) {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("pictures", files2);
      const response = await api.post("/uploadImage/uploadImage", uploadData);
      screenshotsUp.push(response.data.url);
      setSShow([...screenshotsUp]);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(valuesGame, actions) {
    const imgLogoURL = await handleUpload();

    valuesGame.gameLogo = String(imgLogoURL);
    valuesGame.screenshots = [...screenshotsUp];

    try {
      const response = await api.post("/game/new-game", {
        ...valuesGame,
        screenShots: [...screenshotsUp],
      });
      navigate(`/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }

    return;
  }

  return (
    <>
      <div className={style.container}>
        <img
          style={{ width: "15px" }}
          src={graphImg}
          alt="Graphism"
          className={style.img}
        />

        <h1 className={style.h1}>Cook New Game</h1>

        <img
          style={{ width: "15px" }}
          src={graphImg}
          alt="Graphism"
          className={style.img}
        />

        <div className={style.formik}>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              title: "",
              type: "",
              esrb: "",
              linkDeploy: "",
              linkRepo: "",
              description: "",
              gameLogo: "",
              screenshots: [],
            }}
            render={({ valuesGame }) => (
              <Form>
                <div className={style.form}>
                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <label>Title: </label>
                      <Field name="title" type="text" placeholder="title" />
                    </div>

                    <div className={style.formField}>
                      <label>Genre: </label>
                      <Field name="type" type="text" placeholder="genre" />
                    </div>
                  </div>

                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <p>Entertainment Software Rating Board: </p>
                      <div className={style.esrb}>
                        <Field name="esrb" type="radio" value="Everyone" />
                        <label>Everyone</label>

                        <Field name="esrb" type="radio" value="Everyone 10+" />
                        <label>Everyone 10+</label>

                        <Field name="esrb" type="radio" value="Teen 13+" />
                        <label>Teen 13+</label>

                        <Field name="esrb" type="radio" value="Mature 17+" />
                        <label>Mature 17+</label>

                        <Field
                          name="esrb"
                          type="radio"
                          value="Adults Only 18+"
                        />
                        <label>Adults Only 18+</label>
                      </div>
                    </div>
                  </div>

                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <label>Deploy's Link: </label>
                      <Field
                        name="linkDeploy"
                        type="string"
                        placeholder="deploy's url"
                      />
                    </div>

                    <div className={style.formField}>
                      <label>Repository's Link: </label>
                      <Field
                        name="linkRepo"
                        type="string"
                        placeholder="repository's url"
                      />
                    </div>

                    <div className={style.formField}>
                      <label>Description: </label>
                      <Field
                        as="textarea"
                        name="description"
                        type="text"
                        placeholder="description"
                      />{" "}
                    </div>
                  </div>

                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <form>
                        <label htmlFor="gameLogo">Logo:</label>
                        <input
                          type="file"
                          id="gameLogo"
                          onChange={handleImage}
                        />
                      </form>
                    </div>

                    <div className={style.screenShots}>
                      <form>
                        <label htmlFor="screenshots">Screenshot:</label>
                        <input
                          type="file"
                          id="screenshots"
                          onChange={handleImage2}
                        />
                        <button type="button" onClick={handleUpload2}>
                          ADD
                        </button>
                      </form>
                    </div>
                  </div>

                  <img
                    style={{ width: "15px" }}
                    src={graphImg}
                    alt="Graphism"
                    className={style.img}
                  />

                  <label>All Images</label>

                  <img
                    style={{ width: "15px" }}
                    src={graphImg}
                    alt="Graphism"
                    className={style.img}
                  />

                  <div className={style.formBlock}>
                    {screenshotsShow.map((current) => {
                      return (
                        <>
                          <div>
                            <p>{current}</p>
                            <img
                              src={current}
                              width="80px"
                              alt="Game Screenshot"
                            ></img>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <img
                    style={{ width: "15px" }}
                    src={graphImg}
                    alt="Graphism"
                    className={style.img}
                  />

                  <button type="submit" className={style.button}>
                    <spam className={style.anima}>CREATE GAME</spam>
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </>
  );
}
