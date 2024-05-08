import {React, useState, useEffect} from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Ratio from 'react-bootstrap/Ratio';
import embed from '../lib/embed';

export default function OmenPage() {
  const [valorant, setValorant] = useState([]);
  useEffect(() => {
    axios.get("https://staging.ina17.com/data.json").then((res) => {
        const payload = res.data
        let result = []
        payload.map(((data,index) => {
            if(data.displayName === "Omen"){
            result.push(data)
            }
        }))
      setValorant(result);
    });
  }, []);

  const [abilities, setAbilites] = useState([]);
  useEffect(() => {
    axios.get("https://staging.ina17.com/data.json").then((res) => {
        const payload = res.data
        payload.map(((data,index) => {
            if(data.displayName === "Omen"){
              setAbilites(data.abilities);
            }
        }))
    });
  }, []);

console.log(abilities);


  return (
        <Container>
          <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/valorant">All Agent</Navbar.Brand>
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
     style={{margin:'2.5px', width: '800px', textAlign:'center', color:'#FFFFFF', textDecorationColor:'black',backgroundColor:'#EA850B'}}
     >
     
     <Col sm={100}>
     <div style={{ width: 780, height: 'auto' }}>
     <Ratio aspectRatio="16x9">
       <iframe 
         title={data.displayName}
         width="100%" 
         height="100%" 
         src={embed(data.video)} 
         frameborder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen>
       </iframe>
     </Ratio>
   </div>
     <Card.Body>
       <Card.Header>
       <Card.Title>
           <div key={i}>{data.displayName}</div>
       </Card.Title>
       </Card.Header>
       <Card.Text>{data.description}</Card.Text>
     </Card.Body>
     </Col>
     </Card>
        ))}
      </Row>
        <Container>
        <Row className="justify-content-md-center">
        {abilities.map((data,i) => (
        <Card 
        bg="#F9370D" 
        style={{margin:'2.5px', width: '200px', textAlign:'center', color:'#FFFFFF', textDecorationColor:'black',backgroundColor:'#EA850B'}}
        >
          <Col sm={100}>
          <Card.Img variant="top" src={data.displayIcon} />
          <Card.Body>
            <Card.Header>
            <Card.Title as="h4">
                <div key={i}>{data.displayName}</div>
            </Card.Title>
            </Card.Header>
            <Card.Text as="h5">{data.slot}</Card.Text>
            <Card.Text as="h6">{data.description}</Card.Text>
          </Card.Body>
          </Col>
          </Card>
            ))}
        </Row>
        </Container>
      </Container>
      
  )
}
