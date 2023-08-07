import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import Paper from "@mui/material/Paper";

Chart.register(ArcElement, Tooltip);

const BrandShareDoughnutChart = ({ products }) => {
  // Compute brand shares
  const brandShareData = products.reduce((acc, product) => {
    const brandName = product.brandName;
    if (!acc[brandName]) {
      acc[brandName] = 0;
    }
    acc[brandName]++;
    return acc;
  }, {});

  const totalProductFacings = Object.values(brandShareData).reduce(
    (total, count) => total + count,
    0
  );

  // Sort and select top 5 brands
  const sortedBrands = Object.entries(brandShareData).sort(
    (a, b) => b[1] - a[1]
  );
  const top5Brands = sortedBrands.slice(0, 5);

  // Calculate percentage and facing count for each top brand
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#5BE5B7",
          "#AD6CE3",
        ],
      },
    ],
  };

  top5Brands.forEach(([brand, count]) => {
    const percentage = ((count / totalProductFacings) * 100).toFixed(2);
    chartData.labels.push(`${brand} (${percentage}%)`);
    chartData.datasets[0].data.push(count);
  });

  // Calculate facing count and percentage for "Other Brands"
  const otherBrandsCount = sortedBrands
    .slice(5)
    .reduce((total, [, count]) => total + count, 0);
  const otherBrandsPercentage = (
    (otherBrandsCount / totalProductFacings) *
    100
  ).toFixed(2);
  chartData.labels.push(`Other Brands (${otherBrandsPercentage}%)`);
  chartData.datasets[0].data.push(otherBrandsCount);

  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            if (label) {
              const facingCount = context.raw || 0;
              return `${label}: ${facingCount} facings`;
            }
            return "";
          },
        },
      },
    },
  };

  return (
    <Paper elevation={3} style={{ width: 200, height: "auto", padding: 20 }}>
      <div className="justify-center" style={{ marginBottom: 8 }}>
        Brand analysis
      </div>
      <Doughnut data={chartData} options={chartOptions} />
    </Paper>
  );
};

export default BrandShareDoughnutChart;
