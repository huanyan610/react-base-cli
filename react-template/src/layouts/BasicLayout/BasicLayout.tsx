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
import { projectMenuRoutes, roleMenuRoutes } from '@/routes/menuRoutes';

import styles from './BasicLayout.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;
const { SubMenu } = Menu;
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

  const router = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onOpen = (value: any) => {
    console.log(openKeys);
    dispatch(openKeyAction(value));
  };

  const onClickMenu: MenuProps['onClick'] = (path) => {
    router(`${path}`);
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
        <div className={styles['sider-wrapper']}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => {
              dispatch(collapsedAction(value));
            }}
            width={240}
          >
            <Menu
              style={{ height: 'calc(100vh - 107px)', overflowY: 'auto' }}
              mode="inline"
              onOpenChange={onOpen}
              defaultOpenKeys={openKeys}
              selectedKeys={selectKeys}
              openKeys={openKeys}
            >
              {/* 项目权限菜单 */}
              <>
                {projectMenuRoutes?.map((item: any) => (
                  <>
                    {item?.children?.length > 0 ? (
                      <SubMenu key={item?.path} title={item?.name} icon={<></>}>
                        {item?.children?.map((_item: any) => (
                          <>
                            {_item?.children?.length > 0 ? (
                              <>
                                <SubMenu key={_item?.path} title={_item?.name}>
                                  {_item?.children?.map((__item: any) => (
                                    <Menu.Item
                                      key={__item?.path}
                                      onClick={() => onClickMenu(__item?.path)}
                                    >
                                      {__item?.name}
                                    </Menu.Item>
                                  ))}
                                </SubMenu>
                              </>
                            ) : (
                              <Menu.Item key={_item?.path} onClick={() => onClickMenu(_item?.path)}>
                                {_item?.name}
                              </Menu.Item>
                            )}
                          </>
                        ))}
                      </SubMenu>
                    ) : (
                      <>
                        {item && (
                          <Menu.Item
                            key={item?.path}
                            icon={<></>}
                            onClick={() => onClickMenu(item?.path)}
                          >
                            {item?.name}
                          </Menu.Item>
                        )}
                      </>
                    )}
                  </>
                ))}
              </>
              {/* 角色管理权限菜单 */}
              <>
                {roleMenuRoutes?.map((item: any) => (
                  <>
                    {item?.children?.length > 0 ? (
                      <SubMenu key={item?.path} title={item?.name} icon={<></>}>
                        {item?.children?.map((_item: any) => (
                          <>
                            {_item?.children?.length > 0 ? (
                              <>
                                <SubMenu key={_item?.path} title={_item?.name}>
                                  {_item?.children?.map((__item: any) => (
                                    <Menu.Item
                                      key={__item?.path}
                                      onClick={() => onClickMenu(__item?.path)}
                                    >
                                      {__item?.name}
                                    </Menu.Item>
                                  ))}
                                </SubMenu>
                              </>
                            ) : (
                              <Menu.Item key={_item?.path} onClick={() => onClickMenu(_item?.path)}>
                                {_item?.name}
                              </Menu.Item>
                            )}
                          </>
                        ))}
                      </SubMenu>
                    ) : (
                      <>
                        {item && (
                          <Menu.Item
                            key={item?.path}
                            icon={<></>}
                            onClick={() => onClickMenu(item?.path)}
                          >
                            {item?.name}
                          </Menu.Item>
                        )}
                      </>
                    )}
                  </>
                ))}
              </>
            </Menu>
          </Sider>
        </div>
        <div className={styles['sider-menu-wrapper']}></div>
        <MainCb />
      </section>
    </div>
  );
};

export default BasicLayout;
