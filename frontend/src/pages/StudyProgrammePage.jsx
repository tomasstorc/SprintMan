import React from "react";
import InfoBox from "../components/InfoBox";
import { BsChat } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlackBox from "../components/BlackBox";

const StudyProgrammePage = () => {
  const desc =
    "The Software Development bachelor’s study program will show you how to design robust cloud apps in modern programming languages and help you understand various disciplines within software development. Which technologies are used in practice? What do you need to know to become a sought-after specialist? What kind of knowledge is required in business? Is Java better than .NET? What about JavaScript? What to do with data persistence? Which is preferable, SQL or NoSQL databases? What is influenced by software architecture? How is it with frontend development? When and should React be used? Learn from professionals who make their living from software development! CLOUD TECHNOLOGIES The Cloud is highly popular these days. It has many pros and cons. Do you want to know what type of projects are best suited to the cloud and when it is better to use an on-premise solution? And what about cloud-based applications development? What is Saas, IaaS, and PaaS, and when to use Amazon WS, or Microsoft Azure, or uuCloud, and much more. INTERNET OF THINGS The Internet of Things (IoT) is the current trend for controlling and communicating between devices and humans, or between devices themselves. Do you want to learn how to develop applications for IoT devices? Get to know in which direction the world of information technology is going and become a highly demanded professional around the world!";
  return (
    <div>
      <InfoBox
        name="English"
        iconName={<BsChat className="align-text-bottom" size={25} />}
      />
      <BlackBox title={"BlackBox"} info={desc} />
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
