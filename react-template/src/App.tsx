/* eslint-disable @typescript-eslint/no-unused-vars */
import 'moment/locale/zh-cn';
import './App.scss';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import { BrowserRouter } from 'react-router-dom';

import routes from '@/routes/config';
import RenderRoute from '@/routes/index';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <RenderRoute routes={routes} extraProps={{}}></RenderRoute>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
