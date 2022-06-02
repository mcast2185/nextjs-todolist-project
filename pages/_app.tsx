import type { AppProps } from 'next/app'

import '../styles/tailwind.css';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-screen bg-gray-900 text-gray-100'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
