import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";

export default function Navbars() {
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(true);
    }
  }, []);

  const navigate = useNavigate();
  const logOut= () => {
    localStorage.clear();
    navigate('/')
    window.location.reload();
  }
  const decoded = jwt_decode(localStorage.getItem("UserToken"));

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" fixed='top'>
        <Container fluid>
          <Navbar.Brand href="#home">
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            { decoded.isAdmin ? 
              (<><Nav.Link href="/" >Home</Nav.Link>
              <Nav.Link href="/add-video" >Add Vedios</Nav.Link>
              <Nav.Link href="/add-plan" >Add Plan</Nav.Link>
              <Nav.Link href="/vedio-list" >Vedios</Nav.Link>
              <Nav.Link href="/all-plan" >Plans</Nav.Link>
              </>)
              :
              (<><Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/vedio-list" >Vedios</Nav.Link>
            <Nav.Link href="/about" >About</Nav.Link></>)}
            { logIn && <Button variant="danger"  onClick={logOut}>Logout</Button>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
  