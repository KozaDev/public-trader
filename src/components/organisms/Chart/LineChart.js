import { Line } from "react-chartjs-2";
import {
  getAproximatedPeriod,
  getDaysFromISODate,
  getMinutesFromISODate,
} from "lib/utils/utils";
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
import moment from "moment";
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
        ? (date) => moment(date).format("hh:mm A")
        : (date) => moment(date).format("DD MMM, YY");

    return charData.reduce((acc, item, i) => {
      if (dataLength < datesOnAxis) return [...acc, dateFormater(item[0])];
      if (i % divider === 0) return [...acc, dateFormater(item[0])];
      return [...acc, ""];
    }, []);
  };

  const chartData = {
    labels:
      width < smallMobileWidth
        ? prepareTimeLabels(data, period, 3)
        : prepareTimeLabels(data, period, 6),
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
          x: {
            ticks: {
              autoSkip: false,
              padding: 0,
              maxRotation: 0,
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
