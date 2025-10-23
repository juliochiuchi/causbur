import { ProductProps } from '@/utils/data/products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import * as cartInMemory from './helpers/cart-in-memory'

export type ProductCartProps = ProductProps & {
  quantity: number,
  note?: string,
}

type StateProps = {
  products: ProductCartProps[],
  add: (product: ProductProps, note?: string) => void,
  remove: (productId: string) => void,
  clear: () => void,
}

export const useCartStore = create(
persist<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps, note?: string) => set((state) => ({
    products: cartInMemory.add(state.products, product, note),
  })),
  remove: (productId: string) => set((state) => ({
    products: cartInMemory.remove(state.products, productId),
  })),
  clear: () => set(() => ({ products: [] }))
}), {
  name: 'causbur:cart',
  storage: createJSONStorage(() => AsyncStorage),
}))
