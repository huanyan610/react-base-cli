import React, { useEffect, useState } from 'react';

import styles from './BasicLayout.module.scss';
import BaseLayoutHeader from '@/components/BaseLayoutHeader';
import classNames from 'classnames';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useHistory } from 'react-router';
import IconFont from '@/components/IconFont';
import './index.scss';

const BasicLayout = (props: any) => {
  const history = useHistory();
  const onClick: MenuProps['onClick'] = (e) => {
    history.push(`/${e.key}`);
  };
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label?: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode | null,
    children?: MenuItem[],
    type?: string
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('sub1', 'sub1', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />, [
      getItem('sub1-1', 'sub1-1'),
      getItem('sub1-2', 'sub1-2'),
      getItem('sub1-3', 'sub1-3'),
    ]),
    getItem('sub2', 'sub2', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />, [
      getItem('sub2-1', 'sub2-1'),
    ]),
    getItem('sub3', 'sub3', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />, [
      getItem('sub3-1', 'sub3-1'),
      getItem('sub3-2', 'sub3-2'),
    ]),
  ];
  let [subName, setSubName] = useState('sub1');
  let [childName, setChildName] = useState('sub1-1');

  useEffect(() => {
    let path = window.location.pathname;
    if (path !== '/') {
      let pathName = path.slice(1);
      let sub = 'sub1';
      items.forEach((item: any) => {
        item.children.forEach((child: any) => {
          if (child.key === pathName) {
            sub = item.key;
          }
        });
      });
      if (sub !== 'sub1') {
        setSubName(sub);
      }
      setChildName(pathName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles['BasicLayoutWrap'])} id="BasicLayoutWrap">
      <header className={classNames(styles['basic-header'])}>
        <BaseLayoutHeader />
      </header>
      <div className={styles['basic-content']}>
        <div className={styles['basic-left']}>
          <Menu
            key={childName}
            onClick={onClick}
            style={{ width: 220 }}
            defaultSelectedKeys={[childName]}
            defaultOpenKeys={[subName]}
            mode="inline"
            items={items}
          />
        </div>
        <div className={styles['basic-right']}>{props.children}</div>
      </div>
    </div>
  );
};

export default BasicLayout;
