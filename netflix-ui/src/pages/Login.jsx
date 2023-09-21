import React,{useState} from "react";

import Background from "../components/Background";
import styled from "styled-components";
import Header from "../components/Header";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logedIn } from "../store";
import axios from "axios";

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleLogIn=async()=>{
    try{
      const {email, password}=formValue;
      const response=await axios({
        method: "POST",
        data: {
          username: email,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:4000/login",
      })
      if (response.status === 200) {
        navigate('/');
        dispatch(logedIn());
        console.log("Login successful. Navigating to /");
      } else {
        console.log("Login unsuccessful.");
      }
    }catch(err){
      console.log(err);
    }
  };
 
  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
      gap: 2rem;
      height: 85vh;
      .form{
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: while;
        .container{
          gap: 2rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;
  
          }
          button{
            padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;

