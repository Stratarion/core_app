import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { List, Skeleton, Button, Divider, Space, Empty, Row, Col, Drawer, Input, Form } from 'antd';
import { MessageOutlined, LikeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as api from 'api/index';
import { getPostsBySearch } from 'actions/posts';
import { PageContainer } from 'components';
import FormAdd from 'components/Form/Form';
import ROUTS from 'router/routs';
import { MainLib } from 'lib';

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

const PostsPage = () => {
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
      history.push(`${ROUTS.posts}/search?searchQuery=${values.search || 'none'}&tags=${values.tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col>
          <Button color="primary" onClick={() => setShowSearch(true)} icon={<SearchOutlined />}>{MainLib.buttons.search}</Button>
        </Col>
        <Col>
          <Button color="primary" onClick={() => setShowAdd(true)} icon={<PlusOutlined />}>{MainLib.posts.createPost}</Button>
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
                    title={<Link to={`${ROUTS.POSTS}/${item._id}`}>{item.title}</Link>}
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
          title={MainLib.posts.searchPosts}
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
                    label={MainLib.posts.title}
                  >
                    <Input placeholder={MainLib.posts.titlePlaceholder} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tags"
                    label={MainLib.posts.tags}
                  >
                    <Input placeholder={MainLib.posts.tagsPlaceholder} />
                  </Form.Item>
                </Col>
                <Col>
                  <Button onClick={() => setShowSearch(false)}>{MainLib.buttons.cancel}</Button>
                </Col>
                <Col>
                  <Button htmlType="submit" type="primary">{MainLib.buttons.accept}</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Drawer>
        <Drawer
          title={MainLib.posts.createPost}
          width={configs.drawerWidth}
          onClose={() => setShowAdd(false)}
          visible={showAdd}
        >
          <FormAdd currentId={currentId} setCurrentId={setCurrentId} showForm={showAdd} />
        </Drawer>
      </Row>
    </PageContainer>
  );
};

export default PostsPage;
