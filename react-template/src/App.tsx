import './App.scss';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import routes from '@/routes/config';
import RenderRoute from '@/routes/index';

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
