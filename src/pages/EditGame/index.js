import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import style from "./style.module.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditGame() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [baseForm, setBaseForm] = useState({});

  const [form, setForm] = useState({
    title: "",
    type: "",
    esrb: "",
    linkDeploy: "",
    linkRepo: "",
    description: "",
    gameLogo: "",
    screenShots: "",
  });

  const [files, setFiles] = useState("");

  const [files2, setFiles2] = useState("");

  const [screenShotsUp, setScreenShotsUp] = useState([]);

  const [screenShotShow, setScreenShotShow] = useState([]);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/${id}`);
        delete response.data._id;
        setForm({ ...response.data });
        setBaseForm(response.data);
        console.log(baseForm);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGame();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  function handleImg(e) {
    setFiles(e.target.files[0]);
  }

  function handleImg2(e) {
    setFiles2(e.target.files[0]);
  }

  async function handleUpload2(e) {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("pictures", files2);
      const response = await api.post("/uploadImage/uploadImage", uploadData);
      screenShotsUp.push(response.data.url);
      setScreenShotShow([...screenShotsUp]);
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("pictures", files);
      const response = await api.post("/uploadImage/uploadImage", uploadData);
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const imgLogoUrl = await handleUpload();
    form.gameLogo = String(imgLogoUrl);
    form.screenShots = [];
    form.screenShots = [...screenShotsUp];
    try {
      const response = await api.put(`/game/${id}`, {
        ...form,
        screenShots: [...screenShotsUp],
      });

      navigate(`/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <section>
        <h1>Editar Game</h1>

        <form onSubmit={handleSubmit}>
          <label>title</label>
          <input
            className={style.inputs}
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
          />

          <label>genge</label>
          <input
            className={style.inputs}
            id="genge"
            name="genge"
            type="text"
            value={form.genge}
            onChange={handleChange}
          />

          <label htlmfor="esrb">ESRB</label>
          <select
            id="esrb"
            name="esrb"
            type="text"
            value={form.esrb}
            onChange={handleChange}
          >
            <option hidden defaultValue>
              Select
            </option>
            <option disabled>ESRB</option>
            <option value="Everyone">Everyone</option>
            <option value="Everyone 10+">Everyone 10+</option>
            <option value="3Teen 13+">Teen 13+</option>
            <option value="Mature 17+">Mature 17+</option>
            <option value="Adults Only 18+">Adults Only 18+</option>
          </select>

          <label htmlFor="linkDeploy">Deploy's link:</label>
          <input
            className={style.inputs}
            id="linkDeploy"
            name="linkDeploy"
            type="text"
            value={form.linkDeploy}
            onChange={handleChange}
          />

          <label htmlFor="linkRepo ">Repository's link:</label>
          <input
            className={style.inputs}
            id="linkRepo"
            name="linkRepo"
            type="text"
            value={form.linkRepo}
            onChange={handleChange}
          />

          <label htmlFor="description ">Description: link:</label>
          <input
            className={style.inputs}
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
          />

          <label htmlFor="gameLogo">Game logo:</label>
          <input
            className={style.inputs}
            id="gameLogo"
            name="gameLogo"
            type="file"
            value={form.gameLogo}
            onChange={handleImg}
          />

          {/* <img src={baseForm.game.gameLogo} alt="img" width="40px" /> */}

          <div>
            <form>
              <label htmlFor="screenshots">Screenshot:</label>
              <input type="file" id="screenshots" onChange={handleImg2} />
              <button type="button" onClick={handleUpload2}>
                Adicionar
              </button>
            </form>
          </div>
          <div>
            <label>All Images</label>
            {screenShotShow.map((current) => {
              return (
                <>
                  <div>
                    <p>{current}</p>
                    <img src={current} width="80px" alt="Game Screenshot"></img>
                  </div>
                </>
              );
            })}
          </div>

          <button className={style.atualizarBtn} type="submit">
            Atualizar
          </button>
        </form>
        {/* <button className={style.deleteBtn} type="button" onClick={handleToast}>
          Delete
        </button> */}
      </section>
    </main>
  );
}
