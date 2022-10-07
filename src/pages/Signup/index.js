import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import style from "./style.module.css";

export function Signup() {
  const navigate = useNavigate();

  const [files, setFiles] = useState("");

  function handleImage(e) {
    setFiles(e.target.files[0]);
    console.log(files);
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

  async function onSubmit(values, actions) {
    try {
      const imgURL = await handleUpload();
      await api.post("/user/signup", {
        ...values,
        birthDate: new Date(values.birthdate),
        avatar: imgURL,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={style.container}>
        {/* <img
            src="https://www.frontierfireprotection.com/wp-content/uploads/freshizer/730cbf2e2455c64c961be8e18e793f6b_3-Things-a-Fire-Needs-2000-c-90.jpg"
            alt="img"
            width="200"
          ></img> */}
        <h1 className={style.h1}>Create new Chef or Taster</h1>

        <div className={style.formik}>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              email: "",
              avatar: "",
              birthdate: "",
              password: "",
            }}
            render={({ values }) => (
              <Form>
                <div className={style.form}>
                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <label>Name: </label>
                      <Field name="name" type="text" placeholder="name" />
                    </div>

                    <div className={style.formField}>
                      <label>E-mail: </label>
                      <Field name="email" type="email" placeholder="email" />
                    </div>
                  </div>

                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <label>Birthdate: </label>
                      <Field
                        name="birthdate"
                        type="date"
                        placeholder="birthdate"
                      />
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

                  <div className={style.formField}>
                    <form>
                      <label htmlFor="formImg">Profile picture: </label>
                      <input type="file" id="formImg" onChange={handleImage} />
                    </form>
                  </div>

                  <button type="submit" className={style.button}>
                    <spam className={style.anima}>CREATE USER</spam>
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
