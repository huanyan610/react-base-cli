import React, { FC, CSSProperties } from 'react';
import styles from './index.module.scss';

import Logo from '@/components/Logo';
import UserHeader from '@/components/UserHeader';
import { useSelector } from 'react-redux';
import IconFont from '@/components/IconFont';
import { Select } from 'antd';
let { Option } = Select;

const classNames = require('classnames');
interface Iprops {
  img?: string;
  style?: CSSProperties;
  logoStyle?: CSSProperties;
}

const BaseLayoutHeader: FC<Iprops> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userInfo } = useSelector((state: any) => {
    return state.userReducer;
  });

  return (
    <div className={classNames(styles['BaseLayoutHeaderWrap'], 'flex', 'flex-align-center')}>
      <Logo />
      <div className="header-game" style={{ marginLeft: 12 }}>
        <Select
          value={1}
          dropdownStyle={{ minWidth: 156 }}
          placeholder="请选择项目"
          className="content-select"
          optionFilterProp="label"
          bordered={false}
          suffixIcon={<IconFont type="" style={{ fontSize: 12, color: 'rgb(103,104,115)' }} />}
          onChange={(value: any) => {
            console.log(value);
          }}
        >
          <Option value={1}>{1}</Option>
          <Option value={2}>{2}</Option>
        </Select>
      </div>
      <span className={classNames(styles['nav-right'])}>
        <UserHeader />
      </span>
    </div>
  );
};

export default BaseLayoutHeader;
