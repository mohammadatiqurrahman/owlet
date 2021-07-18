import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
          /> */}

          {/* <title>Shop The Owlet</title> */}

          <meta name="author" content="D-THEMES" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500;700&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" type="image/png" href="/images/icons/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />

          {/* <script>
        WebFontConfig = {
            google: { families: ['Poppins:300,400,500,600,700,800'] }
        };
        (function (d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'js/webfont.js';
            wf.async = true;
            s.parentNode.insertBefore(wf, s);
        })(document);
    </script> */}

          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/animate/animate.min.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/magnific-popup/magnific-popup.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/owl-carousel/owl.carousel.min.css"
          />

          <link rel="stylesheet" type="text/css" href="/css/style.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/demo24.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/custom.css" />
        </Head>
        <body className="loaded">
          <Main />
          <NextScript />
          {/* <script src="/vendor/jquery/jquery.min.js"></script> */}
          {/* <script src="/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script> */}
          {/* <script src="/vendor/elevatezoom/jquery.elevatezoom.min.js"></script> */}
          {/* <script src="/vendor/magnific-popup/jquery.magnific-popup.min.js"></script> */}

          {/* <script src="/vendor/owl-carousel/owl.carousel.min.js"></script> */}
          {/* <script src="/vendor/jquery.plugin/jquery.plugin.min.js"></script> */}
          {/* <script src="/js/main.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
