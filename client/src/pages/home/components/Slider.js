import React from 'react';
import { Carousel, Typography } from 'antd';
import { MainLib } from 'lib';
import classes from '../classes.module.scss';

const { Title } = Typography;

export const HomePageSlider = () => (
  <Carousel dotPosition="left">
    <div>
      <div className={classes.container} style={{ backgroundImage: 'url(/images/forest1.jpg)' }}>
        <Title level={2}>{MainLib.home.sliderTitle}</Title>
      </div>
    </div>
    <div>
      <div className={classes.container} style={{ backgroundImage: 'url(/images/forest2.jpg)' }}>
        <Title level={2}>{MainLib.home.sliderTitle}</Title>
      </div>
    </div>
    <div className={classes.container}>
      <Title level={2}>{MainLib.home.sliderTitle}</Title>
    </div>
    <div className={classes.container}>
      <Title level={2}>{MainLib.home.sliderTitle}</Title>
    </div>
  </Carousel>
);
