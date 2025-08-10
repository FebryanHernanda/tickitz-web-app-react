export const monthlyLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateRandomData = (labels) => labels.map(() => Math.random() * 500);

export const getDataTicketSalesByCategory = (category) => {
  switch (category) {
    case "Jakarta":
      return {
        labels: monthlyLabels,
        datasets: [
          {
            fill: true,
            data: generateRandomData(monthlyLabels),
            borderColor: "rgba(29, 78, 216, 0.53)",
            backgroundColor: "rgba(29, 78, 216, 0.53)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      };
    case "Bandung":
      return {
        labels: monthlyLabels,
        datasets: [
          {
            fill: true,
            data: generateRandomData(monthlyLabels),
            borderColor: "rgba(29, 78, 216, 0.53)",
            backgroundColor: "rgba(29, 78, 216, 0.53)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      };
    case "Bogor":
      return {
        labels: monthlyLabels,
        datasets: [
          {
            fill: true,
            data: generateRandomData(monthlyLabels),
            borderColor: "rgba(29, 78, 216, 0.53)",
            backgroundColor: "rgba(29, 78, 216, 0.53)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      };
    default:
      break;
  }
};
