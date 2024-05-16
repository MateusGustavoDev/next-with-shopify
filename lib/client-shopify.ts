import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const client = createStorefrontApiClient({
  storeDomain: 'https://mstorebeta.myshopify.com',
  apiVersion: '2023-10',
  publicAccessToken: '70078ac14c9737eb13bac376104bebe2',
})
