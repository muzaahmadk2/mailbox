import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import classes from './AuthForm.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../Store/authSlice";

function AuthForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const switchLogin = () => {
    setLogin((prev) => {
      return !prev;
    });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    if (enteredPass.length < 6) {
      return alert("Password must contain 6 digits");
    } else if (!login && enteredPass !== confirmPasswordRef.current.value) {
      return alert("Password doesn't match");
    } else {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWmOoJbHcAnhEvB304NyRu0StxPKou3YM";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWmOoJbHcAnhEvB304NyRu0StxPKou3YM";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true,
        }),
        header: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("user signed up");
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
            dispatch(authAction.login({token: data.idToken, email: enteredEmail}))
          emailRef.current.value = "";
          passwordRef.current.value = "";
          if (!login) {
            confirmPasswordRef.current.value = "";
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const forgotPasswordHandler = () => {
    navigate('/forgotpass');
  }
  return (
    <div>
    <img
      src={require("./blue.jpg")}
      alt="img"
      className={classes.backgroundDiv}
    />
    <div className={`m-md-5 text-center ${classes.authbox}`}>
      <Container className={` ${classes.container}`}>
        <h3 className={classes.login}>{!login ? "Sign Up" : "Login"}</h3>
        <Form>
          <Form.Group className="mb-3  mt-4">
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              style={{
                backgroundColor: !login ? "" : "black",
                color: !login ? "" : "white",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordRef}
              style={{
                backgroundColor: !login ? "" : "black",
                color: !login ? "" : "white",
              }}
            />
          </Form.Group>
          {!login && (
            <Form.Group className="mb-3 ">
              <Form.Control
                type="password"
                placeholder=" Confirm Password"
                ref={confirmPasswordRef}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={loginHandler}
            className={classes.sign}
          >
            {!login ? "SignUp" : "Login"}
          </Button>
          {"  "}
          {login && <div className={classes.forgotPass}>
              <Button variant="link" onClick={forgotPasswordHandler}>
                Forgot password?
              </Button>
            </div>}
        </Form>
      </Container>
      <section type='button' onClick={switchLogin} className={classes.section}>
      
            {!login ? "Have an account ? Login" : " New user ? SignUp"}
    
      </section>
    </div>
    </div>
  );
}

export default AuthForm;