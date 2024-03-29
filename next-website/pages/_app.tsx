import 'nprogress/nprogress.css';
import '../styles/globals.scss';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'antd/dist/reset.css';

import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import ConfigProvider from 'antd/lib/config-provider';
import zh_CN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parse } from 'next-useragent';
import NProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { sleep } from 'utils/index';

import { wrapper } from '@/redux/store';

require('dayjs/locale/zh-cn');

dayjs.locale('zh-cn'); // 全局使用简体中文
NProgress.configure({ easing: 'ease', showSpinner: false });

const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const [ssgua, setUa] = useState<any>({ isMobile: false });

  let ssrua = parse(pageProps?.userAgent);

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
    if (typeof window !== 'undefined') {
      window.onload = () => {
        document.getElementById('holderStyle')?.remove();
      };
    }
  });
  useEffect(() => {
    setUa(parse(window.navigator.userAgent));
  }, [router]);
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleComplete = () => {
      sleep(1000).then(() => {
        NProgress.done();
        NProgress.remove();
      });
    };
    const handleStop = () => {
      sleep(1000).then(() => {
        NProgress.done();
        NProgress.remove();
      });
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
      <Head>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
      /* https://github.com/ant-design/ant-design/issues/16037#issuecomment-483140458 */
      /* Not only antd, but also any other style if you want to use ssr. */
      *, *::before, *::after {
        transition: none!important;
      }
    `,
          }}
        />
      </Head>

      <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
        <ConfigProvider locale={zh_CN}>
          <Component {...pageProps} device={pageProps?.userAgent ? ssrua : ssgua} />
        </ConfigProvider>
      </StyleProvider>
    </>
  );
};
MyApp.getInitialProps = wrapper.getInitialAppProps((store: any) => async (context: any) => {
  return {
    pageProps: {
      userAgent: context.ctx.req?.headers['user-agent'],
      appProp: context.ctx.pathname,
    },
  };
});
export default wrapper.withRedux(MyApp);
