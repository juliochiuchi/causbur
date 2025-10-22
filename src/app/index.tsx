import { Category } from "@/components/category";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store-";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, SectionList, Text, View } from "react-native";

export default function Home() {
  const cartStore = useCartStore()
  const sectionListRef = useRef<SectionList>(null)
  const [category, setCategory] = useState(CATEGORIES[0])
  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  const handleCategorySelect = (item: string) => {
    setCategory(item)
    const sectionIndex = CATEGORIES.findIndex((category) => category === item)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header 
        title="Faça seu pedido"
        cartQuantityItems={cartQuantityItems}
      />

      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Category title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} />
        )}
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        className="flex-1 mt-3 py-2 px-5"
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link asChild href={`/product/${item.id}`}><Product data={item} /></Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-causbur-text-category-name font-heading mt-8 mb-3">{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
