import { productsData } from './products-data'

// Helper function to generate slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Product data type definition
export interface Product {
  id: number
  name: string
  slug: string
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
  slug: string
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
// Add slug to each product and convert to Record<number, Product> for proper typing
const productsWithSlugs: Record<number, Product> = {}
Object.entries(productsData).forEach(([id, product]: [string, any]) => {
  productsWithSlugs[parseInt(id)] = {
    ...product,
    slug: product.slug || generateSlug(product.name),
  }
})
const products: Record<number, Product> = productsWithSlugs

// Get all products as an array (for listing page)
export function getAllProducts(): ProductListItem[] {
  return Object.values(products).map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
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

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return Object.values(products).find((p) => p.slug === slug)
}

// Get featured/bestselling products (used on homepage)
export function getFeaturedProducts(): ProductListItem[] {
  return getAllProducts()
    .filter(product => product.isFeatured === true)
    .slice(0, 4)
}
