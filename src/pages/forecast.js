import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { Container, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import GraphicPage from './graphics';


function FormExample() {
  const [validated, setValidated] = useState(false);
  
  // get data form before post to api
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true)
    if(event.target[2].checked === true) {
      axios({
        method: 'post',
        url: 'http://192.168.18.26:9000/forecast',
        data: {
          RTS: +event.target[0].value,
          actual_forecast: +event.target[1].value
        }
      })
    }
  };

  const date = (data) =>{
    const date = new Date(data);
    const dateWithoutTime = date.toDateString();
    return dateWithoutTime
  }
  // post form data to api

  // get data to api
  
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.18.26:9000/forecast/dashboard").then((res) => {
      setForecast(res.data.payload.rows)
    });
  }, []);
  

  return (
    <Container>
    <Nav>
    <Nav variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-1"><Link to='/' style={{color:'#000000',textDecoration: 'none'}}>Dashboard</Link></Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link><Link to='/graphics' style={{color:'#000000',textDecoration: 'none'}}>Charts</Link></Nav.Link>
      </Nav.Item>
    </Nav>
    </Nav>
    <GraphicPage />
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>RTS</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="RTS"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Actual Forecast</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Actual Forecast"
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
      <Button type="submit">Submit form</Button>
      </Form.Group>
    </Form>
    <Container>
    <Table striped bordered hover size="sm">
    <thead>
        <tr class="text-center">
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
    <tbody class="text-center">
    {forecast.map((data,i) => (
        <tr>
          <td>{i+1}</td>
          <td key={i}>{date(data.date)}</td>
          <td>{data.week}</td>
          <td>{data.RTS}</td>
          <td>{data.upper}</td>
          <td>{data.forecast}</td>
          <td>{data.actual_forecast}</td>
          <td>{data.actual_upper}</td>
          <td>{data.manpower}</td>
        </tr>
    ))}
    </tbody>
    </Table>
    </Container>
    
    </Container>
  );
}

export default FormExample;