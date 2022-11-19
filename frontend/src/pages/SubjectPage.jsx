import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectDetail } from "../redux/apiFetch/SubjectDetail";
import Header from "../components/Header";
import InfoBox from "../components/InfoBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { GiGraduateCap } from "react-icons/gi";
import { BsChat } from "react-icons/bs";
import { TbCertificate2 } from "react-icons/tb";
import { AiFillProfile, AiFillFile } from "react-icons/ai";

import Description from "../components/Description";
import MaterialList from "../components/MaterialList";
import TopicList from "../components/TopicList";
import Teachers from "../components/Teachers";

const SubjectPage = () => {
  const type = {
    all: "all-materials",
    topic: "Topics",
  };
  const [option, setOption] = useState(type.topic);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, subjectDetail } = useSelector(
    (state) => state.subjectDetail
  );
  useEffect(() => {
    dispatch(getSubjectDetail(id));
  }, [dispatch, id]);
  if (loading) return <p>Loading...</p>;
  console.log(option);
  return (
    <div>
      <Header name={subjectDetail?.name} />
      <Row className="d-flex justify-content-center">
        <Col md={3}>
          <InfoBox
            name={subjectDetail?.degree}
            iconName={<GiGraduateCap className="align-text-bottom" size={25} />}
          />
        </Col>
        <Col md={3}>
          <InfoBox
            name={subjectDetail?.language}
            iconName={<BsChat className="align-text-bottom" size={25} />}
          />
        </Col>
        <Col md={3}>
          <InfoBox
            name={subjectDetail?.credits + " credits"}
            iconName={
              <TbCertificate2 className="align-text-bottom" size={25} />
            }
          />
        </Col>
      </Row>
      <Description info={subjectDetail?.goal} />
      <Container>
        <h3>Learning materials</h3>
        <Button
          variant={`${option === type.topic ? "dark" : "outline-dark"}`}
          onClick={() => setOption(type.topic)}
        >
          <AiFillProfile size={25} />
          Show by topics
        </Button>
        <Button
          variant={`${option === type.all ? "dark" : "outline-dark"}`}
          onClick={() => setOption(type.all)}
        >
          <AiFillFile size={25} />
          Show all materials
        </Button>

        {option === type.all && (
          <MaterialList materials={subjectDetail?.materials} />
        )}
        {option === type.topic && <TopicList topics={subjectDetail?.topics} />}
      </Container>
      <Container className="mt-3">
        <Row>
          <Col>
            {" "}
            <Teachers title={"Teachers"} name={subjectDetail?.teacher} />
          </Col>
          <Col md={"auto"}>
            <Teachers title={"Supervisor"} name={subjectDetail?.supervisor} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubjectPage;
