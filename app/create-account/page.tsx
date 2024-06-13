'use client'
import { client } from '@/lib/shopify/client-shopify'
import Link from 'next/link'
import { useState } from 'react'

const createUserClient = `
mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`

export default function CreateNewAccount() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreateAccount() {
    const { data } = await client.request(createUserClient, {
      variables: {
        input: {
          firstName: `${name}`,
          lastName: `${lastName}`,
          email: `${email}`,
          password: `${password}`,
        },
      },
    })

    console.log(data)
  }

  return (
    <div className="w-[500px] absolute mt-20 left-1/2 -translate-x-1/2  p-5 flex flex-col items-center justify-center border border-zinc-700 rounded-xl">
      <h1 className="text-white font-bold text-xl">Criar uma conta na Mstore</h1>
      <div className="flex flex-col gap-3 w-full mt-4">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          placeholder="Nome"
          className="text-white w-full px-4 py-2 bg-black outline-none border rounded-md focus:border-blue-700 border-zinc-700"
        />
        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
          placeholder="Sobrenome"
          className="text-white w-full px-4 py-2 bg-black outline-none border rounded-md focus:border-blue-700 border-zinc-700"
        />
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
          onClick={handleCreateAccount}
          className="w-full font-semibold text-white py-2 bg-blue-700 hover:bg-blue-800 rounded-md"
        >
          Criar conta
        </button>
        <div className="mt-1">
          <span className="text-zinc-400 text-sm">
            Já possui uma conta?{' '}
            <Link href="/login" className="font-bold text-blue-500">
              Fazer login
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
