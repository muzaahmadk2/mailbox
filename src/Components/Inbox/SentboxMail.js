import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { inboxAction } from "../Store/inboxSlice";

function SentboxMail() {
  const { mailid } = useParams();
  const dispatch = useDispatch();
  const sentbox = useSelector((state) => state.inbox.sentArr);
  const mail = sentbox.find((email) => email.id === mailid);
  const myemail = localStorage.getItem('email');

  
  return (
    <>
      <Container className="m-4">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div>{`Sent to :  ${mail.to}`}</div>
            <div>{`Sent On : ${mail.date}`}</div>
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

export default SentboxMail;