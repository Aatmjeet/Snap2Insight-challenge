import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import Paper from "@mui/material/Paper";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ShelfAnalysisGraph = ({ shelfAnalysisData, selectedBrand }) => {
  const [brandData, setBrandData] = useState([]);
  const [showBrandGraph, setShowBrandGraph] = useState(false);

  // Calculate the percentage of facings for each shelf level for the selected brand
  useEffect(() => {
    if (selectedBrand) {
      const filteredData = shelfAnalysisData.filter(
        (item) => item.brandName === selectedBrand
      );
      const totalFacings = filteredData.length;
      const topFacings = filteredData.filter(
        (item) => item.shelfLevel === "TOP"
      ).length;
      const middleFacings = filteredData.filter(
        (item) => item.shelfLevel === "MIDDLE"
      ).length;
      const bottomFacings = filteredData.filter(
        (item) => item.shelfLevel === "BOTTOM"
      ).length;
      const topPercentage = ((topFacings / totalFacings) * 100).toFixed(2);
      const middlePercentage = ((middleFacings / totalFacings) * 100).toFixed(
        2
      );
      const bottomPercentage = ((bottomFacings / totalFacings) * 100).toFixed(
        2
      );

      const data = {
        labels: ["TOP", "MIDDLE", "BOTTOM"],
        datasets: [
          {
            label: "Brand bar graph",
            data: [
              parseInt(topPercentage),
              parseInt(middlePercentage),
              parseInt(bottomPercentage),
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
      setBrandData(data);
      setShowBrandGraph(true);
    }
  }, [selectedBrand]);

  return (
    <Paper elevation={3} style={{ width: 300, height: "auto", padding: 20 }}>
      {showBrandGraph && (
        <div>
          <h5 className="justify-center">
            Shelf Levels Distribution for {selectedBrand}
          </h5>
          <Bar
            data={brandData}
            options={{
              scales: {
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 25,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.label}: ${context.formattedValue}%`,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </Paper>
  );
};

export default ShelfAnalysisGraph;
