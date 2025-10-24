import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { MethodPaymentOptions } from "@/components/method-payment-options";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store-";
import { PAYMENT_METHOD_OPTIONS } from "@/utils/data/payment-methods";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "5517997855108"

export default function Cart() {
  const navigation = useNavigation()
  const [address, setAddress] = useState('')
  const [change, setChange] = useState('')
  const [methodPayment, setMethodPayment] = useState('')
  const cartStore = useCartStore()
  const totalValue = cartStore
    .products
    .reduce((total, product) => {
      const additionsTotal = (product.additions || []).reduce((sum, a) => sum + a.price, 0)
      return total + (product.price + additionsTotal) * product.quantity
    }, 0)
  const total = formatCurrency(totalValue)

  function handleOrder() {
    if (totalValue === 0) return Alert.alert('Pedido', 'Adicione produtos ao carrinho.')
    if (address.trim().length === 0) return Alert.alert('Pedido', 'Informe os dados da entrega.')
    if (!methodPayment) return Alert.alert('Pedido', 'Informe a forma de pagamento.')

    const products = cartStore.products
      .map((product) => {
        const additionsList = (product.additions || []).map((additional) => additional.name).join(", ")
        const additionsText = additionsList ? `   _+ Adicionais: ${additionsList}_\n` : ""
        const noteText = (product.note && product.note.trim().length > 0) ? `   _+ Obs: ${product.note}_\n` : ""
        return `\n ${product.quantity} ${product.title}\n${additionsText}${noteText}`
      })
      .join("")

    const paymentOption = PAYMENT_METHOD_OPTIONS.find(method => method.value === methodPayment)
    const paymentText = paymentOption ? paymentOption.label : methodPayment

    const changeText = `Observações de Troco: ${change.trim().length > 0 ? `*_${change.trim()}_*` : "-"}`

    const message = `
      😋 *NOVO PEDIDO*
      \n📍 Entregar em: _${address}_\n
      \n🍔 *MEU CARRINHO*
      ${products}
      \n💸 *PAGAMENTO*
      \nValor total: *_${total}_*
Forma de Pagamento: *_${paymentText}_*
${changeText}
      \n\n_Aguardo o seu retorno com a confirmação do meu pedido._ 🚀
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
                        key={product.cartItemKey}
                        data={product}
                        onIncrement={() => cartStore.add(product)}
                        onDecrement={() => cartStore.remove(product.cartItemKey)}
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

            <View className="my-4">
              <Text className="text-white font-body text-sm">Forma de Pagamento</Text>
              <MethodPaymentOptions
                options={PAYMENT_METHOD_OPTIONS}
                value={methodPayment}
                onChange={setMethodPayment}
              />
            </View>

            <Input
              placeholder="Informe observações de troco se houver"
              onChangeText={(value) => setChange(value)}
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
