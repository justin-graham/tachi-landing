import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/coinbase-fonts.css'
import '../styles/background.css'
import '../styles/mobile.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}