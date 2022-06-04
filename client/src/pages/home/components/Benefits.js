import React from 'react';
import { MainLib } from 'lib';
import { Col, Row, Typography } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import classes from '../classes.module.scss';

const { Title, Text } = Typography;

export const Benefits = () => (
  <Row justify="space-around" className={classes.benefitsContainer}>
    <Col span="4" className={classes.benefit}>
      <TrophyOutlined className={classes.benefitImg} />
      <Title level={4}>{MainLib.home.benefit1}</Title>
      <Text>{MainLib.home.benefit1Text}</Text>
    </Col>
    <Col span="4" className={classes.benefit}>
      <TrophyOutlined className={classes.benefitImg} />
      <Title level={4}>{MainLib.home.benefit1}</Title>
      <Text>{MainLib.home.benefit1Text}</Text>
    </Col>
    <Col span="4" className={classes.benefit}>
      <TrophyOutlined className={classes.benefitImg} />
      <Title level={4}>{MainLib.home.benefit1}</Title>
      <Text>{MainLib.home.benefit1Text}</Text>
    </Col>
  </Row>
);
