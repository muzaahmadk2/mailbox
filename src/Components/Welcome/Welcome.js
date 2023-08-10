import { useState, useEffect } from "react";
import ComposeMail from "../ComposeMail/ComposeMail";
import "./Welcome.css";
import { useDispatch, useSelector } from "react-redux";
import { inboxAction } from "../Store/inboxSlice";
import axios from "axios";
import { Container, Button, Badge } from "react-bootstrap";
import Inbox from "../Inbox/Inbox";

function Welcome() {
  const myEmail = localStorage.getItem("email");
  const dispatch = useDispatch();
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(true);
  const noOfUnreadMessages = useSelector(
    (state) => state.inbox.noOfUnreadMessages
  );

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
      if (res.data[key].read === false) {
        count += 1;
      }
    }
    console.log(Arr);
    dispatch(inboxAction.addMails({ inbox: Arr, no: count }));
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
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="welcome">
      <Container className="d-flex">
        <div className="sidebar">
          <div className="d-flex flex-column">
            <Button variant="warning" onClick={showComposeHandler}>
              Compose Mail
            </Button>
            <Button variant="danger" onClick={showInboxHandler}>
              Inbox<Badge className="py-2 mx-1" >{noOfUnreadMessages}</Badge>
            </Button>
            <Button variant="success">Sent Items</Button>
          </div>
        </div>
        <div className="content">
          {showCompose && <ComposeMail hideCompose={hideComposeHandler} />}
          {showInbox && <Inbox />}
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
