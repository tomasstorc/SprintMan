import React from "react";
import Header from "../components/Header";
import StudyProgram from "../components/StudyProgram";

const StudyPage = () => {
  return (
    <div>
      <Header
        name="Study programs"
        imgUrl="https://subjectmansa.blob.core.windows.net/subjectmanpics/image%202.png?fbclid=IwAR3BDlZn6gshgneAYgPfYqkqo5C95-fqGw1ec2BNOd-kea255N-oXp8J3dI"
      />
      <StudyProgram
        name="Software development"
        imgUrl="https://subjectmansa.blob.core.windows.net/subjectmanpics/Component%203.png?fbclid=IwAR1m9IqUyzzDEwfm3FdbE9ASG6LqYDmaStjl1VLglwXldBdYAlMFG0yZBNY"
        icon="https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png?fbclid=IwAR0X8g8eDmjAb7CO3Fvqw1MnuJ2kZj5HjTEoxoPlrGSdAt3Ryd__1XpGhG0"
      />
    </div>
  );
};

export default StudyPage;
