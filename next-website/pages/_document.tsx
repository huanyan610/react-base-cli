import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
          />
          <meta name="viewport" content="user-scalable=yes" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
          <meta name="mobile-agent" content="format=html5;" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="robots" content="index,follow" />
          <meta name="360-site-verification" content="360" />
          <meta name="renderer" content="webkit" />
          <meta property="og:title" content="nextjs-web" />
          <meta property="og:url" content="" />
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:description" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
