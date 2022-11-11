import React from "react";
import Header from "../components/Header";

import ITProgramList from "../components/ITProgramList";
import BusinessProgramList from "../components/BusinessProgramList";

const StudyPage = () => {
  return (
    <div>
      <Header
        name="Study programs"
        imgUrl="https://subjectmansa.blob.core.windows.net/subjectmanpics/image%202.jpeg?fbclid=IwAR2ZaV0Ov3N5vUn9saFHRD8M_kAdlCl8s7h0x96OhLBfandYN8Dk_J2eY7c"
      />
      <ITProgramList />
      <BusinessProgramList />
    </div>
  );
};

export default StudyPage;
