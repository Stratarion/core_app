import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  PostDetails,
  PostsPage,
  AuthPage,
  CreatorOrTag,
  PageTimeshit,
  PageProfessionals,
} from 'pages';
import ROUTS from 'router/routs';

const Router = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
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
  );
};

export default Router;
