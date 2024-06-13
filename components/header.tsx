import { LogIn, UserIcon } from 'lucide-react'
import { Cart } from './cart/cart'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { client } from '@/lib/shopify/client-shopify'

const customerOrdersQuery = `query CustomerMetafields($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    id
    displayName
    email
  }
}`

export async function Header() {
  const clientAccessToken = cookies().get('clientAccessToken')
  let clientData

  if (clientAccessToken) {
    const { data } = await client.request(customerOrdersQuery, {
      variables: {
        customerAccessToken: clientAccessToken.value,
      },
    })
    clientData = data
  }

  return (
    <div className="w-full p-5 shadow-xl sticky z-50 top-0 bg-black border-b border-zinc-800 ">
      <div className="w-full max-w-[1440px] m-auto h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-3xl text-white">
          Mstore
        </Link>
        <div className="flex items-center gap-4">
          {clientData ? (
            <span className="text-white font-bold">
              <span className="font-normal">Logado com: </span>
              {clientData.customer.displayName}
            </span>
          ) : (
            <Link href="/login">
              <button className="p-2 px-3 border hover:bg-zinc-900 flex gap-2 rounded-md text-white border-zinc-700">
                <UserIcon size={22} color="white" />
                Entrar
              </button>
            </Link>
          )}
          <Cart />
        </div>
      </div>
    </div>
  )
}
