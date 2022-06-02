import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com" rel="preconnect" />
                    <link href="https://fonts.gstatic.com" rel="preconnect" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital@0;1&family=Luxurious+Script&family=Nothing+You+Could+Do&family=Raleway:ital,wght@0,200;0,400;0,600;1,400;1,600&family=Zen+Kurenaido&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="no-scrollbar">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
