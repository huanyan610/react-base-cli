/**
 * @description
 *
 */
import React, { FC, CSSProperties } from 'react';
import { useHistory } from 'react-router';
import styles from './index.module.scss';
const classNames = require('classnames');
interface Iprops {
  img?: string;
  style?: CSSProperties;
  onLogoRouter?: () => void;
}

const Logo: FC<Iprops> = (props) => {
  const { img = '', style = {} } = props;
  const history = useHistory();

  return (
    <div
      className={classNames(styles['LogoWrap'])}
      style={{ ...style }}
      onClick={() => {
        history.push('/');
      }}
    >
      <img src={img ? img : ''} alt="logo" />
      LOGO
    </div>
  );
};

export default Logo;
