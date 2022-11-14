import { useState } from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../redux/apiFetch/LoginSlice";
import { BsFacebook } from "react-icons/bs";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = () => {
    console.log(loginData);
    dispatch(getLogin(loginData));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url("https://images.pexels.com/photos/7078446/pexels-photo-7078446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255, 0.7)",
          padding: "5rem",
          borderRadius: "10px",
        }}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            onChange={handleChange}
            type="email"
            name="email"
            value={loginData.email}
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            value={loginData.password}
            placeholder="Password"
          />
        </FloatingLabel>
        <div className="d-grid gap-2 mb-3">
          <Button variant="dark" onClick={handleSubmit}>
            Přihlásit se
          </Button>
        </div>
        <div className="d-grid gap-2">
          <Button variant="outline-dark">
            {" "}
            <BsFacebook
              onClick={() => {
                window.location = "https://uusubjectman.com/api/auth/facebook";
              }}
              className="align-text-top"
              size={20}
            />{" "}
            Přihlásit se přes Facebook
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
