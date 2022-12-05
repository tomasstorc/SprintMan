import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudyProgram } from "../redux/apiFetch/StudyProgramSlice";
import StudyProgram from "./StudyProgram";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Loading from "./Loading";

const BusinessProgramList = () => {
  const dispatch = useDispatch();
  const { loading, programList } = useSelector((state) => state.studyProgram);
  useEffect(() => {
    dispatch(getStudyProgram());
  }, [dispatch]);
  if (loading) return <Loading />;
  return (
    <Container>
      <h3 className="text-center p-4">Business and economics</h3>
      <Row xs={1} md={2}>
        {programList.map((program) => {
          return (
            program.field === "business" && (
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

export default BusinessProgramList;
