import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudyProgram,
  setEditId,
  setSubject,
} from "../../redux/apiFetch/StudyProgramSlice";
import { setDeleteId } from "../../redux/apiFetch/deleteSlice";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import StudyProgramFormEdit from "../studyProgramForm/StudyProgramFormEdit";
import DeleteModal from "../DeleteModal";
import { AiOutlinePlusCircle } from "react-icons/ai";

const StudyProgramTable = ({ title, omitted }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      name: "Study program name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Degree",
      selector: (row) => row.degree,
      sortable: false,
      maxWidth: "100px",
    },
    {
      name: "Language",
      selector: (row) => row.language,
      sortable: false,
      maxWidth: "100px",
    },
    {
      name: "Length",
      selector: (row) => row.length,
      sortable: false,
      maxWidth: "100px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Subjects",
      selector: (row) => (
        <AiOutlinePlusCircle
          size={20}
          className="pointer"
          onClick={() => {
            console.log(row);
            dispatch(setEditId(row._id));
            dispatch(setSubject(true));
            setShow(!show);
          }}
        />
      ),
      sortable: false,
      maxWidth: "100px",
    },
    {
      name: "Edit",
      selector: (row) => (
        <MdModeEditOutline
          size={20}
          className="pointer"
          onClick={() => {
            console.log(row);
            dispatch(setSubject(false));
            dispatch(setEditId(row._id));
            setShow(!show);
          }}
        />
      ),
      sortable: false,
      maxWidth: "100px",
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
      maxWidth: "100px",
      omit: omitted,
    },
  ];

  const { loading, programList = [] } = useSelector(
    (state) => state.studyProgram
  );
  useEffect(() => {
    dispatch(getStudyProgram());
  }, [dispatch]);
  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={programList}
        pagination
        progressPending={loading}
      />

      {show && <StudyProgramFormEdit show={show} setShow={setShow} />}
      {showDelete && (
        <DeleteModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          type="programme"
        />
      )}
    </div>
  );
};

export default StudyProgramTable;
