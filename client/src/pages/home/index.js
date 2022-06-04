import React from 'react';
import { Row, Col } from 'antd';
import { HomePageSlider, Benefits } from './components';

const HomePage = () => (
  <Row>
    <Col span={24}>
      <HomePageSlider />
    </Col>
    <Col span={24}>
      <Benefits />
    </Col>
  </Row>
);

export default HomePage;
