'use client'
import { client } from '@/lib/shopify/client-shopify'
import { useCookies } from 'next-client-cookies'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`

export default function Login() {
  const router = useRouter()
  const cookies = useCookies()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleUserLogin() {
    const { data } = await client.request(customerAccessTokenCreate, {
      variables: {
        input: {
          email: `${email}`,
          password: `${password}`,
        },
      },
    })

    let clientAccessToken: string | undefined

    if (data.customerAccessTokenCreate.customerAccessToken) {
      clientAccessToken = data.customerAccessTokenCreate.customerAccessToken.accessToken
    }

    if (cookies.get('clientAccessToken') === clientAccessToken) {
      router.push('/')
    }

    if (clientAccessToken) {
      cookies.set('clientAccessToken', clientAccessToken)
      router.push('/')
    }
  }

  return (
    <div className="w-[500px] absolute mt-20 left-1/2 -translate-x-1/2  p-5 flex flex-col items-center justify-center border border-zinc-700 rounded-xl">
      <h1 className="text-white font-bold text-xl">Entrar na Mstore</h1>
      <div className="flex flex-col gap-3 w-full mt-4">
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder="Insira um email"
          className="text-white w-full px-4 py-2 bg-black outline-none border rounded-md focus:border-blue-700 border-zinc-700"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="Crie uma senha"
          className="text-white w-full px-4 py-2 bg-black outline-none border rounded-md focus:border-blue-700 border-zinc-700"
        />
        <button
          onClick={handleUserLogin}
          className="w-full font-semibold text-white py-2 bg-blue-700 hover:bg-blue-800 rounded-md"
        >
          Fazer login
        </button>
        <div className="mt-1">
          <span className="text-zinc-400 text-sm">
            Não tem uma conta?{' '}
            <Link href="/create-account" className="font-bold text-blue-500">
              Inscreva-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
