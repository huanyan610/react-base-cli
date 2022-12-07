import { CheckCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import Header from '@/components/Header';
import IconFont from '@/components/IconFont';
import { collapsedAction, openKeyAction, selectKeyAction } from '@/redux/baseLayout/slice';

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
  const { collapsed, selectKeys, openKeys } = useSelector((state: any) => state.baseLayout);

  const items: MenuProps['items'] = useMemo(
    () => [
      getItem('home', '/home', <CheckCircleOutlined style={{ fontSize: 16, color: '#667180' }} />),
      getItem(
        'hooksDemo',
        '/hooksDemo',
        <SettingOutlined style={{ fontSize: 16, color: '#667180' }} />,
        [getItem('hooksDemo', '/hooksDemo', null)]
      ),
      getItem('sub3', 'sub3', <IconFont type="" style={{ fontSize: 16, color: '#667180' }} />, [
        getItem('sub3-1', 'sub3-1'),
        getItem('sub3-2', 'sub3-2'),
      ]),
    ],
    []
  );

  const router = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onOpen = (value: any) => {
    console.log(openKeys);
    dispatch(openKeyAction(value));
  };

  const onClickMenu: MenuProps['onClick'] = (e) => {
    router(`${e.key}`);
  };

  useEffect(() => {
    let names = location?.pathname?.split('/');
    console.log(router);
    console.log(names, location?.pathname);
    if (location?.pathname) {
      if (!openKeys) {
        dispatch(openKeyAction([`/${names[1]}`]));
      }

      dispatch(selectKeyAction(location?.pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, collapsed, openKeys, dispatch]);

  const MainCb = useCallback(() => {
    return <div className={styles['main']}>{children}</div>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  return (
    <div className={classNames(styles['wrap'])} id="BasicLayoutWrap">
      <Header />
      <section className={styles['content']}>
        <div className={styles['sider']}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => dispatch(collapsedAction(value))}
            width={256}
          >
            <Menu
              style={{ height: 'calc(100vh - 107px)', overflowY: 'auto' }}
              mode="inline"
              onOpenChange={onOpen}
              onClick={onClickMenu}
              defaultOpenKeys={openKeys}
              selectedKeys={selectKeys}
              openKeys={openKeys}
              items={items}
            />
          </Sider>
        </div>
        <MainCb />
      </section>
    </div>
  );
};

export default BasicLayout;
