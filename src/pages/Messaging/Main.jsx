import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FeedRight from "../Home/FeedRight";
import StickyBox from "react-sticky-box";
import MessagesBlock from "./left";
const Main = (props) => {
  return (
    <Container>
      <Row className='mt-5 pt-5'>
        <Col xs={8}>
          <MessagesBlock {...props} />
        </Col>
        <Col xs={4} className='d-none d-sm-inline-block'>
          <StickyBox offsetTop={65} offsetBottom={20}>
            <FeedRight />
          </StickyBox>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
