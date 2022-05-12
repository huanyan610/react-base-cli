/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/inline-script-id */
import React, { FC, useEffect } from 'react';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import { AppProps } from 'next/app';
import { wrapper } from '@store/index';
import { useStore } from 'react-redux';
import NProgress from 'nprogress';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import 'moment/locale/zh-cn';
import 'nprogress/nprogress.css';
import '../styles/globals.scss';
NProgress.configure({ easing: 'ease', showSpinner: false });
moment.locale('zh-cn');
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const store: any = useStore();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleComplete = () => {
      NProgress.done();
      window.scrollTo(0, 0);
      NProgress.remove();
    };
    const handleStop = () => {
      NProgress.done();
      NProgress.remove();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <ConfigProvider locale={zh_CN}>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `document.write(
              unescape(
                "%3Cspan class='cnzz' id='cnzz_stat_icon_1280999401'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D1280999401' type='text/javascript'%3E%3C/script%3E"
              )
            )`,
            }}
          />
          <Component {...pageProps} />
        </PersistGate>
      </ConfigProvider>
    </>
  );
};
export default wrapper.withRedux(MyApp);
