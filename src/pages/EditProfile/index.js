import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import style from "./style.module.css";
import toast from "react-hot-toast";
import graphImg from "../../images/GameTastingLOGO-geometric-BK.png";

export function EditProfile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [userBefore, setBefore] = useState({});
  const [files, setFiles] = useState("");
  const [dudinka, setDudinka] = useState("");
  const [go, setGo] = useState(false);

  useEffect(() => {
    async function userBefore2() {
      try {
        const response = await api.get(`/user/profile`);
        delete response.data._id;
        setBefore(response.data);
        console.log(response.data);
        console.log(userBefore);
      } catch (err) {
        console.log(err);
      }
    }
    userBefore2();
  }, []);

  useEffect(() => {
    let date = userBefore.birthDate;
    if (date) {
      setDudinka(date.split("T")[0]);
    }
    if (dudinka !== "") {
      let reverse = dudinka.split("-").reverse().join("/");
      setDudinka(reverse);
      console.log(dudinka);
    }
  }, [userBefore]);

  // useEffect(()=>{
  //     if (userBefore.birthDate) {
  //     setDudinka(userBefore.birthDate.split("T")[0])
  //     }
  //     console.log(dudinka)
  // },[userBefore])

  // useEffect(() => {
  //     async function fetchGame() {
  //       try {
  //         const response = await api.get(`/game/${id}`);
  //         setGame(response.data.game);
  //         setAllReviews(response.data.reviewsPop);
  //         //console.log("asasasasasasasasasadedede", response.data.reviewsPop, allReviews)
  //         } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchGame();
  //   }, [id]);

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
    for (let objetos in values) {
      console.log(userBefore[objetos]);
      if (values[objetos] === "") {
        values[objetos] = userBefore[objetos];
      }
    }
    console.log(values);

    try {
      const imgURL = await handleUpload();
      await api.put(`/user/${id}`, {
        ...values,
        birthDate: new Date(values.birthdate),
        avatar: imgURL,
      });
      //navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSure(t) {
    toast((t) => (
      <span>
        Really Sure ? You will lost all receipes and wonderfull dishes !
        <div className={style.toastBtns}>
          <button
            className={style.toastDelBtn}
            onClick={() => {
              handleDelete(t);
            }}
          >
            Delete Profile For Sure;
          </button>
          <button
            className={style.toastNoBtn}
            onClick={() => toast.dismiss(t.id)}
          >
            No. I change my mind.
          </button>
        </div>
      </span>
    ));
  }

  function handleToast() {
    toast((t) => (
      <span>
        Would you like to <b>delete</b> this profile?
        <div className={style.toastBtns}>
          <button
            className={style.toastDelBtn}
            onClick={() => {
              handleDeleteSure(t);
            }}
          >
            Delete Profile
          </button>
          <button
            className={style.toastNoBtn}
            onClick={() => toast.dismiss(t.id)}
          >
            No. Sorry for that.
          </button>
        </div>
      </span>
    ));
  }

  async function handleDelete(t) {
    try {
      await api.delete(`user/${id}`);
      toast.dismiss(t.id);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
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

        <h1 className={style.h1}>Edit your profile</h1>

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
              name: "",
              email: "",
              avatar: "",
              birthDate: "",
              // password: "",
            }}
            render={({ values }) => (
              <Form>
                <div className={style.form}>
                  <div className={style.formBlock}>
                    <div className={style.formField}>
                      <label>Name:</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder={userBefore.name}
                      />
                    </div>

                    <div className={style.formField}>
                      <label>Email:</label>
                      <Field
                        name="email"
                        type="email"
                        placeholder={userBefore.email}
                      />
                    </div>

                    <div className={style.formField}>
                      <label>Birthdate: </label>
                      <Field name="birthdate" type="date" />{" "}
                    </div>
                  </div>
                  <button type="submit" className={style.button}>
                    <spam className={style.anima}>EDIT PROFILE</spam>
                  </button>
                  <form>
                    <img src={userBefore.avatar} alt="avatar" width="80px" />
                    <label htmlFor="formImg">Profile Picture</label>
                    <input type="file" id="formImg" onChange={handleImage} />
                  </form>
                  <button className={style.button} onClick={handleToast}>
                    <spam className={style.anima}>DELETE PROFILE</spam>
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
