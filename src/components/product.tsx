import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import colors from "tailwindcss/colors";

type ProductDataProps = {
  title: string,
  description: string,
  thumbnail: ImageProps,
  quantity?: number,
  price: number,
  note?: string,
  additions?: { name: string, price: number }[],
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps,
  onIncrement?: () => void,
  onDecrement?: () => void,
}

export const Product = forwardRef<typeof TouchableOpacity, ProductProps>(({ data, onIncrement, onDecrement, ...rest }, ref) => {
  return (
    <TouchableOpacity
      ref={ref as React.Ref<View>}
      className="w-full flex-row pb-4"
      {...rest}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
          <Text className="text-causbur-text-title-item font-subtitle text-base flex-1">
            {data.title}
          </Text>

          {onIncrement && onDecrement ? (
            <View className="flex-row items-center gap-2">
              <TouchableOpacity onPress={onDecrement} className="p-1">
                <Feather name="minus-circle" size={18} color={colors.lime[700]} />
              </TouchableOpacity>

              <Text className="text-causbur-text-quantity font-subtitle text-sm">
                x {data.quantity || 0}
              </Text>

              <TouchableOpacity onPress={onIncrement} className="p-1">
                <Feather name="plus-circle" size={18} color={colors.lime[700]} />
              </TouchableOpacity>
            </View>
          ) : (
            data.quantity && (
              <Text className="text-causbur-text-quantity font-subtitle text-sm">
                x {data.quantity || 0}
              </Text>
            )
          )}
        </View>

        <Text className="text-causbur-text-description-item text-xs leading-5 mt-0.5">{data.description}</Text>
        {data.note && (
          <Text className="text-causbur-text-description-item text-xs leading-5 mt-0.5">Obs: {data.note}</Text>
        )}
        {data.additions && data.additions.length > 0 && (
          <Text className="text-causbur-text-description-item text-xs leading-5 mt-0.5">
            Adicionais: {data.additions.map((a) => a.name).join(", ")}
          </Text>
        )}
        {data.price && data.quantity && (
          <Text className="text-causbur-text-value-total text-xs leading-5 mt-0.5">
            {formatCurrency(((data.price + (data.additions?.reduce((sum, a) => sum + a.price, 0) || 0)) * (data.quantity || 0)))}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
})
