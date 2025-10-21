import { Category } from "@/components/category";
import { Header } from "@/components/header";
import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  const handleCategorySelect = (item: string) => {
    setCategory(item)
  }

  return (
    <View className="flex-1 pt-8">
      <Header 
        title="Faça seu pedido"
        cartQuantityItems={3}
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
    </View>
  );
}
