import { CartContext } from '@/hook/cart'
import { stripe } from '@/lib/stripe'
import {
  Header,
  CartButton,
  CartItems,
  CheckoutButton,
  ItensContainer,
  ProductApp,
  ValueQuantity,
} from '@/styles/pages/app'
import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
  LoadingText,
  LoadingSpinner,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { BsHandbag } from 'react-icons/bs'
import Stripe from 'stripe'
import logoImg from '../../assets/logo.svg'
import { IoMdClose } from 'react-icons/io'
import axios from 'axios'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const [cartModal, setCartModal] = useState('hide')
  const { isFallback } = useRouter()
  const { cartItem, valueTotal, addCart, removeFromCart } =
    useContext(CartContext)

  if (isFallback) {
    return (
      <LoadingText>
        <LoadingSpinner />
      </LoadingText>
    )
  }

  function hindleCartModal() {
    if (cartModal === 'hide') {
      return setCartModal('')
    }
    setCartModal('hide')
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceIds: cartItem,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      console.log(error)
      alert('Falha ao redirecionar ao checkout ')
    }
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
        <CheckoutButton
          disabled={isCreatingCheckoutSession}
          onClick={handleBuyProduct}
        >
          Finalizar compra
        </CheckoutButton>
      </CartItems>
      <ProductContainer>
        <Head>
          <title> {product.name} | Ignite Shop</title>
        </Head>

        <ImageContainer>
          <Image
            placeholder="empty"
            src={product.imageUrl}
            alt=""
            width={600}
            height={600}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description} </p>

          <button
            onClick={() =>
              addCart({
                id: product.defaultPriceId,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
              })
            }
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_OAfngN55MvpmCS' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ?? ''
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}
