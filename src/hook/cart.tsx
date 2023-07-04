import { createContext, useContext, useState, useEffect } from 'react'

export interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
}

interface CartProviderProps {
  cartItem: ProductProps[]
  addCart: (product: ProductProps) => void
  removeFromCart: (productId: string) => void
  valueTotal: number
  ApagarCart: () => void
}

export const CartContext = createContext({} as CartProviderProps)

function CartProvider({ children }: any) {
  const [cartItem, setCartItem] = useState<ProductProps[]>([])
  const [valueTotal, setValueTotal] = useState(0)
  console.log(cartItem)

  function addCart(product: ProductProps) {
    const foundItemIndex = cartItem.findIndex((item) => item.id === product.id)
    if (foundItemIndex === -1) {
      setCartItem((prevState: any) => [...prevState, product])
    }
  }

  function removeFromCart(productId: string) {
    const foundItemIndex = cartItem.findIndex((item) => item.id === productId)
    if (foundItemIndex !== -1) {
      setCartItem((prevState) => [
        ...prevState.slice(0, foundItemIndex),
        ...prevState.slice(foundItemIndex + 1),
      ])
    }
  }

  function ApagarCart() {
    setCartItem([])
  }

  useEffect((): any => {
    function getPriceAll() {
      let total: number = 0

      for (let i = 0; i < cartItem.length; i++) {
        const produto = cartItem[i]
        const priceWithoutSymbol = produto.price.replace('R$', '').trim()
        const valorTotalProduto = parseFloat(priceWithoutSymbol)
        total += valorTotalProduto
      }
      setValueTotal(total)
    }
    getPriceAll()
  }, [cartItem])

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addCart,
        removeFromCart,
        valueTotal,
        ApagarCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function Cart() {
  const context = useContext(CartContext)
  return context
}

export { CartProvider, Cart }
