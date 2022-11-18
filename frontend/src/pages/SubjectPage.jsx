import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectDetail } from "../redux/apiFetch/SubjectDetail";
import Header from "../components/Header";
import InfoBox from "../components/InfoBox";
import { Button, Col, Row } from "react-bootstrap";
import { GiGraduateCap } from "react-icons/gi";
import { BsChat } from "react-icons/bs";
import { TbCertificate2 } from "react-icons/tb";
import Description from "../components/Description";
import Material from "../components/Material";
import Topic from "../components/Topic";
import Dropdown from "react-bootstrap/Dropdown";

const SubjectPage = () => {
  const type = {
    all: "All materials",
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
  console.log(subjectDetail);

  return (
    <div>
      <Header name={subjectDetail.name} />
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
      <Description info={subjectDetail.goal} />
      <Button onClick={() => setOption(type.topic)}>Topics</Button>
      <Button onClick={() => setOption(type.all)}>All materials</Button>

      {option === type.all && (
        <Row>
          <Col md={4}>
            <Material
              variant={"bg-dark text-white"}
              name={"Test testovicovic test"}
            />
          </Col>
          <Col md={4}>
            <Material
              variant={"bg-dark text-white"}
              name={"Test testovicovic test"}
            />
          </Col>
          <Col md={4}>
            <Material
              variant={"bg-dark text-white"}
              name={"Test testovicovic test"}
            />
          </Col>
        </Row>
      )}
      {option === type.topic && <Topic />}
    </div>
  );
};

export default SubjectPage;
