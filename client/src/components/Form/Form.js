import React, { useEffect } from 'react';
import { Card, Button, Col, Row, Input, Typography, Form as AForm } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const { Text, Title } = Typography;
// import { Drawer, Form as AntForm, Button as AntButton, Col, Row, Input, Select, DatePicker, Space } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// const { Option } = Select;

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

  // const handleAddChip = (tag) => {
  //   setPostData({ ...postData, tags: [...postData.tags, tag] });
  // };

  // const handleDeleteChip = (chipToDelete) => {
  //   setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  // };

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
      {/* <Paper className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div style={{ padding: '5px 0', width: '94%' }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper> */}
    </>
  );
};

export default Form;
