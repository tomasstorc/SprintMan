import { useState } from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../redux/apiFetch/subject";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { setEditId } from "../../redux/apiFetch/subject";
import { setDeleteId } from "../../redux/apiFetch/deleteSlice";
import SubjectFormEdit from "../subjectForm/SubjectFormEdit";
import DeleteModal from "../DeleteModal";

const SubjetsTable = ({ token, title, omitted }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const columns = [
    {
      name: "Subject name",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Degree",
      selector: (row) => row.degree,
      sortable: false,
      maxWidth: "300px",
    },
    {
      name: "Language",
      selector: (row) => row.language,
      sortable: false,
      maxWidth: "300px",
    },
    {
      name: "Credits",
      selector: (row) => row.credits,
      sortable: false,
      maxWidth: "300px",
    },
    {
      name: "Goal",
      selector: (row) => row.goal,
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Edit",
      selector: (row) => (
        <MdModeEditOutline
          size={20}
          className="pointer"
          onClick={() => {
            dispatch(setEditId(row._id));
            setShow(!show);
          }}
        />
      ),
      sortable: false,
      maxWidth: "300px",
    },
    {
      name: "Delete",
      selector: (row) => (
        <MdDelete
          size={20}
          className="text-danger pointer"
          onClick={() => {
            dispatch(setDeleteId(row._id));
            setShowDelete(!showDelete);
          }}
        />
      ),
      sortable: false,
      maxWidth: "300px",
      omit: omitted,
    },
  ];

  const { loading, subjects = [] } = useSelector((state) => state.subject);
  useEffect(() => {
    dispatch(getSubjects(token));
  }, [dispatch, token]);

  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={subjects}
        pagination
        progressPending={loading}
      />
      {show && <SubjectFormEdit show={show} setShow={setShow} />}
      {showDelete && (
        <DeleteModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          type="subject"
        />
      )}
    </div>
  );
};

export default SubjetsTable;
