/**
 * @description header的下拉菜单
 *
 */
import React, { FC } from 'react';
import styles from './index.module.scss';

const classNames = require('classnames');

interface IlistItem {
  icon?: any;
  name?: string;
  key?: number;
  [index: string]: any;
}

interface Iprops {
  list: IlistItem[];
  activeIndex?: number | null;
  onSelect?: (value: IlistItem, index: number) => void;
  isCurrentNav?: boolean;
}

const UserDropList: FC<Iprops> = (props) => {
  const { list = [], onSelect, activeIndex = null, isCurrentNav } = props;

  return (
    <div className={classNames(styles['wrap'])}>
      {list.map((item, index) => {
        return (
          <div
            className={classNames(styles['list-item'], 'flex flex-align-center')}
            key={item.name}
            onClick={() => onSelect && onSelect(item, index)}
            style={isCurrentNav && activeIndex === index ? { background: '#edeef7' } : {}}
          >
            <span className={classNames(styles['list-item-icon'], 'flex flex-align-center')}>
              {item.icon}
            </span>
            <span className={classNames(styles['list-item-name'], 'flex flex-align-center')}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default UserDropList;
