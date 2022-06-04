import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Spin, Row, Col, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Post from 'components/Posts/Post';
import { getPostsByCreator, getPostsBySearch } from 'actions/posts';
import { PageContainer } from 'components';

const { Title } = Typography;

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <PageContainer>
      <Row>
        <Col>
          <Title level={2}>{name}</Title>
        </Col>
        <Divider />
        <Col>
          {isLoading ? <Spin /> : (
            <Row>
              {posts?.map((post) => (
                <Col key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CreatorOrTag;
