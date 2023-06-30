import { globalStyles } from '@/styles/global'
import { AppProps } from 'next/app'
import logoImg from '../assets/logo.svg'
import Image from 'next/legacy/image'

import { Header, Container } from '@/styles/pages/app'
import { useRouter } from 'next/router'
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { isFallback } = useRouter()
  return (
    <Container>
      {!isFallback && (
        <Header>
          <Link href={`/`} prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
        </Header>
      )}

      <Component {...pageProps} />
    </Container>
  )
}
