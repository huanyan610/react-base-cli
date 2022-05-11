import React from 'react';

import styles from './BasicLayout.module.scss';

const BasicLayout = (props: any) => {
  return <div className={styles['basic-layout-wrap']}>{props.children}</div>;
};

export default BasicLayout;
