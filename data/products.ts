import { productsData } from './products-data'

// Product data type definition
export interface Product {
  id: number
  name: string
  description: string
  fullDescription: string
  image: string | string[]  // Support both single image and image array
  category: string
  features: string[]
  specifications: { label: string; value: string }[]
  moq?: string
  packaging?: string
  isFeatured?: boolean
}

// Product list type (simplified for listing page)
export interface ProductListItem {
  id: number
  name: string
  description: string
  image: string  // Always a single image (first image from array if array provided)
  category: string
  isFeatured?: boolean
}

// Helper function to get the first image from image field
function getFirstImage(image: string | string[]): string {
  return Array.isArray(image) ? image[0] : image
}

// Load products from generated TypeScript file (generated from products.json)
// Convert to Record<number, Product> for proper typing
const products: Record<number, Product> = productsData as unknown as Record<number, Product>

// Get all products as an array (for listing page)
export function getAllProducts(): ProductListItem[] {
  return Object.values(products).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image: getFirstImage(product.image),
    category: product.category,
    isFeatured: product.isFeatured,
  }))
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = Array.from(new Set(Object.values(products).map(p => p.category)))
  return categories.sort()
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  return products[id]
}

// Get featured/bestselling products (used on homepage)
export function getFeaturedProducts(): ProductListItem[] {
  return getAllProducts()
    .filter(product => product.isFeatured === true)
    .slice(0, 4)
}
