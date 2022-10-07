import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import style from "./style.module.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditReview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    graphics: 1,
    soundEffects: 1,
    playability: 1,
    fun: 1,
    replayability: 1,
    userEvaluation: "",
  });

  const [rates, setRates] = useState({
    graphics: 1,
    soundEffects: 1,
    playability: 1,
    fun: 1,
    replayability: 1,
    userEvaluation: "",
  });

  useEffect(() => {
    async function fetchReview() {
      try {
        const response = await api.get(`/review/${id}`);
        delete response.data._id;
        setForm({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchReview();
  }, []);

  function handleChangeRates(e) {
    setRates({ ...rates, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const evaluationStr = rates.userEvaluation;
    const sendReview = { rates: {}, userEvaluation: "" };
    for (let objetos in rates) {
      rates[objetos] = Number(rates[objetos]);
    }
    Object.assign(sendReview.rates, rates);
    sendReview.userEvaluation = evaluationStr;
    delete sendReview.rates.userEvaluation;
    try {
      const response = await api.put(`/review/${id}`, sendReview);

      navigate(`/${response.data.game}`);

      console.log(response);
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
        <h1>Editar review</h1>
        <form onSubmit={handleSubmit}>
          <label>Rates:</label>
          <label htlmfor="graphics">graphics:</label>
          <select
            id="graphics"
            name="graphics"
            type="number"
            value={rates.graphics}
            onChange={handleChangeRates}
          >
            <option hidden defaultValue>
              Select
            </option>
            <option disabled>graphics</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label htlmfor="soundEffects">soundEffects:</label>
          <select
            id="soundEffects"
            name="soundEffects"
            type="number"
            value={rates.soundEffects}
            onChange={handleChangeRates}
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

          <label htlmfor="playability">Game play:</label>
          <select
            id="playability"
            name="playability"
            type="number"
            value={rates.playability}
            onChange={handleChangeRates}
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

          <label htlmfor="fun">fun:</label>
          <select
            id="fun"
            name="fun"
            type="number"
            value={rates.fun}
            onChange={handleChangeRates}
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

          <label htlmfor="replayability">replayability:</label>
          <select
            id="replayability"
            name="replayability"
            type="number"
            value={rates.replayability}
            onChange={handleChangeRates}
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

          <label htmlFor="userEvaluation">Comente:</label>
          <input
            className={style.inputs}
            id="userEvaluation"
            name="userEvaluation"
            type="text"
            value={rates.userEvaluation}
            onChange={handleChangeRates}
          />
          <button className={style.atualizarBtn} type="submit">
            Atualizar
          </button>
        </form>
        <button className={style.deleteBtn} type="button" onClick={handleToast}>
          Delete
        </button>
      </section>
    </main>
  );
}
