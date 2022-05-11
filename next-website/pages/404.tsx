/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Button } from 'antd';
const Custom404: FC = () => {
  const onClick = () => {
    location.replace('/');
  };
  return (
    <div className="page_404">
      <img src="/images/img-empty_404.png" alt="" />
      <div className="page_div">
        <p>很抱歉！您访问的页面迷路了</p>
        <Button type="primary" onClick={onClick}>
          返回首页
        </Button>
      </div>
      <style jsx>
        {`
          .page_404 {
            position: absolute;
            left: 50%;
            top: 10vh;
            transform: translate(-50%, 0%);
            text-align: center;
            .page_div {
              margin-top: -130px;
              p {
                margin-bottom: 16px;
                color: #3a7dff;
              }
            }
            img {
              width: 900px;
              height: 352px;
            }
          }
        `}
      </style>
    </div>
  );
};
export default Custom404;
