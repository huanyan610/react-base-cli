import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';

import Logo from '@/components/Logo';
import UserHeader from '@/components/UserHeader';

import styles from './index.module.scss';

let { Option } = Select;

const classNames = require('classnames');

interface Iprops {
  img?: string;
  style?: CSSProperties;
  logoStyle?: CSSProperties;
}

const Header: FC<Iprops> = (props) => {
  const { id } = useSelector((state: any) => {
    return state.user;
  });

  return (
    <div className={classNames(styles['wrap'], 'flex', 'flex-align-center')}>
      <Logo />
      <div style={{ marginLeft: 12 }}>
        <Select
          value={1}
          dropdownStyle={{ minWidth: 156 }}
          placeholder="请选择项目"
          className="project-select"
          optionFilterProp="label"
          bordered={false}
          suffixIcon={<CaretDownOutlined style={{ fontSize: 12, color: 'rgb(103,104,115)' }} />}
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

export default Header;
