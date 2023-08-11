import React from "react";
import "./ComposeMail.css";
import { Form, Button, Card } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { useRef, useState, useMemo } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { inboxAction } from "../Store/inboxSlice";
import axios from 'axios';

const ComposeMail = (props) => {
    const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const receiverEmailRef = useRef();
  const subjectRef = useRef();
  const myEmail = localStorage.getItem('email');

  const getData = async () => {
    let count = 0;
    const res = await axios.get(
      `https://mailbox-1d216-default-rtdb.firebaseio.com/${myEmail}.json`
    );

    let Arr = [];
    for (const key in res.data) {
      Arr.push({
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        from: res.data[key].from,
        date: res.data[key].sentAt,
        read: res.data[key].read,
      });
      if(res.data[key].read === false){
        count += 1;
      }
    }
    console.log(Arr);
    dispatch(inboxAction.addMails({inbox: Arr, no: count}));
  };
  const getSentData = async () => {
    const res = await axios.get(`https://mailbox-1d216-default-rtdb.firebaseio.com/sentbox/${myEmail}.json`);
    let Arr = [];
    for(const key in res.data){
      Arr.push({
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        from: res.data[key].from,
        date: res.data[key].sentAt,
        read: res.data[key].read,
        to: res.data[key].to,
      });
        
    }
    console.log(Arr)
    dispatch(inboxAction.addSentMails(Arr));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const receiverEmail = receiverEmailRef.current.value;
    const receiverValidEmail = receiverEmail.replace("@", "").replace(".", "");
    const subject = subjectRef.current.value;
    const body = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
    const email = {
      from: localStorage.getItem("email"),
      to: receiverEmail,
      sub: subject,
      emailBody: body,
      sentAt: new Date().toLocaleString(),
      read: false,
    };
    try {
      const Email = JSON.stringify(email);
      await axios.post(
        `https://mailbox-1d216-default-rtdb.firebaseio.com/sentbox/${myEmail}.json`,
        Email
      );

      const res = await fetch(
        `https://mailbox-1d216-default-rtdb.firebaseio.com/${receiverValidEmail}.json`,
        {
          method: "POST",
          body: Email,
          header: {
            "Content-Type": "application/json",
          },
        }
      ); 
    } catch (Error) {
        alert (Error);
    }
    alert("E-mail sent successfully!!");
    receiverEmailRef.current.value= '';
    subjectRef.current.value = '';
    setEditorState(null);
    getData();
    getSentData();
  };

  const hideHandler = () => {
    props.hideCompose();
  }
  return (
    <>
      <div className="container">
        <Form className="forms" onSubmit={submitHandler}>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close "
              aria-label="Close"
              onClick={hideHandler}
            ></button>
          </div>
          <Form.Group className="mt-4 mb-2">
            <Form.Label>To,</Form.Label>
            <Form.Control
              type="email"
              placeholder="Recipients Email"
              required
              ref={receiverEmailRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject :-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject Line"
              required
              ref={subjectRef}
            />
          </Form.Group>
          <Card className="mt-4" style={{ height: "auto" }}>
            <Card.Body>
              <Editor
                placeholder="Start Composing from Here"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Card.Body>
          </Card>
          <Button type="submit" className="mt-2">
            Send Mail
          </Button>
        </Form>
      </div>
    </>
  );
};
export default ComposeMail;
