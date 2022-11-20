import React from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudyProgram } from "../../redux/apiFetch/StudyProgramSlice";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const columns = [
  {
    name: "Study program name",
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
    name: "Length",
    selector: (row) => row.length,
    sortable: false,
    maxWidth: "300px",
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
    maxWidth: "300px",
  },
  {
    name: "Edit",
    selector: (row) => <MdModeEditOutline />,
    sortable: false,
    maxWidth: "300px",
  },
  {
    name: "Delete",
    selector: (row) => <MdDelete />,
    sortable: false,
    maxWidth: "300px",
  },
];

const StudyProgramTable = ({ title }) => {
  const dispatch = useDispatch();
  const { loading, programList = [] } = useSelector(
    (state) => state.studyProgram
  );
  useEffect(() => {
    dispatch(getStudyProgram());
  }, [dispatch]);
  return (
    <DataTable
      title={title}
      columns={columns}
      data={programList}
      pagination
      progressPending={loading}
    />
  );
};

export default StudyProgramTable;
