import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import '@/styles/global.scss';
import './tailwind.scss';

import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from '@/locales/i18n';
import store from '@/redux/store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

require('dayjs/locale/zh-cn');

dayjs.locale('zh-cn'); // 全局使用简体中文

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={i18n}>
    <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: { borderRadius: 4, colorPrimary: '#1476ff', colorBorder: '#e9eaeb' },
          components: { Button: { controlHeight: 28 } },
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </StyleProvider>
  </I18nextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
