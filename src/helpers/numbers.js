// libs
import numeral from "numeral";
import "numeral/locales/pt-br";

numeral.locale("pt-br");

export const formatNumber = amount => {
  if (!amount) return 0;

  const amountFormatted = numeral(amount).format("$ 0,0.00");
  return amountFormatted;
};
