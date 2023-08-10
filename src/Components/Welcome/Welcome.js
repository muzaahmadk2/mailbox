import { useState,useEffect } from "react";
import ComposeMail from "../ComposeMail/ComposeMail";
import "./Welcome.css";
import { useDispatch } from "react-redux";
import { inboxAction } from "../Store/inboxSlice";
import axios from 'axios';
import { Container,Button } from "react-bootstrap";
import Inbox from "../Inbox/Inbox";


function Welcome() {

  const myEmail = localStorage.getItem('email');
  const dispatch = useDispatch();
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(true);

  const getData = async () => {
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
      });
    }
    console.log(Arr);
    dispatch(inboxAction.addMails(Arr));
  };
  const showComposeHandler = () => {
    setShowCompose(true);
    setShowInbox(false);
  };
  const hideComposeHandler = () => {
    setShowCompose(false);
  };
  const showInboxHandler = async () => {
    setShowInbox(true);
    setShowCompose(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    <div className="welcome">
      <Container>
        <div className="d-flex justify-content-around m-4 ">
          <Button variant="warning" onClick={showComposeHandler}>
            Compose Mail
          </Button>
          <Button variant="danger" onClick={showInboxHandler}>
            Inbox
          </Button>
          <Button variant="success">Sent Items</Button>
        </div>
      </Container>
    </div>
    {showCompose && <ComposeMail hideCompose={hideComposeHandler} />}
    {showInbox && <Inbox />}
    </div>
  );
}

export default Welcome;
