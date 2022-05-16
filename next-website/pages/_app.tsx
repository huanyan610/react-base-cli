import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import localStorage from 'localStorage';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import App from 'next/app';
import { wrapper } from '@store/index';
import Head from 'next/head';
import NProgress from 'nprogress';
import { userTicket, userInfo } from '@api/controller/userController';
import { useRouter } from 'next/router';
import { message } from 'antd';
import 'moment/locale/zh-cn';
import 'nprogress/nprogress.css';
import 'antd-mobile/es/global';
import 'antd/dist/antd.css';
import '../styles/globals.scss';
NProgress.configure({ easing: 'ease', showSpinner: false });
moment.locale('zh-cn');
const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();
  // const userTicketFetch = async () => {
  //   const {
  //     data: { data, code, msg },
  //   } = await userTicket({ ticket: router?.query?.ticket });
  //   if (code === 200) {
  //     Cookies.set('token', data?.token);
  //     localStorage.setItem('user_info', JSON.stringify(data));
  //     await userInfoFetch(data?.token);
  //     router.push('/');
  //   } else {
  //     message.error(msg);
  //     // window.location.href = ssoUrl()?.logoutUrl;
  //   }
  // };

  // const userInfoFetch = async (value: any) => {
  //   const {
  //     data: { data, code, msg },
  //   } = await userInfo({ token: value });
  //   if (code === 200) {
  //     localStorage.setItem('user_info', JSON.stringify(data));
  //   } else {
  //     message.error(msg);
  //     // window.location.href = ssoUrl()?.logoutUrl;
  //   }
  // };

  // const init = async () => {
  //   if (router?.query?.ticket) {
  //     console.log(1);
  //     userTicketFetch();
  //   } else if (Cookies.get('token')) {
  //     console.log(2);
  //     userInfoFetch(Cookies.get('token'));
  //   } else if (
  //     (!Cookies.get('token') || !localStorage.getItem('user_info')) &&
  //     !router?.query?.ticket
  //   ) {
  //     console.log(3);
  //     Cookies.remove('token');
  //     localStorage.removeItem('user_info');
  //   }
  // };

  useEffect(() => {
    // init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta charSet="utf-8" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
          /> */}
          <meta content="width=device-width, initial-scale=1.0" name="viewport"></meta>
          {/* <meta name="viewport" content="user-scalable=yes" /> */}
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
          <meta name="mobile-agent" content="format=html5;" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="robots" content="index,follow" />
          <meta name="360-site-verification" content="360" />
          <meta name="renderer" content="webkit" />
          <meta property="og:title" content="" />
          <meta property="og:url" content="" />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:description" content="" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
};
MyApp.getInitialProps = wrapper.getInitialAppProps((store: any) => async (context: any) => {
  // Keep in mind that this will be called twice on server, one for page and second for error page
  store.dispatch({ type: 'APP', payload: 'was set in _app' });

  return {
    pageProps: {
      // https://nextjs.org/docs/advanced-features/custom-app#caveats
      ...(await App.getInitialProps(context)).pageProps,
      // Some custom thing for all pages
      appProp: context.ctx.pathname,
    },
  };
});
export default wrapper.withRedux(MyApp);
