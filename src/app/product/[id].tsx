import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { LinkButton } from "@/components/link-button"
import { useCartStore } from "@/stores/cart-store-"
import { ADDITIONAL_ITEMS, AdditionalItemProps, PRODUCTS } from "@/utils/data/products"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Feather } from "@expo/vector-icons"
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router"
import { useState } from "react"
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "tailwindcss/colors"

export default function Product() {
  const { id } = useLocalSearchParams()
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const product = PRODUCTS.find((item) => { return item.id === id })
  const [note, setNote] = useState('')
  const [selectedAdditions, setSelectedAdditions] = useState<AdditionalItemProps[]>([])

  function handleAddToCart() {
    if (product) {
      cartStore.add(product, note, selectedAdditions)
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!")
      navigation.goBack()
    }
  }

  if (!product)
    return <Redirect href="/" />

  return (
    <View className="flex-1 pt-6">
      <Image source={product?.cover} className="w-full h-52 rounded-t-2xl" resizeMode="cover" />
      
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 mt-8 flex-1">
            <Text className="text-causbur-text-title-item text-xl font-heading">{product.title}</Text>

            <Text className="text-causbur-text-price-item text-2xl font-heading my-2">
              {formatCurrency(product?.price || 0)}
            </Text>

            <Text className="text-causbur-text-description-item font-body text-base leading-6 mb-6">
              {product.description}
            </Text>

            {
              product.ingredients.map((ingredient) => (
                <Text key={ingredient} className="text-causbur-text-description-item font-body text-base leading-6 mb-2">
                  {ingredient}
                </Text>
              ))
            }

            <View className="mt-6 mb-6">
              <Text className="text-causbur-text-title-item font-subtitle text-base mb-3">Itens adicionais</Text>
              {ADDITIONAL_ITEMS.map((item) => {
                const isSelected = selectedAdditions.some((a) => a.name === item.name)
                return (
                  <TouchableOpacity
                    key={item.name}
                    className="flex-row items-center justify-between py-2"
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedAdditions((prev) =>
                        prev.some((a) => a.name === item.name)
                          ? prev.filter((a) => a.name !== item.name)
                          : [...prev, item]
                      )
                    }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Feather name={isSelected ? "check-square" : "square"} size={20} color={colors.lime[700]} />
                      <Text className="text-causbur-text-description-item font-body text-base">{item.name}</Text>
                    </View>
                    <Text className="text-causbur-text-price-item font-body text-base">
                      {formatCurrency(item.price)}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <Input
              placeholder="Observações (ex.: sem cebola, ponto da carne...)"
              onChangeText={(value) => setNote(value)}
              value={note}
            />

          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5 mb-10">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar</Button.Text>
        </Button>

        <LinkButton title="Voltar ao catálogo" href="/" />
      </View>
    </View>
  )
}
