/**
 * @description
 *
 */
import { CaretDownOutlined, ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import Cookies from 'js-cookie';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { userLogout } from '@/api/apiServer/apiUser';
import HeaderDropList from '@/components/UserDropList';

import styles from './index.module.scss';

const classNames = require('classnames');

interface Iprops {}

const UserHeader: FC<Iprops> = (props) => {
  const { id, name } = useSelector((state: any) => {
    return state.user;
  });

  const history = useNavigate();
  const [userCenterList, setUserCenterList] = useState<any>([]);

  useEffect(() => {
    setUserCenterList([
      {
        icon: <ExportOutlined style={{ fontSize: 14, color: '#363966' }} />,
        name: '退出登录',
        key: 1,
      },
    ]);
  }, [id]);

  const onSelect = async (item: any, index: number) => {
    switch (item.key) {
      case 1:
        await fetchOutLogin();
        break;
      default:
        break;
    }
  };

  const fetchOutLogin = async () => {
    try {
      const resData = await userLogout();
      const {
        data: { code, msg },
      } = resData;
      if (code === 200) {
        Cookies.remove('user_info');
        history('/login');
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  return (
    <div className={classNames(styles['wrap'])}>
      <div
        className={classNames(
          styles['nav-right'],
          'flex flex-inline flex-align-center flex-justify-center'
        )}
      >
        <span className={classNames('flex flex-inline flex-align-center')}>
          <Dropdown
            overlay={<HeaderDropList list={userCenterList} onSelect={onSelect} />}
            trigger={['click']}
          >
            <span
              className={classNames('flex flex-inline flex-align-center')}
              style={{ height: 60, cursor: 'pointer', color: '#333840' }}
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined style={{ fontSize: 16, marginRight: 8 }} />
              {name || '管理员'}
              <CaretDownOutlined type="iconarrow_linear" style={{ fontSize: 12, marginLeft: 8 }} />
            </span>
          </Dropdown>
        </span>
      </div>
    </div>
  );
};

export default UserHeader;
