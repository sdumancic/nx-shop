import {Category} from '@nx-shop/products'

export class Product {
  id?: string
  name?: string
  description?: string
  image?: string
  brand?: string
  price?: number
  rating?: number
  numReviews?: number
  isFeatured?: boolean
  category?: Category
  reviews?: Review[]
  countInStock?: number
  richDescription?: string
  images?: string[]
  dateCreated?: Date
}

export class Review {
  avatar?: string
  name?: string
  review?: string
}
