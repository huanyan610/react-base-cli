import './App.scss';

import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
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
    <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: { borderRadius: 4, colorPrimary: '#1476ff', colorBorder: '#e9eaeb' },
          components: { Button: { controlHeight: 28 } },
        }}
      >
        <BrowserRouter>
          <RenderRoute routes={routes}></RenderRoute>
        </BrowserRouter>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
