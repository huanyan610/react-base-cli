import './index.scss';

import { Checkbox } from 'antd';
import classNames from 'classnames';
import { isArray } from 'lodash';
import React, { CSSProperties } from 'react';
import { PBoxItemProps } from './type';
import { filterSubChild, getSubChild } from '@/utils/iteratree';

const BoxItem: React.FC<PBoxItemProps> = ({
  className,
  style,
  originItem,
  level,
  sup,
  fieldsNames,
  itemHeight = 40,
  originItems,
  readyOnly,
  selected,
  disabled = false,
  isEmpty = false,
  computeSize = false,
  copyLable = false,
  onChangeCheckbox,
}) => {
  const statusKey = fieldsNames['status'] || 'status';
  const childrenKey = fieldsNames['children'] || 'children';
  const labelKey = fieldsNames['label'] || 'label';
  const valueKey = fieldsNames['value'] || 'value';

  const sub = originItem[childrenKey];

  const isSelected = (auth: any, can = true) => {
    if (!can) {
      return false;
    }
    return auth[statusKey] === 1;
  };

  const getExtraStyle = (): CSSProperties => {
    if (!computeSize) {
      return {};
    }
    const lastSub = filterSubChild(
      sub,
      (item: any) => {
        return !(isArray(item[childrenKey]) && item[childrenKey].length);
      },
      childrenKey
    );

    if (void 0 === originItem.lastSubLength) {
      originItem.lastSubLength = lastSub.length;
    }

    const lastSubLength = originItem.lastSubLength;
    const height = lastSubLength ? lastSubLength * itemHeight : itemHeight;
    return {
      minHeight: height,
    };
  };

  const getCheckboxStyle = (): CSSProperties => {
    if (!computeSize) {
      return {};
    }

    return {
      lineHeight: itemHeight - 1 + 'px',
      // @ts-ignore
      minHeight: extraStyle.minHeight - 1,
    };
  };

  const renderCheckBox = (
    auth: any,
    level: number,
    sup: any | undefined,
    sub: any[] | undefined
  ) => {
    const can = sup ? selected.includes(sup[valueKey]) : true;
    const _disabled = disabled ? true : !can || readyOnly;
    const defaultChecked = isSelected(auth, !_disabled);
    return (
      <Checkbox
        style={checkboxStyle}
        onChange={(event) => {
          const { checked, value } = event.target;
          // 得到 selected 中已经被选中的下级 id
          const subIds = getSubChild(sub, undefined, fieldsNames);
          let _diff: any[];

          if (checked) {
            _diff = [...selected, value, ...subIds];
          } else {
            // 当勾掉时，去掉下级已经选择了的
            if (sub && sub.length > 0) {
              const diff = selected.filter((item: any) => !subIds.includes(item));
              _diff = diff.filter((item: any) => item !== value);
            } else {
              _diff = selected.filter((item: any) => item !== value);
            }

            if (sup) {
              const supSuball = getSubChild(sup[childrenKey], undefined, fieldsNames);
              const selectdSuball = _diff.filter((i) => supSuball.includes(i));
              // 上级的下级都没被选中
              // ！！！去掉上级
              if (selectdSuball.length < 1) {
                _diff = _diff.filter((i) => i !== sup[valueKey]);
              }
            }

            // 去掉上上级
            if (level === 3) {
              const root = originItems
                .filter((item: any) => item[valueKey] === sup['parent_id'])
                .pop();

              // 根级别下一级的
              const rootSub = root[childrenKey]?.map((item: any) => item[valueKey]);
              // 找到上级兄弟选择多少个
              const supSelected = _diff.filter((i) => rootSub.includes(i));

              // ！！！去掉根级别
              if (supSelected.length < 1) {
                _diff = _diff.filter((i) => i !== root[valueKey]);
              }
            }
          }

          onChangeCheckbox && onChangeCheckbox(_diff, { event, auth, level, sup, sub });
        }}
        disabled={_disabled}
        defaultChecked={defaultChecked}
        value={auth[valueKey]}
      >
        <div>{auth[labelKey]}</div>
      </Checkbox>
    );
  };

  if (isEmpty) {
    return <div className={classNames('box-item', 'empty')}></div>;
  }

  const extraStyle = getExtraStyle();
  const checkboxStyle = getCheckboxStyle();

  return (
    <div
      className={classNames('box-item', className, {
        isRoot: !sup,
        hasSubChild: isArray(sub) && sub.length,
      })}
      style={{ ...style, ...extraStyle }}
      data-item-key={originItem.key}
      data-sub-length={isArray(sub) ? sub.length : 0}
    >
      {renderCheckBox(originItem, level, sup, sub)}
    </div>
  );
};

export default BoxItem;
