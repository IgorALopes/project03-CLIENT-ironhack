import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import style from "./style.module.css";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";

export function Login() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  async function handleSubmit(valueLogin, actions) {
    const password = `${valueLogin.password}`;
    const email = `${valueLogin.email}`;

    try {
      const response = await api.post("/user/login", { password, email });
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.container}>
      <img
        style={{ width: "15px" }}
        src={graphImg}
        alt="Graphism"
        className={style.img}
      />

      <h1 className={style.h1}>Welcome!</h1>

      <img
        style={{ width: "15px" }}
        src={graphImg}
        alt="Graphism"
        className={style.img}
      />

      <p className={style.p}>
        Take a seat next to the bonfire and taste some games.
      </p>
      {/* <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/086a2a33070905.569eb2709b598.jpg"
          width="200"
          alt="img"
        ></img> */}

      <div className={style.formik}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            password: "",
          }}
          render={({ valueLogin }) => (
            <Form>
              <div className={style.form}>
                <div className={style.formBlock}>
                  <div className={style.formField}>
                    <label>Email: </label>
                    <Field name="email" type="email" placeholder="email" />
                  </div>

                  <div className={style.formField}>
                    <label>Password: </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                </div>

                <button type="submit" className={style.button}>
                  <span className={style.anima}>LOGIN</span>
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
}
