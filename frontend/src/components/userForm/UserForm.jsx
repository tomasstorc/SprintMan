import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postUser } from "../../redux/apiFetch/users";
import { useDispatch } from "react-redux";

const UserForm = ({ show, setShow }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    let userPost = {
      token: token,
      body: data,
    };
    dispatch(postUser(userPost));
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Full name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email", { required: true })} />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
          />
          <Form.Label>Role</Form.Label>
          <Form.Select {...register("role", { required: true })}>
            <option value="admin">Administrator</option>
            <option value="editor">Editor</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            setShow(!show);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
