import React, { useState, useEffect } from 'react';
import { AppBar, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { List, Skeleton, Button, Divider, Space, Empty, Row, Col, Drawer } from 'antd';
import { MessageOutlined, LikeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostsBySearch } from '../../actions/posts';
import * as api from '../../api/index.js';

// import Posts from '../Posts/Posts';
import Form from '../Form/Form';
// import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');

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
    console.log(results);
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

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

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
                {item.message.split(' ').splice(0, 80).join(' ')}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Col>
      <Drawer
        title="Поиск записей"
        onClose={() => setShowSearch(false)}
        visible={showSearch}
      >
        <Col>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
            <ChipInput
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
              variant="outlined"
            />
            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
          </AppBar>
        </Col>
      </Drawer>
      <Drawer
        title="Добавить запись"
        onClose={() => setShowAdd(false)}
        visible={showAdd}
      >
        <Form currentId={currentId} setCurrentId={setCurrentId} showSearch={showAdd} />
      </Drawer>
    </Row>
  );
};

export default Home;
