import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiFetch/users";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { setEditId } from "../../redux/apiFetch/users";
import { useState } from "react";
import UserFormEdit from "../userForm/UserFormEdit";

const UserTable = ({ token, title }) => {
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { loading, users = [] } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);

  const columns = [
    {
      name: "User name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: false,
    },
    {
      name: "Edit",
      selector: (row) => (
        <MdModeEditOutline
          onClick={() => {
            dispatch(setEditId(row._id));
            setShow(!show);
          }}
        />
      ),
      sortable: false,
    },
    {
      name: "Delete",
      selector: (row) => <MdDelete />,
      sortable: false,
    },
  ];

  return (
    <div>
      {" "}
      <DataTable
        title={title}
        columns={columns}
        data={users}
        pagination
        progressPending={loading}
      />
      {show && <UserFormEdit show={show} setShow={setShow} />}
    </div>
  );
};

export default UserTable;
