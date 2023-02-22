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
    linkRepo: [],
    description: "",
    gameLogo: "",
    screenShots: [],
  });

  const [screenShots, setScreenShots] = useState({
    screenshots: [],
  })

  const [files, setFiles] = useState("");

  const [files2, setFiles2] = useState("");

  const [screenShotsUp, setScreenShotsUp] = useState([]);

  const [screenShotShow, setScreenShotShow] = useState([]);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/${id}`);
        setForm({...response.data.game});
        setBaseForm(response.data.game);
        console.log(response.data.url)
      } catch (err) {
        console.log(err);
      }
    }
    fetchGame();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    } catch (err) {
      console.log(err);
    }
  }


  function handleDeleteScreenShot(screenShot) {
    let newSceenShoots = form.screenShots.filter((current) => {
      return current !== screenShot
    })
    setForm({...form, screenShots: [...newSceenShoots]})
  }

  function handleToast() {
    toast((t) => (
      <span>
        Would you like to <b>delete</b> this game?
        <div className={style.toastBtns}>
          <button
            className={style.toastDelBtn}
            onClick={() => {
              handleDelete(t);
            }}
          >
            delete
          </button>
          <button
            className={style.toastNoBtn}
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  }

  async function handleDelete(t) {
    try {
      await api.delete(`game/${id}`);
      toast.dismiss(t.id);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={style.pageContainer}>
    <section className={style.pageInfo}>
    <h1 className={style.pageTitle}>Edit Game</h1>

    <form className={style.mainForm} onSubmit={handleSubmit}>

    <label>Title</label>
    <input
            className={style.input}
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
          />

    <label>Genre</label>
    <input
            className={style.input}
            id="type"
            name="type"
            type="text"
            value={form.type}
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

          <label htmlFor="linkDeploy">Deploy's link</label>
          <input
            className={style.input}
            id="linkDeploy"
            name="linkDeploy"
            type="text"
            value={form.linkDeploy}
            onChange={handleChange}
          />

        <label htmlFor="linkRepo ">Repository's link</label>
          <input
            className={style.input}
            id="linkRepo"
            name="linkRepo"
            type="text"
            value={form.linkRepo}
            onChange={handleChange}
          />

<label htmlFor="description ">Description</label>
          <textarea
            className={style.inputTextArea}
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
          />

<label htmlFor="gameLogo">Change Game logo</label>
<input
            id="gameLogo"
            name="gameLogo"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImg}
          />
          

          <div>
            <form className={style.mainForm}>
              <div className={style.ScreenShotForm}>
                <label htmlFor="screenshots">Screenshot </label>
                <input type="file" id="screenshots" onChange={handleImg2} />
                <button className={style.buttonAnima} type="button" onClick={handleUpload2}>
                  + Add
                </button>
              </div>
            </form>
          </div>
          <div className={style.allImages}>
            <label>Screenshots</label>
            {screenShotShow.map((current) => {
              return (
                <>
                  <div>
                    <img src={current} width="80px" alt="Game Screenshot"></img>
                  </div>
                </>
              );
            })}
          </div>

    </form>

    <div className={style.bottomButtons}>
          <button className={style.buttonAnima} type="submit" onClick={handleSubmit}>
            Update
          </button>
          <button className={style.buttonAnima} type="button" onClick={handleToast}>
            Delete
          </button>
</div>

    </section>
    </main>
  );
}
