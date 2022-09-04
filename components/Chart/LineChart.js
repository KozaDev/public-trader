import { Line } from "react-chartjs-2";
import {
  getAproximatedPeriod,
  getDaysFromISODate,
  getMinutesFromISODate,
} from "lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { theme } from "styles/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, width }) => {
  // data = [
  //   [time, price, ....]
  // ]

  const coinPrices = data.map((item) => item[1]);
  const startDate = data[0][0];
  const endDate = data[data.length - 1][0];
  const smallMobileWidth = Number(theme.breakpoints.smallMobile.slice(0, 3));
  const period = getAproximatedPeriod(startDate, endDate);

  const prepareTimeLabels = (charData, period, datesOnAxis) => {
    const dataLength = charData.length;
    const divider = Math.floor(dataLength / datesOnAxis);

    const dateFormater =
      period === "1d" || period === "1h"
        ? getMinutesFromISODate
        : getDaysFromISODate;

    return charData.map((item, i) => {
      if (dataLength < datesOnAxis) return dateFormater(item[0]);
      if (i % divider === 0) return dateFormater(item[0]);
      return "";
    });
  };

  const chartData = {
    labels:
      width < smallMobileWidth
        ? prepareTimeLabels(data, period, 3)
        : prepareTimeLabels(data, period, 5),
    datasets: [
      {
        label: "Price in USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        pointRadius: 0,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        scales: {
          xAxis: {
            ticks: { autoSkip: false },
          },
        },
      }}
    />
  );
};

export default LineChart;
