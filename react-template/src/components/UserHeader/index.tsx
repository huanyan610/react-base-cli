/**
 * @description
 *
 */
import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import IconFont from '@/components/IconFont';
import { Dropdown, message } from 'antd';
import HeaderDropList from '@/components/UserDropList';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { userLogout } from '@/api/apiServer/apiUser';
import Cookies from 'js-cookie';

const classNames = require('classnames');
interface Iprops {}

const UserHeader: FC<Iprops> = (props) => {
  const { userInfo = {} } = useSelector((state: any) => {
    return state.userReducer;
  });

  const history = useHistory();
  const [userCenterList, setUserCenterList] = useState<any>([]);

  useEffect(() => {
    setUserCenterList([
      {
        icon: (
          <IconFont type="iconheader_exit" style={{ fontSize: 22, color: '#363966' }}></IconFont>
        ),
        name: '退出登录',
        key: 1,
      },
    ]);
  }, [userInfo?.user_id]);

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
        history.push('/login');
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  return (
    <div className={classNames(styles['UserHeaderWrap'])}>
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
              <IconFont type="icon-list" style={{ fontSize: 28, marginRight: 8 }} />
              {userInfo?.user_name || '管理员'}
              <IconFont
                className={classNames(styles['icon'])}
                type="iconarrow_linear"
                style={{ fontSize: 12, marginLeft: 8 }}
              />
            </span>
          </Dropdown>
        </span>
      </div>
    </div>
  );
};

export default UserHeader;
