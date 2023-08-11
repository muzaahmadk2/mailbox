import { useState, useEffect } from "react";
import ComposeMail from "../ComposeMail/ComposeMail";
import "./Welcome.css";
import { useDispatch, useSelector } from "react-redux";
import { inboxAction } from "../Store/inboxSlice";
import axios from "axios";
import { Container, Button, Badge } from "react-bootstrap";
import Inbox from "../Inbox/Inbox";
import Sentbox from "../Inbox/Sentbox";

function Welcome() {
  const myEmail = localStorage.getItem("email");
  const dispatch = useDispatch();
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const noOfUnreadMessages = useSelector(
    (state) => state.inbox.noOfUnreadMessages
  );
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
        to:res.data[key].to,
      });
        
    }
    console.log(Arr)
    dispatch(inboxAction.addSentMails(Arr));
  }

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
    setShowSent(false);
  };
  const hideComposeHandler = () => {
    setShowCompose(false);
    setShowInbox(true);
  };
  const showInboxHandler =  () => {
    setShowInbox(true);
    setShowCompose(false);
    setShowSent(false);
  };
  const showSentHandler = () => {
    setShowSent(true);
    setShowCompose(false);
    setShowInbox(false);
  }
  useEffect(() => {
    getData();
    getSentData();
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
              Inbox<Badge className="py-2 mx-1" bg="secondary" >{noOfUnreadMessages}</Badge>
            </Button>
            <Button variant="success" onClick={showSentHandler}>Sent Items</Button>
          </div>
        </div>
        <div className="content">
          {showCompose && <ComposeMail hideCompose={hideComposeHandler} />}
          {showInbox && <Inbox getData={getData} />}
          {showSent && <Sentbox />}
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
