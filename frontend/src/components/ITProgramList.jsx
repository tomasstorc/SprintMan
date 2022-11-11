import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudyProgram } from "../redux/apiFetch/StudyProgramSlice";
import StudyProgram from "./StudyProgram";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const ITProgramList = () => {
  const dispatch = useDispatch();
  const { loading, programList } = useSelector((state) => state.studyProgram);
  useEffect(() => {
    dispatch(getStudyProgram());
  }, []);
  return (
    <Container>
      <h3 className="text-center p-4">Information technologies</h3>
      <Row xs={1} md={2}>
        {programList.map((program) => {
          return (
            program.field === "it" && (
              <StudyProgram
                key={program._id}
                id={program._id}
                name={program.name}
                imgUrl={program.imageUrl}
                icon={program.icon}
              />
            )
          );
        })}
      </Row>
    </Container>
  );
};

export default ITProgramList;
