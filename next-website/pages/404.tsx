import { Button } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import React, { FC } from 'react';

import styles from './404.module.scss';

const Custom404: FC = () => {
  const onClick = () => {
    location.replace('/');
  };
  return (
    <div className={classNames(styles['page_404'])}>
      <Image src="/images/img-empty_404.png" width={900} height={350} alt="404" />
      <div className={classNames(styles['page_div'])}>
        <p>很抱歉！您访问的页面迷路了</p>
        <Button type="primary" onClick={onClick}>
          返回首页
        </Button>
      </div>
    </div>
  );
};
export default Custom404;
