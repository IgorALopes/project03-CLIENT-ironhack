import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import style from "./style.module.css";
import toast from "react-hot-toast";

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
      <div className={style.main}>
        <div className={style.ihl}>
          <img
            src="https://www.frontierfireprotection.com/wp-content/uploads/freshizer/730cbf2e2455c64c961be8e18e793f6b_3-Things-a-Fire-Needs-2000-c-90.jpg"
            alt="img"
            width="200"
          ></img>
          <h1>Who are you ?</h1>
          <label>Be a part of community</label>
        </div>

        <div className={style.formikeiro}>
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
                <div className="formFields">
                  <label>Nome</label>
                  <Field
                    name="name"
                    type="text"
                    placeholder={userBefore.name}
                  />

                  <label>E-mail</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder={userBefore.email}
                  />

                  <label>Birthdate: {dudinka} </label>
                  <Field name="birthdate" type="date" />

                  {/* <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        placeholder="password"
                    /> */}
                </div>
                <button type="submit">botão</button>
              </Form>
            )}
          />
          <form>
            <img src={userBefore.avatar} alt="avatar" width="80px" />
            <label htmlFor="formImg">Sua foto de perfil:</label>
            <input type="file" id="formImg" onChange={handleImage} />
          </form>
          <button className={style.deleteBtn} onClick={handleToast}>
            Delete Profile
          </button>
        </div>
      </div>
    </>
  );
}
