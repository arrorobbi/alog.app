import {React, useState, useEffect} from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import link from '../lib/link';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const limitDescription = (description, limit) => {
  if (description.length <= limit) {
    return description;
  }
  return description.substring(0, limit) + '...';
};

export default function ForecastPage() {
  const [search, setSearch] = useState('');

  // Handler function to update state when input changes
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const [valorant, setValorant] = useState([]);
  useEffect(() => {
    axios.get("https://staging.ina17.com/data.json").then((res) => {
      setValorant(res.data);
    });
  }, []);

  const find = (e) => {
    let result = []
    valorant.some((data => {
      let name = data.displayName
      const arrName = name.split("").sort()
      const arrSearch = search.split("").sort().join()
      const input = new RegExp(`^[${arrSearch}]$`)
      const count = arrName.filter(n => input.test(n)).length
       if(count >= 1) {
         result.push(data)
      }
    }))
    setValorant(result)
      for(let data of result){
        console.log(data.displayName);
        if(data.displayName === search){
          setValorant([data])
        }
      }
  }


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
                <Form.Control
                  type="text"
                  id="search"
                  value={search} // Set input value from state
                  onChange={handleSearch} // Call handler function on change
                />
                <Form.Label htmlFor="text">
                <Button type='submit' onClick={find} variant="info">Search</Button>{' '}
                </Form.Label>
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
        <Card.Text as="h9">{limitDescription(data.description,50)}</Card.Text>
      </Card.Body>
        </Link>
      </Col>
      </Card>
        ))}
      </Row>
      </Container>
      
  )
}
