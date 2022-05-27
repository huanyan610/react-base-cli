/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import routes from '@/routes/config';
import renderRoutes from '@/routes/index';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import './App.scss';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
