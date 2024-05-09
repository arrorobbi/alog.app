import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';


function FormExample() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState([]);
  
  // get data form before post to api
  const handleSubmit = (event) => {
    let input = []
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    input.push(event.target[0].value);
    input.push(event.target[1].value);

    setValidated(true)
    setForm(input)
  };

  const date = (data) =>{
    const date = new Date(data);
    const dateWithoutTime = date.toDateString();
    return dateWithoutTime
  }

  const week = (data) =>{
    const date = new Date(data);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
  
  // post form data to api

  // get data to api
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.18.26:9000/forecast").then((res) => {
        setForecast(res.data.payload.rows)
    });
  }, []);

  console.log(form);


  return (
    <Container>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>RTS</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Actual Forecast</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Last name"
          />
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
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
    <Container>
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
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
    {forecast.map((data,i) => (
      <tbody>
        <tr>
          <td key={i}>{date(data.date)}</td>
          <td>{week(data.date)}</td>
          <td>{data.RTS}</td>
          <td>{data.upper}</td>
          <td>{data.forecast}</td>
          <td>{data.actual_forecast}</td>
          <td>{data.actual_upper}</td>
          <td>{data.manpower}</td>
        </tr>
      </tbody>
    ))}
    </Table>
    </Container>
    
    </Container>
  );
}

export default FormExample;