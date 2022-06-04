import React from 'react';
import { Col, Row, Typography, Button, Input, Divider, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { commentPost } from 'actions/posts';
import { MainLib } from 'lib';

const { TextArea } = Input;
const { Title, Text } = Typography;

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const comments = post?.comments;

  const handleComment = (values) => {
    dispatch(commentPost(`${user?.result?.name}: ${values.comment}`, post._id));
  };

  const renderNoComments = () => (
    <Text>{MainLib.posts.noComments}</Text>
  );

  const renderCommentsBlock = () => comments.map((c) => (
    <Text>
      <strong>{c.split(': ')[0]}</strong>
      {c.split(':')[1]}
    </Text>
  ));

  return (
    <Form onFinish={handleComment} layout="vertical" hideRequiredMark>
      <Row>
        <Col span={24}>
          <Title level={4}>{MainLib.posts.comments}</Title>
          { comments ? renderNoComments() : renderCommentsBlock() }
        </Col>
        <Divider />
        <Col span={24}>
          <Form.Item label={MainLib.posts.writeComment} name="comment">
            <TextArea />
          </Form.Item>
        </Col>
        <Col>
          <Button htmlType="submit">{MainLib.buttons.send}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentSection;
