import { ProductProps, AdditionalItemProps } from '@/utils/data/products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import * as cartInMemory from './helpers/cart-in-memory'

export type ProductCartProps = ProductProps & {
  quantity: number,
  note?: string,
  additions?: AdditionalItemProps[],
  cartItemKey: string,
}

type StateProps = {
  products: ProductCartProps[],
  add: (product: ProductProps | ProductCartProps, note?: string, additions?: AdditionalItemProps[]) => void,
  remove: (cartItemKey: string) => void,
  clear: () => void,
}

export const useCartStore = create(
persist<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps | ProductCartProps, note?: string, additions?: AdditionalItemProps[]) => set((state) => ({
    products: cartInMemory.add(state.products, product, note, additions),
  })),
  remove: (cartItemKey: string) => set((state) => ({
    products: cartInMemory.remove(state.products, cartItemKey),
  })),
  clear: () => set(() => ({ products: [] }))
}), {
  name: 'causbur:cart',
  storage: createJSONStorage(() => AsyncStorage),
}))
