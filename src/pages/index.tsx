import { HomeContainer, Product } from '@/styles/pages/home'

import Image from 'next/legacy/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'

import { CartContext } from '@/hook/cart'
import {
  Header,
  CartButton,
  CartItems,
  ItensContainer,
  CheckoutButton,
  ValueQuantity,
  ProductApp,
} from '@/styles/pages/app'

import logoImg from '../assets/logo.svg'
import { BsHandbag } from 'react-icons/bs'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

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

  const [cartModal, setCartModal] = useState('hide')
  const { isFallback } = useRouter()
  const { cartItem, valueTotal, removeFromCart } = useContext(CartContext)

  function hindleCartModal() {
    console.log(cartItem, valueTotal)
    if (cartModal === 'hide') {
      return setCartModal('')
    }
    setCartModal('hide')
  }
  return (
    <>
      {!isFallback && (
        <Header>
          <Link href={`/`} prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
          <CartButton onClick={hindleCartModal}>
            {cartItem.length !== 0 ? <p>{cartItem.length}</p> : <h1></h1>}
            <BsHandbag />
          </CartButton>
        </Header>
      )}

      <CartItems className={`${cartModal}`}>
        <button onClick={hindleCartModal} className="buttonClose">
          <IoMdClose />
        </button>
        <h2>Sacola de compras</h2>

        <ItensContainer>
          {cartItem?.length !== 0 ? (
            cartItem?.map((item) => (
              <ProductApp key={item.id}>
                <div className="boxImg">
                  <Image src={item.imageUrl} width={100} height={100} alt="" />
                </div>
                <div className="boxData">
                  <h1>{item.name}</h1>
                  <p>{item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remover
                  </button>
                </div>
              </ProductApp>
            ))
          ) : (
            <div></div>
          )}
        </ItensContainer>
        <ValueQuantity>
          <div>
            <h2>Quantidade</h2>
            <p>{`${cartItem.length} itens`}</p>
          </div>
          <div>
            <h1>Valor total</h1>
            <h1>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(valueTotal)}
            </h1>
          </div>
        </ValueQuantity>
        <CheckoutButton>Finalizar compra</CheckoutButton>
      </CartItems>

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
                  <div>
                    <strong>{product.name}</strong>
                    <span> {product.price}</span>
                  </div>
                  <div className="handbag">
                    <BsHandbag />
                  </div>
                </footer>
              </Link>
            </Product>
          ))}
      </HomeContainer>
    </>
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
