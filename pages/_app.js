import './../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from "../components/Layout";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Suvash Blog</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;