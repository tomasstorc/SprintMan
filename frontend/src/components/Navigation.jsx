import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiUserCircle } from "react-icons/bi";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title="Study programs" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                Software development
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Software engeneering and big data
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Business Management
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Applied economics and data analysis
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<BiUserCircle size={20} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.2">
                Odhlásit se
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
