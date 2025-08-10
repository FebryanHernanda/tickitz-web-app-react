export const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export const yearlyLabels = ["2021", "2022", "2023", "2024", "2025"];

const generateRandomData = (labels) => labels.map(() => Math.random() * 500);

export const getDataSalesByCategory = (category) => {
  switch (category) {
    case "weekly":
      return {
        labels: weeklyLabels,
        datasets: [
          {
            fill: true,
            data: generateRandomData(weeklyLabels),
            borderColor: "rgba(29, 78, 216, 0.53)",
            backgroundColor: "rgba(29, 78, 216, 0.53)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      };
    case "monthly":
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
    case "yearly":
      return {
        labels: yearlyLabels,
        datasets: [
          {
            fill: true,
            data: generateRandomData(yearlyLabels),
            borderColor: "rgba(29, 78, 216, 0.53)",
            backgroundColor: "rgba(29, 78, 216, 0.53)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      };
    default:
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
  }
};
