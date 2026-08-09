import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useMineData } from "../../context/MineDataContext.jsx";

const ProductionChart = () => {
  const { mineData } = useMineData();

  const chartData = mineData
    ? mineData.map((item) => ({
        day: item.Date?.slice(0, 3),
        production: Number(item.Production),
      }))
    : [];

  return (
    <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-6 text-white">
        Production Trend
      </h2>

      <div className="h-80 w-full">

        {chartData.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={chartData}>

              <XAxis
                dataKey="day"
                axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fill: "#E2E8F0", fontSize: 16 }}
              />

              <YAxis
                axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
                tickLine={false}
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

        ) : (

          <div className="h-full flex items-center justify-center text-slate-400">
            Upload operational data to view production trend.
          </div>

        )}

      </div>

    </div>
  );
};

export default ProductionChart;