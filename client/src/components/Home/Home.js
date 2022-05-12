import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { List, Skeleton, Button, Divider, Space, Empty, Row, Col, Drawer, Input, Form } from 'antd';
import { MessageOutlined, LikeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostsBySearch } from '../../actions/posts';
import * as api from '../../api/index.js';
import FormAdd from '../Form/Form';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const configs = {
  drawerWidth: '520px',
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = () => {
  const query = useQuery();

  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(query.get('page') || 1);
  const dispatch = useDispatch();

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const results = await api.fetchPosts(page);
    setTotal(results.data.totalCount);
    // const results = await dispatch(getPosts(page));
    setData([...data, ...results.data.data]);
    setPage(page + 1);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  const [currentId, setCurrentId] = useState(0);

  const history = useHistory();

  const searchPost = (values) => {
    if (values.search.trim() || values.tags) {
      dispatch(getPostsBySearch({ search: values.search, tags: values.tags.join(',') }));
      history.push(`/posts/search?searchQuery=${values.search || 'none'}&tags=${values.tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Button color="primary" onClick={() => setShowSearch(true)} icon={<SearchOutlined />}>Поиск</Button>
      </Col>
      <Col>
        <Button color="primary" onClick={() => setShowAdd(true)} icon={<PlusOutlined />}>Создать запись</Button>
      </Col>
      <Col xs={24} sm={24} md={24}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < total}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider />}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                extra={item.selectedFile
                  ? (
                    <img
                      width={272}
                      alt="logo"
                      src={item.selectedFile}
                    />
                  )
                  : (
                    <Empty imageStyle={{ width: '272px' }} description={false} />
                  )}
                actions={[
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.selectedFile} />}
                  title={<Link to={`/posts/${item._id}`}>{item.title}</Link>}
                  description={item.name}
                />
                {item?.message?.split(' ').splice(0, 80).join(' ')}
                <Divider />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Col>
      <Drawer
        title="Поиск записей"
        width={configs.drawerWidth}
        onClose={() => setShowSearch(false)}
        visible={showSearch}
      >
        <Col>
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={searchPost}
          >
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="search"
                  label="Заголовок"
                >
                  <Input placeholder="Заголовок поста" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tags"
                  label="Тэги"
                >
                  <Input placeholder="Тэги через пробел" />
                </Form.Item>
              </Col>
              <Col>
                <Button onClick={() => setShowSearch(false)}>Отмена</Button>
              </Col>
              <Col>
                <Button htmlType="submit" type="primary">Принять</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Drawer>
      <Drawer
        title="Добавить запись"
        width={configs.drawerWidth}
        onClose={() => setShowAdd(false)}
        visible={showAdd}
      >
        <FormAdd currentId={currentId} setCurrentId={setCurrentId} showForm={showAdd} />
      </Drawer>
    </Row>
  );
};

export default Home;
