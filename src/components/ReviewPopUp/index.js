import React, { useState } from "react";
import { api } from "../../api/api";
import style from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";

export function ReviewPopUp() {
  const navigate = useNavigate();
  const { id } = useParams()

  const [form, setForm] = useState({
    graphics: 0,
      soundEffects: 0,
      playability: 0,
      fun: 0,
      replayability: 0,
    userEvaluation: "",
  }); 

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

 async function handleSubmit(e) {
    e.preventDefault()

    try {
const response = await api.post(`/review/${id}`, form) 

navigate(0)
    } catch(e) {
console.log(e)
    }
  }

  function handleCancel() {
    navigate(0)
  }

  return (
    <>

<div className={style.container}>
<h1 className={style.h1}>Create new Review</h1>
<img 
  style={{width: "15px"}}
  src={graphImg}
  alt="Graphism"
  className={style.img}
/>
</div>
<form onSubmit={handleSubmit}>
<div className={style.form}>

<div className={style.formBlock}>

<div className={style.formField}>

<label htmlFor="graphics" >Graphics</label>
<div>
<input id="graphics" name="graphics" type="radio" value="1" onChange={handleChange} required />
<input id="graphics" name="graphics" type="radio" value="2" onChange={handleChange} required />
<input id="graphics" name="graphics" type="radio" value="3" onChange={handleChange} required />
<input id="graphics" name="graphics" type="radio" value="4" onChange={handleChange} required />
<input id="graphics" name="graphics" type="radio" value="5" onChange={handleChange} required />
</div>
<div className={style.ratesValue}>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>

</div>

<div className={style.formField}>
<label htmlFor="soundEffects">SoundEffects</label>
<div>
<input id="soundEffects" name="soundEffects" type="radio" value="1" onChange={handleChange} required />
<input id="soundEffects" name="soundEffects" type="radio" value="2" onChange={handleChange} required />
<input id="soundEffects" name="soundEffects" type="radio" value="3" onChange={handleChange} required />
<input id="soundEffects" name="soundEffects" type="radio" value="4" onChange={handleChange} required />
<input id="soundEffects" name="soundEffects" type="radio" value="5" onChange={handleChange} required />
</div>
<div className={style.ratesValue}>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>

</div>

<div className={style.formField}>
<label htmlFor="playability">Gameplay</label>
<div>
<input id="playability" name="playability" type="radio" value="1" onChange={handleChange} required />
<input id="playability" name="playability" type="radio" value="2" onChange={handleChange} required />
<input id="playability" name="playability" type="radio" value="3" onChange={handleChange} required />
<input id="playability" name="playability" type="radio" value="4" onChange={handleChange} required />
<input id="playability" name="playability" type="radio" value="5" onChange={handleChange} required />
</div>
<div className={style.ratesValue}>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>

</div>

<div className={style.formField}>
<label htmlFor="fun">Fun</label>
<div>
<input id="fun" name="fun" type="radio" value="1" onChange={handleChange} required />
<input id="fun" name="fun" type="radio" value="2" onChange={handleChange} required />
<input id="fun" name="fun" type="radio" value="3" onChange={handleChange} required />
<input id="fun" name="fun" type="radio" value="4" onChange={handleChange} required />
<input id="fun" name="fun" type="radio" value="5" onChange={handleChange} required />
</div>
<div className={style.ratesValue}>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>

</div>

<div className={style.formField}>
<label htmlFor="replayability">Replayability</label>
<div>
<input id="replayability" name="replayability" type="radio" value="1" onChange={handleChange} required />
<input id="replayability" name="replayability" type="radio" value="2" onChange={handleChange} required />
<input id="replayability" name="replayability" type="radio" value="3" onChange={handleChange} required />
<input id="replayability" name="replayability" type="radio" value="4" onChange={handleChange} required />
<input id="replayability" name="replayability" type="radio" value="5" onChange={handleChange} required />
</div>
<div className={style.ratesValue}>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>

</div>

</div>

<div className={style.formBlock}>

<div className={style.formField}>

<input id="userEvaluation" name="userEvaluation" type="text" value={form.userEvaluation} placeholder="Make your review" onChange={handleChange} required />

</div>

</div>

<div className={style.buttonsBlock}>
                    <button type="submit" className={style.button}>
                      <spam className={style.anima}>CREATE REVIEW</spam>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className={style.button}
                    >
                      <spam className={style.anima}>CANCEL</spam>
                    </button>
                  </div>

</div>


</form>

    </>
  )
}
