'use client'
import { type ProductNode } from '@/types/shopify/product'
import { formatPrice } from '@/utils/format-price'
import Image from 'next/image'
import { client } from '@/lib/shopify/client-shopify'
import cartFragment from '@/lib/shopify/fragments/cart'
import { addToCartMutation } from '@/lib/shopify/mutations/cart'
import { useCookies } from 'next-client-cookies'
import { useContext } from 'react'
import { CartContext } from '@/context/cart'

const createCartMutation = `mutation createCart($lineItems: [CartLineInput!]) {
  cartCreate(input: { lines: $lineItems }) {
    cart {
      ...cart
    }
  }
}
${cartFragment}`

export function ProductCard(product: ProductNode) {
  const { updateCartData } = useContext(CartContext)
  const cookies = useCookies()
  const cartId = cookies.get('cartId')

  async function handleAddToCardClick() {
    if (cartId) {
      const { data: cart } = await client.request(addToCartMutation, {
        variables: {
          cartId,
          lines: {
            merchandiseId: product.variants[0].node.id,
            quantity: 1,
          },
        },
      })
      console.log('Produto: ' + product.id + ' Adicionado ao carrinho')
      console.log('ID do carrinho: ' + cartId)
      updateCartData(cartId)
    } else {
      const { data: createdCart } = await client.request(createCartMutation)
      if (createdCart.cartCreate.cart.id) {
        cookies.set('cartId', createdCart.cartCreate.cart.id as string)
        const cartId = cookies.get('cartId')

        const { data } = await client.request(addToCartMutation, {
          variables: {
            cartId,
            lines: {
              merchandiseId: product.variants[0].node.id,
              quantity: 1,
            },
          },
        })

        console.log(product.id + 'Adicionado ao carrinho')

        if (cartId) {
          updateCartData(cartId)
        }
      }
    }
  }

  return (
    <div className="w-[340px] shrink-0 relative p-4 rounded-xl border border-zinc-800">
      <div className="w-full flex items-center justify-center relative h-[200px] rounded-md bg-zinc-900">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="h-[160px] w-auto"
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
        />
      </div>
      <div className="h-[180px] flex flex-col justify-between">
        <div className="flex mt-2 flex-col">
          <span className="text-white">{product.title}</span>
          <span className="font-semibold text-lg text-white">
            {formatPrice(Number(product.priceRange.maxVariantPrice.amount))}
          </span>
        </div>
        <div className="flex flex-col mt-5 w-full gap-3">
          <button
            onClick={handleAddToCardClick}
            className="w-full bg-blue-700 hover:bg-blue-800 uppercase p-2 text-sm py-3 text-white font-semibold rounded-lg"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
