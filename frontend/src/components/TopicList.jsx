import React from "react";
import { Container } from "react-bootstrap";
import Topic from "./Topic";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectDetail } from "../redux/apiFetch/SubjectDetail";

const TopicList = ({ topics }) => {
  //   const { id } = useParams();
  //   const dispatch = useDispatch();
  //   const { loading, subjectDetail } = useSelector(
  //     (state) => state.subjectDetail
  //   );
  //   useEffect(() => {
  //     dispatch(getSubjectDetail(id));
  //   }, [dispatch, id]);
  //   if (loading) return <p>Loading...</p>;

  return topics?.map((topic) => {
    return <Topic key={topic?.id} name={topic?.name} topic={topic} />;
  });
};

export default TopicList;
