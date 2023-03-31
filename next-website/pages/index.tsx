import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>Next.js</main>
    </div>
  );
};

export default Home;
