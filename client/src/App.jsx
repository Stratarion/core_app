import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from 'components';
import { MainLib } from 'lib';
import Router from 'router';

const { Header, Content, Footer } = Layout;
const contentStyle = { padding: '20px 50px' };

const App = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Header>
        <Navbar />
      </Header>
      <Content style={contentStyle}>
        <Router />
      </Content>
      <Footer style={{ textAlign: 'center' }}>{MainLib.footerText}</Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
