import './App.scss';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { BrowserRouter } from 'react-router-dom';

import routes from '@/routes/config';
import RenderRoute from '@/routes/index';

require('dayjs/locale/zh-cn');

dayjs.locale('zh-cn'); // 全局使用简体中文

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: { borderRadius: 4 },
      }}
    >
      <BrowserRouter>
        <RenderRoute routes={routes} extraProps={{}}></RenderRoute>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
