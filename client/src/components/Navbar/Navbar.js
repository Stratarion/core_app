import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Menu, Button, Row, Col, Avatar } from 'antd';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

// const pages = ['Products', 'Pricing', 'Blog'];

const pages = [
  {
    title: 'Расписание',
    link: '/timeshit',
  },
  {
    title: 'Работники',
    link: '/professionals',
  },
  {
    title: 'Блог',
    link: '/posts',
  },
];

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentPage, setCurrentPage] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const currentPathIndex = pages.findIndex((item) => location.pathname.includes(item.link));
    console.log(currentPathIndex);
    if (currentPathIndex >= 0) setCurrentPage(pages[currentPathIndex].link);
  }, [location.pathname]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <Row justify="space-between">
      <Col span={18}>
        <Menu theme="dark" selectedKeys={[currentPage]} mode="horizontal">
          {pages.map((menuItem) => (
            <Menu.Item key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      {user?.result ? (
        <>
          <Col span={1} offset={3}>
            <Avatar className={classes.purple} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          </Col>
          <Col span={2}>
            <Button className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </Col>
        </>
      ) : (
        <Col span={2}>
          <Button component={Link} color="primary">
            <Link to="/auth">Sign In</Link>
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default Navbar;
