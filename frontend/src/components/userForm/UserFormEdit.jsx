import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editUser, getUserById, getUsers } from "../../redux/apiFetch/users";
import { useDispatch } from "react-redux";

const UserFormEdit = ({ show, setShow, name, email, role, password }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  let { editId, userToEdit } = useSelector((state) => state.users);

  let MYdefaultValues = {
    name: userToEdit?.name,
    email: userToEdit?.email,
    role: userToEdit?.role,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: MYdefaultValues,
  });

  const resetAsyncForm = useCallback(async () => {
    let payload = {
      id: editId,
      token,
    };
    let res = await dispatch(getUserById(payload));
    console.log(res);
    reset(res.payload.data);
  }, [dispatch, editId, reset, token]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);
  const onSubmit = (data) => {
    let userEdit = {
      id: userToEdit._id,
      token: token,
      body: data,
    };

    dispatch(editUser(userEdit))
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
              required: false,
              pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6}/,
            })}
          />
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
          Update
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

export default UserFormEdit;
