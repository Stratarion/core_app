import React, { useEffect } from 'react';
import { Card, Button, Col, Row, Input, Typography, Form as AForm } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const { Text, Title } = Typography;

const Form = ({ currentId, setCurrentId, showForm }) => {
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
  };

  useEffect(() => {
    if (!post?.title) clear();
  }, [post]);

  const handleSubmit = async (values) => {
    const postData = {
      title: values.title,
      message: values.message,
      tags: values.tags,
      selectedFile: values.selectedFile,
    };

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Card bordered>
        <Text>Please Sign In to create your own memories and like others memories.</Text>
      </Card>
    );
  }

  return (
    <>
      <AForm onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Title>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="title"
            >
              <Input placeholder="title" />
            </AForm.Item>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="message"
            >
              <Input placeholder="message" />
            </AForm.Item>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="tags"
            >
              <Input placeholder="tags" />
            </AForm.Item>
          </Col>
          <Col>
            <Button onClick={() => showForm(false)}>Отмена</Button>
          </Col>
          <Col>
            <Button htmlType="submit" type="primary">Принять</Button>
          </Col>
        </Row>
      </AForm>
    </>
  );
};

export default Form;
