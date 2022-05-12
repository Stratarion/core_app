import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PostDetails, PostsPage, AuthPage, CreatorOrTag, PageTimeshit } from 'pages';
import { Navbar } from 'components';

const { Header, Content, Footer } = Layout;

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={PostsPage} />
            <Route path="/posts/search" exact component={PostsPage} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
            <Route path="/auth" exact component={() => (!user ? <AuthPage /> : <Redirect to="/posts" />)} />
            <Route path="/timeshit" exact component={PageTimeshit} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
