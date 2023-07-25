/**
 * @description
 *
 */
import {} from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import TreeTable from '@/components/TreeTable/index.js';

import styles from './index.module.scss';

const classNames = require('classnames');

interface Iprops {}

const Home: FC<Iprops> = (props) => {
  const {} = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(styles['wrap'])}>
      {t('login.登录')}

      <div>
        <Button type="primary">6666</Button>
        <div className="tw-bg-green-700 tw-mb-30 tw-text-3xl tw-font-bold underline">
          Hello world!
        </div>
        <TreeTable />
      </div>
    </div>
  );
};

export default Home;
