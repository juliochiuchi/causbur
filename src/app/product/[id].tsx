import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"
import { useCartStore } from "@/stores/cart-store-"
import { PRODUCTS } from "@/utils/data/products"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Feather } from "@expo/vector-icons"
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router"
import { Alert, Image, Text, View } from "react-native"

export default function Product() {
  const { id } = useLocalSearchParams()
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const product = PRODUCTS.find((item) => { return item.id === id})

  function handleAddToCart() {
    if(product) {
      cartStore.add(product)
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!")
      navigation.goBack()
    }
  }

  if(!product)
    return <Redirect href="/" />

  return (
    <View className="flex-1">
      <Image source={product?.cover} className="w-full h-52" resizeMode="cover" />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>
        
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

        <View className="pt-5 pb-8 gap-5">
          <Button onPress={handleAddToCart}>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>
            
            <Button.Text>Adicionar</Button.Text>
          </Button>

          <LinkButton title="Voltar ao catálogo" href="/" />
        </View>
      </View>
    </View>
  )
}
