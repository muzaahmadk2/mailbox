import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { inboxAction } from "../Store/inboxSlice";

function InboxMail() {
  const { mailid } = useParams();
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inboxArr);
  const mail = inbox.find((email) => email.id === mailid);
  const myemail = localStorage.getItem('email');

  if (mail.read === false) {
    dispatch(inboxAction.messageRead());
    try {
      const res = fetch(
        `https://mailbox-1d216-default-rtdb.firebaseio.com/${myemail}/${mailid}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: true,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Container className="m-4">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div>{`From:${mail.from}`}</div>
            <div>{`Sent On:${mail.date}`}</div>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle>{mail.subject}</Card.Subtitle>
            <div dangerouslySetInnerHTML={{ __html: mail.body }}></div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default InboxMail;