import { forwardRef } from "react";
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";

type ProductDataProps = {
  title: string,
  description: string,
  thumbnail: ImageProps,
  quantity?: number,
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps,
}

export const Product = forwardRef<typeof TouchableOpacity, ProductProps>(({ data, ...rest }, ref) => {
  return (
    <TouchableOpacity
    ref={ref as React.Ref<View>}
    className="w-full flex-row items-center pb-4"
    {...rest}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
          <Text className="text-causbur-text-title-item font-subtitle text-base flex-1">
            {data.title}
          </Text>
          
          {data.quantity && (
            <Text className="text-slate-400 font-subtitle text-sm">
              x {data.quantity || 0}
            </Text>
          )}
        </View>
        
        <Text className="text-causbur-text-description-item text-xs leading-5 mt-0.5">{data.description}</Text>
      </View>
    </TouchableOpacity>
  )
})
