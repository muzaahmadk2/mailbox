import React, { useRef, useState } from "react";
import { Button, Form,Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ForgotPass.css";

const ForgotPass = () => {
  const navigate = useNavigate();
  const enteredEmail = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const sendLink = async () => {
    const userEmail = enteredEmail.current.value;
    if (userEmail.length < 6) {
      alert("Please enter the email");
      return;
    }
    setIsLoading(true);
    let url;
        url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCWmOoJbHcAnhEvB304NyRu0StxPKou3YM";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: userEmail,
        }),
        header: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsLoading(false);
            return res.json();
          } else {
            setIsLoading(false);
            return res.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          alert("Link is send successfully!!!")
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  const cancelForgotPassword = () => {
    navigate('/');
  };
    return (
        <div className="resetBackground">
          <div className="resetDiv">
            <h2>Reset Password</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="resetLabel">
                  Enter the email with which you have resgistered
                </Form.Label>
                <Form.Control
                  type="text"
                  className="resetInput"
                  ref={enteredEmail}
                />
              </Form.Group>
              {!isLoading ? <Button
                variant="outline-primary"
                className="resetBtn"
                type="button"
                onClick={sendLink}
              >
                Send Link
              </Button> : <Spinner variant="info" className="resetBtn" animation="border"/> }
              <Button
                variant="outline-danger"
                onClick={cancelForgotPassword}
                type="button"
              >
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      );
    }

export default ForgotPass;