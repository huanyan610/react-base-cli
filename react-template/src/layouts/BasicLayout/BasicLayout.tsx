import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Header from '@/components/Header';
import IconFont from '@/components/IconFont';
import Logo from '@/components/Logo';

import styles from './BasicLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

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

const BasicLayout = (props: any) => {
  const { children } = props;

  const items: MenuProps['items'] = useMemo(
    () => [
      getItem('Home', '', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />),
      getItem(
        'hooksDemo',
        'hooksDemo',
        <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />,
        [getItem('hooksDemo', 'hooksDemo')]
      ),
      getItem('sub3', 'sub3', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />, [
        getItem('sub3-1', 'sub3-1'),
        getItem('sub3-2', 'sub3-2'),
      ]),
    ],
    []
  );

  const navigate = useNavigate();
  const location = useLocation();
  let [subName, setSubName] = useState('');
  let [childName, setChildName] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const onClickMenu: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };

  useEffect(() => {
    let path = window.location.pathname;
    let pathName = path.slice(1);
    let sub = '';
    items?.forEach((item: any) => {
      item?.children?.forEach((child: any) => {
        if (child.key === pathName) {
          sub = item.key;
        }
      });
    });

    if (sub !== '') {
      setSubName(sub);
    }
    setChildName(pathName);
  }, [location.pathname, items]);

  const SiderCb = useCallback(() => {
    return (
      <div className={styles['sider']}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={256}
        >
          <Logo />
          <Menu
            style={{ height: 'calc(100vh - 107px)', overflowY: 'auto' }}
            key={childName}
            onClick={onClickMenu}
            defaultSelectedKeys={[childName]}
            defaultOpenKeys={[subName]}
            mode="inline"
            items={items}
          />
        </Sider>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childName, subName, collapsed, items]);

  const MainCb = useCallback(() => {
    return <div className={styles['main']}>{children}</div>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  return (
    <div className={classNames(styles['wrap'], 'flex')} id="BasicLayoutWrap">
      <SiderCb />
      <section className={styles['content']}>
        <Header />
        <MainCb />
      </section>
    </div>
  );
};

export default BasicLayout;
