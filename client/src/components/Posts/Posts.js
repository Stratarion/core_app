import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import Post from './Post/Post';
import NoResults from '../NoResults';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return <NoResults />;

  return (
    isLoading ? (
      <Col>
        <Skeleton active />
      </Col>
    ) : (
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col key={post._id} span={24}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Col>
        ))}
      </Row>
    )
  );
};

export default Posts;
