import React, { useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import Background from "../components/Background";
import styled from "styled-components";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const navigate=useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });


  const handleSignIn=async()=>{
    try{
      const {email, password}=formValue;
      await axios({
        method: "POST",
        data: {
          username: email,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:4000/register",
      }).then((res) => {
        console.log(res)
        navigate("/");
      });
      //await createUserWithEmailAndPassword(firebaseAuth,email,password);

    }catch(err){
      console.log(err);
    }
  };

  // onAuthStateChanged(firebaseAuth,(currentUser)=>{
  //   if(currentUser){
  //     navigate("/");
  //   }
  // })
  return (
    <Container>
      <Background />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere, Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, [e.target.name]: e.target.value })
              }
            />
            {showPass && (
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
            )}
            {!showPass && (
              <button onClick={() => setShowPass(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPass }) =>
          showPass ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
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
`;

export default SignUp;
