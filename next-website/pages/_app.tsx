/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/inline-script-id */
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import localStorage from 'localStorage';
import moment from 'moment';
import Head from 'next/head';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import { Provider } from 'react-redux';
import { useStore } from '@store/index';
import { userTicket, userInfo } from '@api/controller/userController';
import { ssoUrl } from '@utils/env.js';
import { useRouter } from 'next/router';
import { message } from 'antd';
import 'moment/locale/zh-cn';
import '../styles/globals.scss';

moment.locale('zh-cn');
const WebApp = ({ Component, pageProps }: any) => {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();
  const userTicketFetch = async () => {
    const {
      data: { data, code, msg },
    } = await userTicket({ ticket: router?.query?.ticket });
    if (code === 200) {
      Cookies.set('token', data?.token);
      localStorage.setItem('user_info', JSON.stringify(data));
      await userInfoFetch(data?.token);
      router.push('/');
    } else {
      message.error(msg);
      window.location.href = ssoUrl()?.logoutUrl;
    }
  };

  const userInfoFetch = async (value: any) => {
    const {
      data: { data, code, msg },
    } = await userInfo({ token: value });
    if (code === 200) {
      localStorage.setItem('user_info', JSON.stringify(data));
    } else {
      message.error(msg);
      window.location.href = ssoUrl()?.logoutUrl;
    }
  };

  useEffect(() => {
    window.onload = () => {
      if (router?.query?.ticket) {
        console.log(1);
        userTicketFetch();
      } else if (Cookies.get('token')) {
        console.log(2);
        userInfoFetch(Cookies.get('token'));
      } else if (
        (!Cookies.get('token') || !localStorage.getItem('user_info')) &&
        !router?.query?.ticket
      ) {
        console.log(3);
        Cookies.remove('token');
        localStorage.removeItem('user_info');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>成都潜在科技休闲游戏AI官网</title>
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
      </Head>
      <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
          <Component {...pageProps} />
        </ConfigProvider>
      </Provider>
    </>
  );
};

WebApp.getInitialProps = async (_doc: any) => {
  const { Component, ctx } = _doc;
  // 初始化查询是否登录，用于cookie和store数据共享
  // await authVerify(ctx);
  const isServer = !!ctx.req; //判断一下window在不在

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx, isServer });
  }

  return {
    pageProps,
    query: ctx.query,
    pathname: ctx.asPath,
    isServer,
  };
};

export default WebApp;
