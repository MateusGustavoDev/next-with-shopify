import { type Products } from '@/types/shopify/product'
import { ProductCard } from '../components/product'
import { client } from '@/lib/shopify/client-shopify'
import productFragment from '@/lib/shopify/fragments/product'

export default async function Home() {
  const teste = "mateus"

  const shopQuery = `
  {
    products(first:4) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
  `

  // shopIdQuery

  const shopIdQuery = `
  {
    shop{
     id
    }
  }

  `

  const { data } = await client.request(shopQuery)

  const { data: shop } = await client.request(shopIdQuery)

  const products: Products[] = data.products.edges
  console.log(products[2].node.priceRange.maxVariantPrice)

  console.log('ID: ' + products[0].node.id)

  return (
    <div>
      <div className="w-full max-w-[1440px] m-auto">
        <div className="w-full flex items-center h-[400px] justify-center mt-8 max-w-[1440px] p-5 bg-zinc-900 m-auto">
          <span className="font-bold text-3xl text-zinc-400">Banner bem bonito aqui</span>
        </div>
        <div className="w-full gap-5 overflow-x-auto flex [&::-webkit-scrollbar]:hidden mt-8">
          {products.map((product) => (
            <ProductCard
              id={product.node.id}
              variants={product.node.variants.edges}
              title={product.node.title}
              description={product.node.description}
              featuredImage={product.node.featuredImage}
              priceRange={product.node.priceRange}
              totalInventory={product.node.totalInventory}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
