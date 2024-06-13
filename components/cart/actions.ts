'use server'
import { client } from '@/lib/shopify/client-shopify'
import { cookies } from 'next/headers'

const createCartQuery = `mutation cartCreate {
    cartCreate {
      cart {
       id
      }
      userErrors {
        field
        message
      }
    }
  }
    `

const getCartQuery = `query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
    }
  }
  `

async function createCart() {
  const { data: cart } = await client.request(createCartQuery)
  return cart
}

async function getCart(cartId: string) {
  const { data: cart } = await client.request(getCartQuery, { variables: { cartId } })
  return cart
}

export async function addItemToCart() {
  let cartId = cookies().get('cartId')?.value
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  if (!cartId || !cart) {
    cart = await createCart()
    cartId = cart.cartCreate.cart.id
    if (cartId) {
      cookies().set('cartId', cartId)
    }
  }

  return cart
}
