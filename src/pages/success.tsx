import { stripe } from '@/lib/stripe'
import {
  SuccessContainer,
  ImageContainer,
  DisplayImage,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/logo.svg'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, product }: SuccessProps) {
  console.log(product)
  console.log(customerName)
  return (
    <SuccessContainer>
      <Head>
        <title> Success | Ignite Shop</title>

        <meta name="robots" content="noindex"></meta>
      </Head>
      <Image src={logo} width={120} height={110} alt="" />
      <DisplayImage>
        {product?.map((item) => (
          <ImageContainer key={item.name}>
            <Image src={item.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>
        ))}
      </DisplayImage>
      <h1>Compra efetuada!</h1>
      <p>
        Uhuul <strong>{customerName}</strong>, sua compra de {product.length}{' '}
        camisas já está a caminho da sua casa.
      </p>
      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const product = session.line_items?.data.map((item: any) => ({
    name: item.price.product.name,
    imageUrl: item.price.product.images[0],
  }))
  return {
    props: {
      customerName,
      product,
    },
  }
}
