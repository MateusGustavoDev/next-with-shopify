import { formatPrice } from '@/utils/format-price'
import Image from 'next/image'

interface ProductImage {
  url: string
  altText: string
  width: number
  height: number
}

interface Product {
  id: string
  title: string
  description: string
  price: string
  image: ProductImage
  totalInventory: number
}

export function ProductCard(product: Product) {
  return (
    <div className="w-[340px] relative p-4 rounded-xl border border-zinc-800">
      <div className="w-full relative h-[200px] bg-slate-700">
        <Image fill src={product.image.url} alt={product.image.altText} />
      </div>
      <div className="h-[240px] flex flex-col justify-between">
        <div className="flex mt-2 flex-col">
          <span className="text-white">{product.title}</span>
          <span className="font-semibold text-lg text-white">{formatPrice(Number(product.price))}</span>
        </div>
        <div className="flex flex-col mt-5 w-full gap-2">
          <button className="w-full uppercase p-2 text-sm py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg">
            Adicionar ao carrinho
          </button>
          <button className="w-full uppercase p-2 text-sm py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg">
            Comprar agora
          </button>
        </div>
      </div>
    </div>
  )
}
