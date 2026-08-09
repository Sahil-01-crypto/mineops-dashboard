import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useMineData } from "../context/MineDataContext.jsx";

const Analytics = () => {
  const { mineData } = useMineData();

  // No data uploaded
  if (!mineData || mineData.length === 0) {
    return (
      <div className="mx-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Analyze production performance and operational trends.
          </p>
        </div>

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-white">
            No Analytics Data
          </h2>

          <p className="text-slate-400 mt-2">
            Upload an Excel or CSV file from the Dashboard
            to view analytics.
          </p>
        </div>
      </div>
    );
  }

  // Convert Excel data into chart-friendly data

  const displayData = mineData.map((item) => {
    const production = Number(item.Production) || 0;
    const target = Number(item.Target) || 0;

    const efficiency =
      target > 0
        ? Math.round((production / target) * 100)
        : 0;

    return {
      day: item.Date?.slice(0, 3) || "N/A",
      production,
      target,
      efficiency,
    };
  });

  // Average production

  const averageProduction =
    displayData.reduce(
      (sum, item) => sum + item.production,
      0
    ) / displayData.length;

  // Average efficiency

  const averageEfficiency =
    displayData.reduce(
      (sum, item) => sum + item.efficiency,
      0
    ) / displayData.length;

  // Best production day

  const bestProductionDay = displayData.reduce(
    (best, item) =>
      item.production > best.production
        ? item
        : best
  );

  // Worst production day

  const worstProductionDay = displayData.reduce(
    (worst, item) =>
      item.production < worst.production
        ? item
        : worst
  );

  // Full day names

  const fullDayNames = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  // Number of days above target

  const daysAboveTarget = displayData.filter(
    (item) => item.production >= item.target
  ).length;

  const targetAchievement =
    displayData.length > 0
      ? Math.round(
          (daysAboveTarget / displayData.length) * 100
        )
      : 0;

  return (
    <div className="mx-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Analyze production performance and operational trends.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Average Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Avg. Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {Math.round(
              averageProduction
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Average Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Avg. Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {averageEfficiency.toFixed(1)}%
          </h2>

        </div>


        {/* Best Production Day */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Best Production Day
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {fullDayNames[bestProductionDay.day] ||
              bestProductionDay.day}
          </h2>

        </div>

      </div>


      {/* Production vs Target */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-6 text-white">
          Production vs Target
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={displayData}>

              <XAxis
                dataKey="day"
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{ fill: "#E2E8F0" }}
              />

              <YAxis
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{ fill: "#E2E8F0" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#172236",
                  border: "1px solid #2A3B57",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Legend />

              <Bar
                dataKey="production"
                name="Production"
                fill="#60A5FA"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="target"
                name="Target"
                fill="#64748B"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Bottom Analytics */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6 text-white">
            Efficiency Trend
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={displayData}>

                <XAxis
                  dataKey="day"
                  axisLine={{ stroke: "#475569" }}
                  tickLine={false}
                  tick={{ fill: "#E2E8F0" }}
                />

                <YAxis
                  axisLine={{ stroke: "#475569" }}
                  tickLine={false}
                  tick={{ fill: "#E2E8F0" }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#172236",
                    border: "1px solid #2A3B57",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Target Achievement */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6 text-white">
            Target Achievement
          </h2>

          <div className="flex flex-col justify-center h-72">

            <p className="text-slate-400">
              Days meeting or exceeding target
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-4">
              {targetAchievement}%
            </h2>

            <p className="text-slate-400 mt-3">
              {daysAboveTarget} of {displayData.length} operating days
            </p>

            <div className="h-3 bg-[#24344D] rounded-full mt-8">

              <div
                className="h-3 bg-blue-400 rounded-full"
                style={{
                  width: `${targetAchievement}%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>


      {/* Operational Insights */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5 text-white">
          Operational Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          {/* Production */}

          <div className="bg-[#1B2A40] rounded-xl p-4">

            <p className="text-green-400 font-semibold">
              ↑ Production
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Average production was{" "}
              {Math.round(
                averageProduction
              ).toLocaleString()} MT
              per operating day.
            </p>

          </div>


          {/* Attention */}

          <div className="bg-[#1B2A40] rounded-xl p-4">

            <p className="text-yellow-400 font-semibold">
              ⚠ Attention
            </p>

            <p className="text-slate-300 text-sm mt-2">
              {fullDayNames[worstProductionDay.day] ||
                worstProductionDay.day}{" "}
              recorded the lowest production at{" "}
              {worstProductionDay.production.toLocaleString()} MT.
            </p>

          </div>


          {/* Best Performance */}

          <div className="bg-[#1B2A40] rounded-xl p-4">

            <p className="text-blue-400 font-semibold">
              ★ Best Performance
            </p>

            <p className="text-slate-300 text-sm mt-2">
              {fullDayNames[bestProductionDay.day] ||
                bestProductionDay.day}{" "}
              recorded the highest production at{" "}
              {bestProductionDay.production.toLocaleString()} MT.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;