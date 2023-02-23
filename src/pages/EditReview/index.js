import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import style from "./style.module.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";

export function EditReview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    graphics: 0,
      soundEffects: 0,
      playability: 0,
      fun: 0,
      replayability: 0,
    userEvaluation: "",
  }); 

  useEffect(() => {
    async function fetchReview() {
      try {
        const response = await api.get(`/review/${id}`);
        delete response.data._id;
        setForm({ ...response.data });
        console.log(form)
      } catch (err) {
        console.log(err);
      }
    }
    fetchReview();
  }, []);

  function handleChangeform(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
       await api.put(`/review/${id}`, form);

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  function handleToast() {
    toast((t) => (
      <span>
        Would you like to <b>delete</b> this review?
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
      await api.delete(`review/${id}`);
      toast.dismiss(t.id);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <section>
        <div className={style.container}>
          <img
            style={{ width: "15px" }}
            src={graphImg}
            alt="Graphism"
            className={style.img}
          />

          <h1 className={style.h1}>Edit review</h1>

          <img
            style={{ width: "15px" }}
            src={graphImg}
            alt="Graphism"
            className={style.img}
          />

          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formBlock}>
              <div className={style.formField}>
                <label htlmfor="graphics">graphics:</label>
                <select
                  id="graphics"
                  name="graphics"
                  type="number"
                  value={form.graphics}
                  onChange={handleChangeform}
                >
                  <option disabled>graphics</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={style.formField}>
                <label htlmfor="soundEffects">soundEffects:</label>
                <select
                  id="soundEffects"
                  name="soundEffects"
                  type="number"
                  value={form.soundEffects}
                  onChange={handleChangeform}
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  <option disabled>soundEffects</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={style.formField}>
                <label htlmfor="playability">Game play:</label>
                <select
                  id="playability"
                  name="playability"
                  type="number"
                  value={form.playability}
                  onChange={handleChangeform}
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  <option disabled>Game play</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={style.formField}>
                <label htlmfor="fun">fun:</label>
                <select
                  id="fun"
                  name="fun"
                  type="number"
                  value={form.fun}
                  onChange={handleChangeform}
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  <option disabled>fun</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={style.formField}>
                <label htlmfor="replayability">replayability:</label>
                <select
                  id="replayability"
                  name="replayability"
                  type="number"
                  value={form.replayability}
                  onChange={handleChangeform}
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  <option disabled>replayability</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className={style.formField}>
              <label htmlFor="userEvaluation">Review: </label>
              <textarea
                className={style.inputs}
                id="userEvaluation"
                name="userEvaluation"
                type="text"
                value={form.userEvaluation}
                onChange={handleChangeform}
                style={{ width: "100%" }}
              />
            </div>

            <div className={style.formBlock}>
              <button className={style.button} type="submit">
                <spam className={style.anima}>ATT REVIEW</spam>
              </button>
              <button
                className={style.button}
                type="button"
                onClick={handleToast}
              >
                <spam className={style.anima}>DELETE REVIEW</spam>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
