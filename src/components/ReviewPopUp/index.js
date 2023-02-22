import React from "react";
import { Formik, Form, Field } from "formik";
import { api } from "../../api/api";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";

export function ReviewPopUp(props) {
  const navigate = useNavigate();
  //console.log(props.id)

  async function onSubmit(valueReview, actions) {
    const reviewStr = valueReview.userEvaluation;
    const reviewValues = { graphics: 0, soundEffects: 0, playability: 0, fun: 0, replayability: 0, userEvaluation: "" };
    for (let objetos in valueReview) {
      valueReview[objetos] = Number(valueReview[objetos]);
    }
    Object.assign(reviewValues.rates, valueReview);
    reviewValues.userEvaluation = reviewStr;
    delete reviewValues.rates.userEvaluation;
    console.log(reviewValues);

    try {
      const response = await api.post(`/review/${props.id}`, {
        ...reviewValues,
      });
      navigate(0);
      props.setTrigging(false);
    } catch (error) {
      console.log(error);
    }
    return console.log("oi");
  }

  async function handleCancel() {
    navigate(0);
    props.setTrigging(false);
  }

  return props.trigger ? (
    <>
      <div className={style.container}>
        <h1 className={style.h1}>Create new Review</h1>

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
              graphics: 1,
              soundEffects: 1,
              playability: 1,
              fun: 1,
              replayability: 1,
              userEvaluation: "",
            }}
            render={({ valueReview }) => (
              <Form>
                <div className={style.form}>
                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <p>Graphics</p>
                      <div>
                        <Field name="graphics" type="radio" value="1" />
                        <Field name="graphics" type="radio" value="2" />
                        <Field name="graphics" type="radio" value="3" />
                        <Field name="graphics" type="radio" value="4" />
                        <Field name="graphics" type="radio" value="5" />
                      </div>
                    </div>
                    <div className={style.formField}>
                      <p>Sound Effects</p>
                      <div>
                        <Field name="soundEffects" type="radio" value="1" />
                        <Field name="soundEffects" type="radio" value="2" />
                        <Field name="soundEffects" type="radio" value="3" />
                        <Field name="soundEffects" type="radio" value="4" />
                        <Field name="soundEffects" type="radio" value="5" />
                      </div>
                    </div>
                    <div className={style.formField}>
                      <p>Gameplay</p>
                      <div>
                        <Field name="playability" type="radio" value="1" />
                        <Field name="playability" type="radio" value="2" />
                        <Field name="playability" type="radio" value="3" />
                        <Field name="playability" type="radio" value="4" />
                        <Field name="playability" type="radio" value="5" />
                      </div>
                    </div>
                    <div className={style.formField}>
                      <p>Fun</p>
                      <div>
                        <Field name="fun" type="radio" value="1" />
                        <Field name="fun" type="radio" value="2" />
                        <Field name="fun" type="radio" value="3" />
                        <Field name="fun" type="radio" value="4" />
                        <Field name="fun" type="radio" value="5" />
                      </div>
                    </div>
                    <div className={style.formField}>
                      <p>Replayability</p>
                      <div>
                        <Field name="replayability" type="radio" value="1" />
                        <Field name="replayability" type="radio" value="2" />
                        <Field name="replayability" type="radio" value="3" />
                        <Field name="replayability" type="radio" value="4" />
                        <Field name="replayability" type="radio" value="5" />
                      </div>
                    </div>
                  </div>
                  <div className={style.formField}>
                    <Field
                      as="textarea"
                      name="userEvaluation"
                      type="string"
                      placeholder="review"
                    />
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
              </Form>
            )}
          />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
