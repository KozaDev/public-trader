import { Line } from "react-chartjs-2";
import { getAproximatedPeriod, getDateFormatForRange } from "lib/utils/utils";
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
import { arbitraryLine, pluginsConfig } from "./chartConfig";
import moment from "moment";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  arbitraryLine
);

const LineChart = ({ data, width }) => {
  // data = [
  //   [time, price, ....]
  // ]

  const coinPrices = data.map((item) => item[1]);
  const timeLabels = data.map((item) => item[0]);

  const startDate = data[0][0];
  const endDate = data[data.length - 1][0];
  const period = getAproximatedPeriod(startDate, endDate);

  const smallMobileWidth = Number(theme.breakpoints.smallMobile.slice(0, 3));
  const mobileWidth = Number(theme.breakpoints.mobile.slice(0, 3));

  const visibleLabels = (() => {
    if (width < smallMobileWidth) return 2;
    if (width < mobileWidth) return 4;
    return 6;
  })();

  const defineVisibleLabels = (value, index) => {
    const divider =
      timeLabels.length < visibleLabels
        ? 1
        : Math.ceil(data.length / visibleLabels);
    const dateFormat = getDateFormatForRange(startDate, endDate, period);
    if (index % divider === 0)
      return moment(timeLabels[value]).format(dateFormat);
    return "";
  };

  const chartData = {
    labels: timeLabels,
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
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              padding: 4,
              maxRotation: 0,
              align: "center",
              font: 3,

              callback: defineVisibleLabels,
            },
            grid: {
              display: false,
            },
          },
        },

        plugins: pluginsConfig,
      }}
    />
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  width: PropTypes.number,
};

export default LineChart;
