import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const Home = () => {
  const history = useHistory();
  return (
    <div className={styles['home-wrap']}>
      <div className={styles['home-wrap-inner']}>
        <Button onClick={() => history.push('/hooksDemo')}>toDemo</Button>
        <Button onClick={() => history.push('/interView')}>toInterView</Button>
      </div>
    </div>
  );
};

export default Home;
