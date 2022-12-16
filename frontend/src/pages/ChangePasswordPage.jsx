import { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewPasswordApi } from "../redux/apiFetch/users";

const ChangePasswordPage = () => {
  let { passwordUpdated, error, errorMsg } = useSelector(
    (state) => state.users
  );
  let dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  let [message, setMessage] = useState();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("authKey");
  let { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (message && newPassword.password === newPassword.confirmPassword)
      setMessage();
    setNewPassword({ ...newPassword, [name]: value });
  };
  const handleSubmit = () => {
    if (newPassword.password === newPassword.confirmPassword) {
      const payload = {
        id,
        body: {
          password: newPassword.password,
          key,
        },
      };
      dispatch(setNewPasswordApi(payload));
    } else {
      setMessage("passwords do not match");
    }
  };
  return (
    <div
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
        {message && <p>{message}</p>}
        {error && <p>{errorMsg}</p>}
        <FloatingLabel
          controlId="floatingInput"
          label="New password"
          className="mb-3"
        >
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            value={newPassword.password}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Confirm password"
          className="mb-3"
        >
          <Form.Control
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={newPassword.confirmPassword}
          />
        </FloatingLabel>
        <div className="d-grid gap-2 mb-3">
          <Button variant="dark" onClick={handleSubmit}>
            Set password
          </Button>
        </div>
      </div>
      {passwordUpdated && <Navigate to="/" />}
    </div>
  );
};

export default ChangePasswordPage;
