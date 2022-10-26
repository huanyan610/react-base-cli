/**
 * @description
 *
 */
import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import styles from './index.module.scss';

const classNames = require('classnames');

interface Iprops {}

const NotFound: FC<Iprops> = (props) => {
  const history = useNavigate();
  return (
    <div className={classNames(styles['NotFoundWrap'])}>
      <div style={{ fontSize: 100, textAlign: 'center', marginTop: '22%' }}>404</div>
      <div style={{ fontSize: 20, textAlign: 'center' }}>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => history('/')}>
          返回首页
        </span>
      </div>
    </div>
  );
};

export default NotFound;
