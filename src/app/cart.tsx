import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store-";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "phone hereß"

export default function Cart() {
  const navigation = useNavigation()
  const [address, setAddress] = useState('')
  const cartStore = useCartStore()
  const total = formatCurrency(cartStore
    .products
    .reduce((total, product) => total + product.price * product.quantity, 0))

  function handleOrder() {
    if (address.trim().length === 0) return Alert.alert('Pedido', 'Informe os dados da entrega.')

    const products = cartStore.products
    .map((product) => `\n ${product.quantity} ${product.title}`)
    .join("")

    const message = `
      NOVO PEDIDO
      \n Entregar em: ${address}
      ${products}
      \n Valor Total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`)

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Meu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {
              cartStore.products.length > 0 ? (
                <View className="border-b border-causbur-border-divider">
                  {
                    cartStore.products.map((product) => (
                      <Product
                        key={product.id}
                        data={product}
                        onIncrement={() => cartStore.add(product)}
                        onDecrement={() => cartStore.remove(product.id)}
                      />
                    ))
                  }
                </View>
              ) : (
                <Text className="font-body text-causbur-text-informative text-center my-8">
                  Seu carrinho está vazio.
                </Text>
              )
            }

            <View className="flex-row gap-2 items-center justify-end mt-5 mb-5">
              <Text className="text-causbur-text-total text-xl font-subtitle">Total:</Text>
              <Text className="text-causbur-text-value-total text-2xl font-heading">{total}</Text>
            </View>

            <Input 
              placeholder="Informe o endereço de entrega: Rua Abc, 123"
              onChangeText={(value) => setAddress(value)}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5 mb-10">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon><Feather name="arrow-right-circle" size={20} /></Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
