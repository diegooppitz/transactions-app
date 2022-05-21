// checkStatus of the transaction
// case isChartBar == true return a chartBar class
// case isn't return a string
export const checkStatus = (status, isChartBar) => {
  switch (status) {
    case "created":
      return isChartBar ? "twenty-five" : "Solicitada";

    case "processing":
      return isChartBar ? "half" : "Processando";

    case "processed":
      return isChartBar ? "full" : "Concluída";

    default:
      return "-";
  }
};
