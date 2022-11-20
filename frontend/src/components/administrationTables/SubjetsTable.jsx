import React from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../redux/apiFetch/subject";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
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
const SubjetsTable = ({ token, title }) => {
  const dispatch = useDispatch();
  const { loading, subjects = [] } = useSelector((state) => state.subject);
  useEffect(() => {
    dispatch(getSubjects(token));
  }, [dispatch, token]);

  return (
    <DataTable
      title={title}
      columns={columns}
      data={subjects}
      pagination
      progressPending={loading}
    />
  );
};

export default SubjetsTable;
