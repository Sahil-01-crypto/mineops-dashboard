import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import productionChartData from "../../data/productionChartData";

const ProductionChart = () => {
  return (
    <div
      className="rounded-3xl text-white
  bg-[#182235]
border border-[#2A3A55]
rounded-3xl
shadow-xl
 p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Production Trend</h2>

      <div className=" h-80 w-180">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={productionChartData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
              tick={{ fill: "#E2E8F0", fontSize: 16 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
              tick={{ fill: "#E2E8F0", fontSize: 16 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#182235",
                border: "1px solid #fff",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="production"
              stroke="#60A5FA"
              strokeWidth={4}
              dot={{ r: 5, fill: "#60A5FA" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductionChart;
