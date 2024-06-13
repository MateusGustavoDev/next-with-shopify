'use client'
import { client } from '@/lib/shopify/client-shopify'
import { getCartQuery } from '@/lib/shopify/fragments/cart'
import { type ReactNode, createContext, useState } from 'react'

interface ICartContext {
  cartData: any
  updateCartData: (cartId: string) => void
}

export const CartContext = createContext<ICartContext>({
  cartData: {},
  updateCartData: () => {},
})

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartData, setCartData] = useState<any>({})

  const updateCartData = async (cartId: string) => {
    const { data } = await client.request(getCartQuery, { variables: { cartId } })
    setCartData(data)
    console.log(data)
  }

  return <CartContext.Provider value={{ cartData, updateCartData }}>{children}</CartContext.Provider>
}
