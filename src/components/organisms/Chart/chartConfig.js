import { theme } from "styles/theme";
import moment from "moment";
export const arbitraryLine = {
  id: "arbitraryLine",
  beforeDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      let x = chart.tooltip._active[0].element.x;
      let yAxis = chart.scales.y;
      let ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 4;
      ctx.strokeStyle = theme.colors.darkGrey;
      ctx.stroke();
      ctx.restore();
    }
  },
};

export const pluginsConfig = {
  tooltip: {
    callbacks: {
      title: (tooltipItems) => {
        return moment(tooltipItems[0].label).format("D MMM YY, hh:mm A");
      },
      label: (tooltipItems) => {
        const {
          chart: { ctx },
        } = tooltipItems;
        return `${tooltipItems.dataset.label}: $${tooltipItems.formattedValue}`;
      },
    },
  },
};
