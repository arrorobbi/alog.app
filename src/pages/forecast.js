import axios from "axios";
import { React, useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import GraphicPage from "./graphics";
import link from "../lib/link";
import Clink from "../components/link/link";

function FormExample() {
  const [validated, setValidated] = useState(false);

  // get data form before post to api
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (event.target[2].checked === true) {
      axios({
        method: "post",
        url: "http://localhost:9000/forecast",
        data: {
          RTS: +event.target[0].value,
          actual_forecast: +event.target[1].value,
        },
      });
    }
  };

  const date = (data) => {
    const date = new Date(data);
    const dateWithoutTime = date.toDateString();
    return dateWithoutTime;
  };

  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/forecast/dashboard").then((res) => {
      setForecast(res.data.payload.rows);
    });
  }, []);

  return (
    <Container>
      <Nav>
        <Nav variant="underline" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link eventKey="link-1">
              <Link to="/" style={{ color: "#000000", textDecoration: "none" }}>
                Dashboard
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Nav>
      <GraphicPage />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>RTS</Form.Label>
            <Form.Control required type="number" placeholder="RTS" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Actual Forecast</Form.Label>
            <Form.Control type="number" placeholder="Actual Forecast" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Checklist If You Are Convinced"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
          <Button type="submit">Submit form</Button>
        </Form.Group>
      </Form>
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Date</th>
              <th>Week</th>
              <th>RTS</th>
              <th>Upper</th>
              <th>Forecast</th>
              <th>Actual Forecast</th>
              <th>Actual Upper</th>
              <th>Manpower</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {forecast.map((data, i) => (
              <tr key={data.id}>
                <td>
                  <Clink data={i + 1} params={data.id} />
                </td>
                <td>
                  <Clink data={date(data.date)} params={data.id} />
                </td>
                <td>
                  <Clink data={data.week} params={data.id} />
                </td>
                <td>
                  <Clink data={data.RTS} params={data.id} />
                </td>
                <td>
                  <Clink data={data.upper + "%"} params={data.id} />
                </td>
                <td>
                  <Clink data={data.forecast} params={data.id} />
                </td>
                <td>
                  <Clink data={data.actual_forecast} params={data.id} />
                </td>
                <td>
                  <Clink data={data.actual_upper + "%"} params={data.id} />
                </td>
                <td>
                  <Clink data={data.manpower} params={data.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default FormExample;
