import React from 'react';

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { Card as AntCard } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = AntCard;

export const CardSimple = (data) => {
  const { content, loading } = data;
  const {
    title,
    description,
    link,
    img,
  } = content;

  return (
    <AntCard
      title={title}
      style={{ height: 300 }}
      loading={loading}
      extra={<Link to={link}>More</Link>}
      cover={(
        <img
          alt="example"
          src={img}
        />
  )}
    >
      <Meta
        description={description}
      />
    </AntCard>
  );
};
