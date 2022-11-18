import React from "react";
import DataTable from "react-data-table-component";
import Material from "./Material";

const data = [
  {
    name: "bla bla",
    materials: {
      name: "test",
      url: "http:test",
    },
  },
];
const columns = [
  {
    selector: (row) => row.name,
  },
];
const ExpandedComponent = ({ data }) => {
  return <Material name={"test"} variant={"bg-light text-dark border"} />;
};
const Topic = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
};

export default Topic;
