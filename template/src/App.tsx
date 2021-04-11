import React, { useEffect } from 'react';
import routes from '@/routes/config';
import renderRoutes from '@/routes/index';
import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';





// /**
//  * @description 添加统计代码
//  */
// function setCnzzStat() {
//   // 统计
//   if (process.env.REACT_APP_ENV === 'production') {
//     const script: any = document.createElement('script');
//     script.src = 'https://v1.cnzz.com/z_stat.php?id=1279304764&web_id=1279304764';
//     script.language = 'JavaScript';
//     document.body.appendChild(script);
//   }
// }

function App(props: any) {

  useEffect(() => {
    // setCnzzStat();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
