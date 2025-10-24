import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type MethodPaymentOptionsProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function MethodPaymentOptions({ options, value, onChange }: MethodPaymentOptionsProps) {
  return (
    <View className="mt-2 gap-2">
      {options.map((option) => (
        <Pressable
          key={option.value}
          className="flex-row items-center justify-between p-3 rounded-md border border-causbur-border-divider"
          onPress={() => onChange(option.value)}
        >
          <Text className="text-white font-body">{option.label}</Text>
          <Feather
            name={value === option.value ? "check-circle" : "circle"}
            size={20}
            color={value === option.value ? "#22c55e" : "#9CA3AF"}
          />
        </Pressable>
      ))}
    </View>
  );
}

export type { Option };
