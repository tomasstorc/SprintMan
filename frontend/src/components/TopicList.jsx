import React from "react";
import Topic from "./Topic";

const TopicList = ({ topics }) => {
  return topics?.map((topic) => {
    return <Topic key={topic?.id} name={topic?.name} topic={topic} />;
  });
};

export default TopicList;
