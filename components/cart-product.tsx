'use client'
import { CartContext } from '@/context/cart'
import { formatPrice } from '@/utils/format-price'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'
import { type FeaturedImage } from '@/types/shopify/product'
import { client } from '@/lib/shopify/client-shopify'

const removeCartLineQuery = `
mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      lines(first: 10){
        edges
        {
          node{
            quantity
            merchandise{
              ... on ProductVariant {
                id
              }
            }
          }
        }
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
    }
    
    userErrors {
      field
      message
    }
  }
}`

interface CartProductProps {
  id: string
  lineId: string
  cartId: string
  title: string
  price: string
  image: FeaturedImage
  quantity: number
}

export function CartProduct({ id, lineId, cartId, title, price, image, quantity }: CartProductProps) {
  const { updateCartData } = useContext(CartContext)

  async function handleRemoveProductClick() {
    const { data } = await client.request(removeCartLineQuery, {
      variables: {
        cartId,
        lineIds: [lineId],
      },
    })
    updateCartData(cartId)
  }

  return (
    <div className="w-full flex gap-4">
      <div className="w-[80px] shrink-0 flex items-center justify-center h-[80px] bg-zinc-900 rounded-lg">
        <Image width={0} height={0} sizes="90vw" className="h-[60%] w-auto" src={image.url} alt={image.altText} />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2">
          <span className="text-white text-sm">{title}</span>
          <span className="text-white font-semibold">{formatPrice(Number(price))}</span>
          <span className="text-sm text-zinc-300">Quantidade: {quantity}</span>
        </div>
        <button
          onClick={handleRemoveProductClick}
          className="border ml-3 border-zinc-800 hover:bg-zinc-900 p-3 w-max h-max rounded-md"
        >
          <Trash color="white" size={16} />
        </button>
      </div>
    </div>
  )
}
