import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUsers, postUser } from "../../redux/apiFetch/users";
import { useDispatch } from "react-redux";

const UserForm = ({ show, setShow }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    dispatch(postUser(userPost))
      .unwrap()
      .then(() => {
        dispatch(getUsers(token));
        setShow(!show);
      });
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
          {errors?.name?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="error">Invalid email adress</p>
          )}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6}/,
            })}
          />
          {errors?.password?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className="error">
              Password must have at least one uppercase (A-Z), one lowercase
              (a-z) and at least 6 characters.
            </p>
          )}

          <Form.Label>Role</Form.Label>
          <Form.Select {...register("role", { required: true })}>
            <option value="admin">Administrator</option>
            <option value="editor">Editor</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </Form.Select>
          {errors?.role?.type === "required" && (
            <p className="error">This field is required</p>
          )}
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
