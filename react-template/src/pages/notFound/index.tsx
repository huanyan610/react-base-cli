/**
 * @description
 *
 */
import React, { FC } from 'react';
import { useHistory } from 'react-router';
import styles from './index.module.scss';

const classNames = require('classnames');
interface Iprops {}

const NotFound: FC<Iprops> = (props) => {
  const history = useHistory();
  return (
    <div className={classNames(styles['NotFoundWrap'])}>
      <div style={{ fontSize: 100, textAlign: 'center', marginTop: '22%' }}>404</div>
      <div style={{ fontSize: 20, textAlign: 'center' }}>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => history.push('/')}>
          返回首页
        </span>
      </div>
    </div>
  );
};

export default NotFound;
