import { ProductProps, AdditionalItemProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store-";

function makeCartItemKey(id: string, note?: string, additions?: AdditionalItemProps[]) {
  const noteKey = (note || "").trim()
  const additionsKey = (additions && additions.length > 0)
    ? additions.map((a) => a.name).sort().join("|")
    : ""
  return `${id}|${noteKey}|${additionsKey}`
}

export function add(
  products: ProductCartProps[],
  newProduct: ProductProps | ProductCartProps,
  note?: string,
  additions?: AdditionalItemProps[]
) {
  const isCartItem = (newProduct as ProductCartProps).cartItemKey !== undefined
  const itemNote = isCartItem ? (newProduct as ProductCartProps).note : note
  const itemAdditions = isCartItem ? (newProduct as ProductCartProps).additions : additions
  const cartItemKey = isCartItem
    ? (newProduct as ProductCartProps).cartItemKey
    : makeCartItemKey(newProduct.id, itemNote, itemAdditions)

  const existingProduct = products.find((product) => product.cartItemKey === cartItemKey)

  if (existingProduct) {
    return products.map((product) =>
      product.cartItemKey === existingProduct.cartItemKey
        ? { ...product, quantity: product.quantity + 1 }
        : product
    )
  }

  return [
    ...products,
    {
      ...(newProduct as ProductProps),
      quantity: 1,
      note: itemNote,
      additions: itemAdditions,
      cartItemKey,
    },
  ]
}

export function remove(products: ProductCartProps[], cartItemKey: string) {
  const updateProduct = products.map((product) =>
    product.cartItemKey === cartItemKey
      ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 0 }
      : product
  )

  return updateProduct.filter((product) => product.quantity > 0)
}
