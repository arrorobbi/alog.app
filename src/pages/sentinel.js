import {React, useState, useEffect} from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import link from '../lib/link';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const limitDescription = (description, limit) => {
  if (description.length <= limit) {
    return description;
  }
  return description.substring(0, limit) + '...';
};


export default function SentinelPage() {
  const [valorant, setValorant] = useState([]);
  useEffect(() => {
    axios.get("https://staging.ina17.com/data.json").then((res) => {
        const payload = res.data
        let result = []
        payload.map(((data,index) => {
            if(data.role === "Sentinel"){
            result.push(data)
            }
        }))
      setValorant(result);
    });
  }, []);




  return (
        <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/valorant">Agent Role: Sentinel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link>
                <Link to='/valorant/initiator' style={{color:'#000000',textDecoration: 'none'}}>
                  Initiator
                </Link>
                </Nav.Link> <Nav.Link>
                <Link to='/valorant/duelist'  style={{color:'#000000',textDecoration: 'none'}}>
                  Duelist
                </Link>
                </Nav.Link> <Nav.Link>
                <Link to='/valorant/sentinel'  style={{color:'#000000',textDecoration: 'none'}}>
                  Sentinel
                </Link>
                </Nav.Link> <Nav.Link>
                <Link to='/valorant/controller'  style={{color:'#000000',textDecoration: 'none'}}>
                  Controller
                </Link>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>

    <Row className="justify-content-md-center">
    {valorant.map((data,i) => (
    <Card 
    bg="#F9370D" 
    style={{margin:'2.5px', width: '180px', textAlign:'center', color:'#FFFFFF', textDecorationColor:'black',backgroundColor:'#EA850B'}}
    >
      <Col sm={100}>
        <Link to={link(data.displayName)} style={{color:'#FFFFFF',textDecoration: 'none'}} >
      <Card.Img variant="top" src={data.displayIcon} />
      <Card.Body>
        <Card.Header>
        <Card.Title>
            <div key={i}>{data.displayName}</div>
        </Card.Title>
        </Card.Header>
        <Card.Text>{limitDescription(data.description,100)}</Card.Text>
      </Card.Body>
        </Link>
      </Col>
      </Card>
        ))}
      </Row>
      </Container>
      
  )
}
