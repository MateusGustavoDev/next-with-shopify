'use client'
import { ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { client } from '@/lib/shopify/client-shopify'
import { useContext, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { CartContext } from '@/context/cart'
import { CartResume } from '../cart-resume'
import { CartProduct } from '../cart-product'

export function Cart() {
  const { cartData, updateCartData } = useContext(CartContext)
  const cookies = useCookies()
  const cartId = cookies.get('cartId')

  const cartQuery = `query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
      }
    }
  }`

  useEffect(() => {
    if (cartId) {
      updateCartData(cartId)
    }
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="font-semibold border border-zinc-800 p-3 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-white">
          <ShoppingCart size={22} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-96 w-full bg-black border-zinc-800 p-5">
        <div className="h-full  relative">
          <span className="text-2xl font-semibold text-white">Meu Carrinho</span>
          {!cartData && (
            <div className="mt-20 w-auto flex-col gap-4 items-center flex justify-center">
              <ShoppingCart color="white" size={46} />
              <span className="text-white text-xl font-bold">O carrinho está vazio.</span>
            </div>
          )}
          {cartData.cart && (
            <ScrollArea className="w-full h-full  overflow-y-auto pr-2">
              <div className="mt-10 flex flex-col gap-4">
                {cartData.cart.lines.edges.map((product) => (
                  <CartProduct
                    id={product.node.merchandise.product.id}
                    lineId={product.node.id}
                    cartId={cartData.cart.id}
                    title={product.node.merchandise.product.title}
                    price={product.node.merchandise.product.priceRange.maxVariantPrice.amount}
                    image={product.node.merchandise.product.featuredImage}
                    quantity={product.node.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
          <div className="absolute bottom-0 w-full">
            {cartData.cart && <CartResume subtotal={cartData.cart.cost.subtotalAmount.amount} />}
            <button className="w-full bg-blue-700 mt-10 rounded-lg uppercase font-semibold text-white p-3 hover:bg-blue-800">
              finalizar compra
            </button>
          </div>
        </div>
        {/* {cartData.cartLinesAdd?.cart.lines.edges.map((product) => (
          <span className="text-white">{product.node.merchandise.id}</span>
        ))} */}
      </SheetContent>
    </Sheet>
  )
}
