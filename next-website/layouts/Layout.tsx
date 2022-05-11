// 只有顶部导航
import React, { FC } from 'react';

interface Iprops {
  title?: string;
  children?: any;
}

const Layout: FC<Iprops> = ({ children, title = '' }) => (
  <div className="container flex flex-v">
    <div>{children}</div>
    <style jsx>
      {`
        .container {
          background: #f7f7f7;
          min-height: 100vh;
          min-width: 1200px;
        }
      `}
    </style>
  </div>
);

export default Layout;
