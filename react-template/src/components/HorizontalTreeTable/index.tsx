import './index.scss';

import { Checkbox } from 'antd';
import classNames from 'classnames';
import { forOwn } from 'lodash';
import React from 'react';

import BoxItem from './components/BoxItem/index';
import { PBoxItemProps } from './components/BoxItem/type';
import { defaultFieldNames, joinUid } from './data';
import Header from './Header';
import { DHeaderColumn, PHorizontalTreeTableProps } from './type';

const defaultHeaderColumn: DHeaderColumn[] = [
  {
    key: 'gnmok',
    title: '功能模块',
    className: 'full-item',
    style: { flex: 1 },
  },
  {
    key: 'gnd',
    title: '功能点',
    style: { flex: 2 },
    direction: 'column',
    className: 'column-item',
  },
  {
    key: 'zgn',
    title: '子功能',
    direction: 'column',
    style: { flex: 1 },
    render: (nodes, item) => {
      return <div className="auth-grp-item">{nodes}</div>;
    },
  },
  {
    key: 'xjgn',
    title: '下级功能',
    style: { flex: 5 },
    direction: 'column',
  },
];

const HorizontalTreeTable: React.FC<PHorizontalTreeTableProps> = (props) => {
  const {
    header = defaultHeaderColumn,
    items,
    readyOnly = false,
    fieldNames = {},
    selected = [],
    onChangeCheckbox,
    maxLevel = Math.max(header.length, props.maxLevel || 0),
    disabled = false,
    minBoxWidth = '100%',
  } = props;
  const {
    status = 'status',
    children = 'children',
    label = 'label',
    value = 'value',
  } = {
    ...defaultFieldNames,
    ...fieldNames,
  };
  const _fields = { status, children, label, value };

  const parseItemRow = (supItem: any, supItemIndex: number) => {
    let nodeRow: any[] = [];

    const _renderRow = (item: any, sup?: any, level = 0, loopIndex: number = 0) => {
      const children = item[_fields.children];

      // 取得每一个数据的唯一坐标key
      const supKey = sup ? sup.key : supItemIndex;
      item.key = joinUid([supKey, loopIndex]);

      // 记录每一个数据
      // 对象形式
      if (!nodeRow[level]) nodeRow[level] = {};
      if (!nodeRow[level][supKey]) nodeRow[level][supKey] = [];

      const BoxItemProps: PBoxItemProps<any> = {
        style: { minWidth: minBoxWidth },
        key: item.key,
        originItem: item,
        level: level + 1,
        sup: sup,
        fieldsNames: _fields,
        originItems: items || [],
        selected: selected,
        disabled: disabled,
        readyOnly: readyOnly,
        onChangeCheckbox: onChangeCheckbox,
        computeSize: true,
        copyLable: true,
      };

      // 以上级未分类
      nodeRow[level][supKey].push(<BoxItem {...BoxItemProps} />);

      if (children && children.length > 0) {
        children.forEach((_item: any, index: number) => _renderRow(_item, item, level + 1, index));
      }
    };
    _renderRow(supItem);
    return nodeRow;
  };

  const createTreetableColumn = (key: any, isEmpty = false, column?: any) => {
    if (isEmpty) {
      return <div key={key} className="treetable-item empty" data-key={key}></div>;
    }
    return (
      <div key={key} className="treetable-item" data-key={key}>
        {column}
      </div>
    );
  };

  const renderColumn = (row: any) => {
    return row.map((columns: any, idx: number) => {
      const { direction = 'row', style, className } = header[idx] || {};
      const _className = classNames('treetable-column', className, 'column-level-' + idx, {
        'direction-row': 'row' === direction,
        'direction-column': 'column' === direction,
      });
      if (!columns || columns.length < 1) {
        return (
          <div key={idx} className={_className} style={style}>
            <div className="treetable-empty-item"></div>
          </div>
        );
      }
      const grpItems: React.ReactNode[] = [];
      // 当前与上级比较
      const prevColumns = row[idx - 1];

      if (prevColumns) {
        forOwn(prevColumns, (supColumns, supKey) => {
          supColumns.forEach((supColumn: any) => {
            const key = supColumn.key;
            const subCurColumn = columns[key];
            // 有
            if (subCurColumn && subCurColumn.length) {
              grpItems.push(createTreetableColumn(key, false, subCurColumn));
            }
            // 下级没有子节点
            else {
              // !!!让下级这一行一直保持空状态
              columns[key] = [createTreetableColumn(joinUid([key, 0]), true)];
              grpItems.push(createTreetableColumn(key, true));
            }
          });
        });
      } else {
        forOwn(columns, (column, key) => {
          grpItems.push(createTreetableColumn(key, false, column));
        });
      }

      // @ts-ignore
      grpItems.sort((a, b) => a.key > b.key);

      return (
        <div key={idx} className={_className} style={style}>
          {grpItems}
        </div>
      );
    });
  };

  const renderCheckbok = () => {
    return items
      ?.map((pitem, index) => parseItemRow(pitem, index))
      .map((row, index) => {
        // 填充满
        const rows = [...row, ...Array(maxLevel)].slice(0, maxLevel);

        return (
          <div className="treetable-row" key={index}>
            {renderColumn(rows)}
          </div>
        );
      });
  };

  return (
    <div className={classNames('horizontal-treetable')}>
      <Header columns={header} maxLevel={maxLevel} />
      <Checkbox.Group className="treetable-body" value={selected}>
        {renderCheckbok()}
      </Checkbox.Group>
    </div>
  );
};

export default HorizontalTreeTable;
