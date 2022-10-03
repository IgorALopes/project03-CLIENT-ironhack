import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {Formik, Field, Form} from "formik";

let img="";

export function Signup() {

function onSubmit (values, actions){
    let img="img:"+`${values.picture}`
    console.log("langolier", img)
    const imgURL= handleUpload ();
    console.log("langolier", img)
  
    console.log("Submit", values)
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);
      
      const response = await api.post("/user/signup", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  // async function handleSubmit(e) {
    //     try {
    //       const imgURL = await handleUpload();
    //       await api.post("/user/signup", { ...form, img: imgURL });
    
    //       navigate("/login");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }


return (
  <div>
<Formik 
  onSubmit={onSubmit}
  initialValues={{
    name: "", 
    email: "",
    avatar:"",
  }}         
  render={({values})=> (
  <Form>
  <div>
    <label>Nome</label> {values.name}
    <Field name="name" type="text" placeholder="name"/>
    
    <label>E-mail</label>
    <Field name="email" type="email" placeholder="email"/>

    <label>Imagem</label>
    <Field name="avatar" type="file" placeholder="imagem"/>
    
  </div>
  <button type="submit">botão</button>
  </Form>
  )}
/>
</div>
)
}

//   function handleImage(e) {
//     setImg(e.target.files[0]);
//   }



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
//       <label htmlFor="formImg">Sua foto de perfil:</label>
//       <input type="file" id="formImg" onChange={handleImage} />

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
