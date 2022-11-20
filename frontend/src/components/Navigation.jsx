import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { user } = useSelector((state) => state.login);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">University</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {(user?.role === "admin" || user?.role === "editor") && (
              <Nav.Link href="/administration">Administration portal</Nav.Link>
            )}
          </Nav>
          <Nav>
            <NavDropdown title="Study programs" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Software development</NavDropdown.Item>
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
            {user ? (
              <NavDropdown
                title={<BiUserCircle size={20} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/api/auth/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
