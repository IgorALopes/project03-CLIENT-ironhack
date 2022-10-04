import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {Formik, Form, Field} from "formik";

export function Login() {
  
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  
  async function handleSubmit(valueLogin, actions) {
    
    const password= `${valueLogin.password}`
    const email= `${valueLogin.email}`
    
    try {
      const response = await api.post("/user/login", {password, email});
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (<>

    <div>
        <h1>Welcome, traveler !</h1>
        <label>Take a seat next to this bonfire and rest.</label>
        <label>We wanna cook you</label>
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/086a2a33070905.569eb2709b598.jpg" width="200"></img>

    </div>



    <div>
    <Formik 
      onSubmit={handleSubmit}
      initialValues={{
        name: "", 
        password:""
      }}         
      render={({valueLogin})=> (
      <Form>
      <div>
        
        <label>E-mail</label>
        <Field name="email" type="email" placeholder="email"/>
        
        <label>Password</label>
        <Field name="password" type="password" placeholder="imagem"/>
        
      </div>
      <button type="submit">botão</button>
      </Form>
      )}
    />
    </div>
    </>

  );
}
