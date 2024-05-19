import axios from "axios";
import { React, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { date } from "../lib/date";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Details() {
  const { id } = useParams();
  const today = new Date();

  const [forecast, setForecast] = useState();

  const [validated, setValidated] = useState(false);
  useEffect(() => {
    async function getOne(id) {
      await axios.get(`http://localhost:9000/forecast/${id}`).then((res) => {
        console.log(res.data.payload);
        setForecast(res.data.payload);
      });
    }
    getOne(id);
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (
      event.target[3].checked === true &&
      date(forecast?.date) === date(today)
    ) {
      axios
        .patch(`http://localhost:9000/forecast/${id}`, {
          actual_forecast: +event.target[1].value,
        })
        .then((res) => {
          console.log("Data updated successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error updating data:", err);
        });
    }
  };

  return (
    <Container>
      <Nav variant="underline" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            {date(forecast?.date)}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
        {/* <h1>{forecast?.date}</h1>
      <h1>{id}</h1> */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>RTS</Form.Label>
              <Form.Control type="number" defaultValue={forecast?.RTS} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Actual Forecast</Form.Label>
              <Form.Control
                required
                type="number"
                defaultValue={forecast?.actual_forecast}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mt-4">
              <Button type="submit">Submit form</Button>
              <Form.Check
                required
                label="Checklist If You Are Convinced"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}
