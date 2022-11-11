import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudyProgramDetail } from "../redux/apiFetch/StudyProgramDetail";
import InfoBox from "../components/InfoBox";
import { GiGraduateCap } from "react-icons/gi";
import { BsChat, BsCalendar3 } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlackBox from "../components/BlackBox";
import Header from "../components/Header";

const StudyProgrammePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, programDetail } = useSelector(
    (state) => state.studyProgramDetail
  );
  useEffect(() => {
    dispatch(getStudyProgramDetail(id));
  }, [dispatch, id]);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Header name={programDetail?.name} imgUrl={programDetail?.imageUrl} />
      <Row className="d-flex justify-content-center">
        <Col md={3}>
          <InfoBox
            name={programDetail?.degree}
            iconName={<GiGraduateCap className="align-text-bottom" size={25} />}
          />
        </Col>
        <Col md={3}>
          <InfoBox
            name={programDetail?.language}
            iconName={<BsChat className="align-text-bottom" size={25} />}
          />
        </Col>
        <Col md={3}>
          <InfoBox
            name={programDetail?.length}
            iconName={<BsCalendar3 className="align-text-bottom" size={25} />}
          />
        </Col>
      </Row>

      <BlackBox title="Description" info={programDetail?.description} />
      <Container>
        <Row>
          <Col md={3}>
            <BlackBox title={"Matematika"} info={"5 kreditu"} />
          </Col>
          <Col md={3}>
            <BlackBox title={"Matematika"} info={"5 kreditu"} />
          </Col>
          <Col md={3}>
            <BlackBox title={"Matematika"} info={"5 kreditu"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudyProgrammePage;
