type MaxVariantPrice = {
  amount: string
  currencyCode: string
}

type MinVariantPrice = MaxVariantPrice

type PriceRange = {
  maxVariantPrice: MaxVariantPrice
  minVariantPrice: MinVariantPrice
}

export type FeaturedImage = {
  url: string
  altText: string
}

export type ProductNode = {
  id: string
  variants: []
  title: string
  description: string
  totalInventory: number
  featuredImage: FeaturedImage
  priceRange: PriceRange
}

export type Products = {
  node: ProductNode
}
