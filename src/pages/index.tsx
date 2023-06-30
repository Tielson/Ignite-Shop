import { HomeContainer, Product } from '@/styles/pages/home'

import Image from 'next/legacy/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'

interface StripProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}
export default function Home({ products }: StripProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      {products &&
        products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image
                placeholder="empty"
                src={product.imageUrl}
                alt=""
                width={520}
                height={480}
              />
              <footer>
                <strong>{product.name}</strong>
                <span> {product.price}</span>
              </footer>
            </Link>
          </Product>
        ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
