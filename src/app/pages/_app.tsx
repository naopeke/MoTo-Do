import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// import '../styles/globals.css'; // グローバルCSSのインポート

// If you want to change the styles each page
//https://nextjs.org/docs/pages/building-your-application/routing/custom-app
//https://nextjs.org/docs/pages/api-reference/functions/use-router#userouter


export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Homeページかどうかを判定
  const isHomePage = router.pathname === '/';

  return (
    <div className={isHomePage ? 'styles.homePage' : ''}>
      <Component {...pageProps} />
    </div>
  );
}
