/**
 * @description
 *
 */
import React, { CSSProperties, FC } from 'react';
import { useNavigate } from 'react-router';

import styles from './index.module.scss';

const classNames = require('classnames');

interface Iprops {
  img?: string;
  style?: CSSProperties;
  onLogoRouter?: () => void;
}

const Logo: FC<Iprops> = (props) => {
  const { img = '', style = {} } = props;
  const history = useNavigate();

  return (
    <div
      className={classNames(styles['LogoWrap'])}
      style={{ ...style }}
      onClick={() => {
        history('/');
      }}
    >
      <img src={img ? img : ''} alt="logo" />
    </div>
  );
};

export default Logo;
