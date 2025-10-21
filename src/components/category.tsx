import { clsx } from "clsx"
import { Pressable, PressableProps, Text } from "react-native"

type CategoryProps = PressableProps & {
  title: string,
  isSelected?: boolean,
}

export function Category({
  title,
  isSelected,
  ...rest
}: CategoryProps) {
  return (
    <Pressable className={clsx(
      "bg-causbur-background-button-category px-4 justify-center rounded-md h-10",
      isSelected && "border-2 border-causbur-border-activate-button-category"
    )} {...rest}>
      <Text className="text-causbur-text-button-category font-subtitle text-sm">{title}</Text>
    </Pressable>
  )
}