import React, { ReactNode } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode
}

function Button({ 
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="w-full h-12 bg-causbur-background-button-add rounded-md flex-row items-center justify-center"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  )
}

type ButtonTextProps = {
  children: ReactNode
}

function ButtonText({ 
  children,
}: ButtonTextProps) {
  return (
    <Text className="text-causbur-text-button-add font-heading text-base mx-2">
      {children}
    </Text>
  )
}

type ButtonIconProps = {
  children: ReactNode
}
function ButtonIcon({
  children,
}: ButtonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
