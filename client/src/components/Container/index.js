import React from 'react';
import classes from './classes.module.scss';

export const PageContainer = (props) => {
  const { children } = props;
  return (
    <div className={classes.pageContainer}>
      {children}
    </div>
  );
};
