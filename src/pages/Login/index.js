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
