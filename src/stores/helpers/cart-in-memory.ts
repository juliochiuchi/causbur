import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store-";

export function add(products: ProductCartProps[], newProduct: ProductProps, note?: string) {
  const existingProduct = products.find((product) => product.id === newProduct.id)

  if (existingProduct) {
    return products.map((product) => existingProduct.id === product.id 
    ? { ...product, quantity: product.quantity + 1 } 
    : product
  )}

  return [...products, { ... newProduct, quantity: 1, note }]
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updateProduct = products.map((product) =>
  product.id === productRemoveId ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 0 } : product) 

  return updateProduct.filter((product) => product.quantity > 0)
}
