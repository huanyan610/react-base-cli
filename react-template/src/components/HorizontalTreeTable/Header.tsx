import './index.scss';

import React from 'react';

import { PHeaderProps } from './type';

const Header: React.FC<PHeaderProps> = (props) => {
  const { columns, maxLevel = 3 } = props;

  return (
    <div className="treetable-head treetable-row">
      {columns
        ? columns.map((_, idx) => {
            return idx < maxLevel ? (
              <div className="treetable-column full-item" key={_.key || idx} style={_.style}>
                <div className="treetable-item">
                  <div className="box-item">{_.title}</div>
                </div>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default Header;
