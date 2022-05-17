import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  PostDetails,
  PostsPage,
  AuthPage,
  CreatorOrTag,
  PageTimeshit,
  PageProfessionals,
} from 'pages';
import { Navbar } from 'components';
import ROUTS from 'router/routs';
import { MainLib } from 'lib';

const { Header, Content, Footer } = Layout;
const contentStyle = { padding: '20px 50px' };

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content style={contentStyle}>
          <Switch>
            <Route path={ROUTS.HOME} exact component={() => <Redirect to={ROUTS.POSTS} />} />
            <Route path={ROUTS.POSTS} exact component={PostsPage} />
            <Route path={`${ROUTS.POSTS}/search`} exact component={PostsPage} />
            <Route path={`${ROUTS.POSTS}/:id`} exact component={PostDetails} />
            <Route path={[`${ROUTS.CREATORS}/:name`, `${ROUTS.TAGS}/:name`]} component={CreatorOrTag} />
            <Route path={ROUTS.AUTH} exact component={() => (!user ? <AuthPage /> : <Redirect to={ROUTS.POSTS} />)} />
            <Route path={ROUTS.TIMESHIT} exact component={PageTimeshit} />
            <Route path={ROUTS.PROFESSIONALS} exact component={PageProfessionals} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{MainLib.footerText}</Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
