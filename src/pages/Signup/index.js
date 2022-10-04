import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {Formik, Field, Form} from "formik";

export function Signup() {

const navigate=useNavigate();

const [files, setFiles] = useState ("");

function handleImage(e) {
  setFiles(e.target.files[0]);
  console.log(files)
}


async function handleUpload() {
    try {
      console.log(files)
      const uploadData = new FormData();
      uploadData.append("picture", files);
      const response = await api.post("/user/uploadImage", uploadData);
      console.log("ahushuahsuahsuhausuauh", response.data.url);
      return response.data.url;
    
    } catch (error) {
      console.log(error);
    }
}

  async function onSubmit (values, actions){
    console.log("Submit", values)
    const imgURL= handleUpload ();
    console.log("Submit", values)
    
    try {
            const imgURL = await handleUpload();
            console.log("apapapapapapap", imgURL);
            await api.post("/user/signup", { ...values, birthDate:new Date(values.birthdate), avatar:imgURL });
            //navigate("/login");
          } catch (error) {
            console.log(error);
          }
}

return (
  <div>
<Formik 
  onSubmit={onSubmit}
  initialValues={{
    name: "", 
    email: "",
    avatar:"",
    birthdate: "",
    password:""
  }}         
  render={({values})=> (
  <Form>
  <div>
    <label>Nome</label>
    <Field name="name" type="text" placeholder="name"/>
    
    <label>E-mail</label>
    <Field name="email" type="email" placeholder="email"/>

    <label>Birthdate</label>
    <Field name="birthdate" type="date" placeholder="birthdate"/>

    <label>Password</label>
    <Field name="password" type="password" placeholder="password"/>
    </div>
  <button type="submit">botão</button>
  </Form>
  )}
/>
<form>
    <label htmlFor="formImg">Sua foto de perfil:</label>
    <input type="file" id="formImg" onChange={handleImage} />
</form>
</div>
)
}



  

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const imgURL = await handleUpload();
//       await api.post("/user/signup", { ...form, img: imgURL });

//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="formName">Nome:</label>
//       <input
//         id="formName"
//         name="name"
//         type="text"
//         value={form.name}
//         onChange={handleChange}
//       />
//      

//       <label htmlFor="formEmail">E-mail:</label>
//       <input
//         id="formEmail"
//         name="email"
//         type="email"
//         value={form.email}
//         onChange={handleChange}
//       />
//       <label htmlFor="formPassword">Senha:</label>
//       <input
//         id="formPassword"
//         name="password"
//         type="password"
//         value={form.password}
//         onChange={handleChange}
//       />
//       <label htmlFor="formConfirmPassword">Confirmação de senha</label>
//       <input
//         id="formConfirmPassword"
//         type="password"
//         name="confirmPassword"
//         value={form.confirmPassword}
//         onChange={handleChange}
//       />
//       <button type="submit">Cadastrar</button>
//     </form>
//   );
// }



  // async function handleSubmit(e) {
    //     try {
    //       const imgURL = await handleUpload();
    //       await api.post("/user/signup", { ...form, img: imgURL });
    
    //       navigate("/login");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }