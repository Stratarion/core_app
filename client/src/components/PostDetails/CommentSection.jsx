import React from 'react';
import { Col, Row, Typography, Button, Input, Divider, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

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
    <Text>Ещё никто не оставил комментарий</Text>
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
          <Title level={4}>Комментарии</Title>
          { comments ? renderNoComments() : renderCommentsBlock() }
        </Col>
        <Divider />
        <Col span={24}>
          <Form.Item label="Написать комментарий" name="comment">
            <TextArea />
          </Form.Item>
        </Col>
        <Col>
          <Button htmlType="submit">Отправить</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentSection;
