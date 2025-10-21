import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type HeaderPropds = {
  title: string,
  cartQuantityItems?: number,
}

export function Header({
  title,
  cartQuantityItems = 0
}: HeaderPropds) {
  return (
    <View className="flex-row items-center justify-between border-b border-causbur-border-divider pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="font-heading text-causbur-text-title-header text-xl mt-2">{title}</Text>
      </View>

      {
        cartQuantityItems > 0 && (
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-causbur-background-bag w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-causbur-text-bag font-bold text-xs">{cartQuantityItems}</Text>
            </View>

            <Feather name="shopping-bag" size={24} color={colors.white} />
          </TouchableOpacity>
        )
      }
    </View>
  )
}
