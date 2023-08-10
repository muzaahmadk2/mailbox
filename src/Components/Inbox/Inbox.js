import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { Card, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Inbox.module.css";
import { Accordion, Form } from "react-bootstrap";

function Inbox(props) {
  const inboxArr = useSelector((state) => state.inbox.inboxArr);
  console.log(inboxArr);

  let inboxMessages = inboxArr.map((email) => {
    return (
      <div key={email.id} className={classes.mainCard}>
        <div className={classes.card}>
          <Link className={classes.cardElements} to={`home/${email.id}`}>
            <Card.Body
              className={`d-flex align-items-center`}
              style={{ flexWrap: "wrap" }}
            >
              <Form.Check readOnly type="checkbox" style={{ flexBasis: "15%" }}/>
              <p style={{ flexBasis: "15%" }}>{!email.read ? "🔵" : "⚪"}</p>
              <Card.Subtitle
                style={{ flexBasis: "20%", flexGrow: 1, flexShrink: 1 }}
              >
                {email.subject}
              </Card.Subtitle>
              <p style={{ flexBasis: "20%", flexGrow: 1, flexShrink: 1 }}>
                {email.from}
              </p>
              <Card.Text
                style={{ flexBasis: "10%", flexGrow: 1, flexShrink: 1 }}
              >{`${email.date}`}</Card.Text>
            </Card.Body>
          </Link>
        </div>
        <button type="button" className="btn btn-outline-danger ms-2">
          X
        </button>
      </div>
    );
  });

  return (
    <>
      <Container className={classes.inbox}>
        <h3 className="m-5">Inbox</h3>

        <div className="mt-4">{inboxMessages}</div>
      </Container>
    </>
  );
}
export default Inbox;
