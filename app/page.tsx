import { ProductCard } from '../components/product'
import { client } from '@/lib/client-shopify'

export default async function Home() {
  const shopQuery = `
  {
    products(first:4) {
      edges {
        node {
          id
          title
          description
          totalInventory
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`
  const { data } = await client.request(shopQuery)

  const products = data.products.edges

  return (
    <div>
      <div className="w-full max-w-[1400px] mb-20 m-auto">
        <div className="w-full flex items-center h-[400px] justify-center mt-8 max-w-[1400px] p-5 bg-zinc-900 m-auto">
          <span className="font-bold text-3xl text-zinc-400">Banner bem bonito aqui</span>
        </div>
        <div className="w-full flex justify-between mt-8">
          {products.map((product) => (
            <ProductCard
              id={product.node.id}
              title={product.node.title}
              description={product.node.description}
              image={product.node.featuredImage}
              price={product.node.priceRange.maxVariantPrice.amount}
              totalInventory={product.node.totalInventory}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
