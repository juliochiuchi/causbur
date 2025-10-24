export type PaymentMethodOption = {
  label: string;
  value: string;
};

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  { label: "PIX", value: "PIX" },
  { label: "Cartão de crédito", value: "CARTAO_CREDITO" },
  { label: "Cartão de crédito e dinheiro", value: "CARTAO_CREDITO_DINHEIRO" },
  { label: "Dinheiro", value: "DINHEIRO" },
];
