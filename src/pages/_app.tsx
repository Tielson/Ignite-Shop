import { globalStyles } from '@/styles/global'
import { AppProps } from 'next/app'
import { CartProvider } from '@/hook/cart'
import { Container } from '@/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
