import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Image, Divider, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { getPost, getPostsBySearch } from 'actions/posts';
import CommentSection from 'components/CommentSection';
import { PageContainer } from 'components';

const { Title, Text } = Typography;
const linkStyle = { textDecoration: 'none', color: '#3f51b5' };

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Card>
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <PageContainer>
      <Card>
        <Row>
          {/* info block */}
          <Col span={post.selectedFile ? 16 : 24}>
            <Title level={2}>{post.title}</Title>
            <Text>{post.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={linkStyle}>
                {` #${tag} `}
              </Link>
            ))}
            </Text>
            <Text>{post.message}</Text>
            <Divider />
            <Title level={5}>
              Created by:
              <Link to={`/creators/${post.name}`} style={linkStyle}>
                {` ${post.name}`}
              </Link>
            </Title>
            <Text>{moment(post.createdAt).fromNow()}</Text>
          </Col>
          {/* imgaes block */}
          {/* TODO сделать карусель когда будет "много" картинок */}
          { post.selectedFile && (
            <Col span={8}>
              <Image src={post.selectedFile} />
            </Col>
          )}
          <Col span={24}>
            <CommentSection post={post} />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Post;
