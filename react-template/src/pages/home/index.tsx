/**
 * @description
 *
 */
import {} from '@ant-design/icons';
import {} from 'antd';
import React, { FC } from 'react';

import styles from './index.module.scss';

const classNames = require('classnames');

interface Iprops {
  data?: any;
}

const Home: FC<Iprops> = (props) => {
  const { data } = props;

  return <div className={classNames(styles['wrap'])}>666666</div>;
};

export default Home;
