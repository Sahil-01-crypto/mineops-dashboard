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

  // --------------------------------------------------
  // NO DATA
  // --------------------------------------------------

  if (!mineData || mineData.length === 0) {
    return (
      <div className="mx-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Analyze monthly production performance and operational trends.
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


  // --------------------------------------------------
  // PREPARE 30-DAY DATA
  // --------------------------------------------------

  const displayData = mineData.map((item) => {

    const fineOre =
      Number(item.fineOreProduction) || 0;

    const lumpOre =
      Number(item.lumpOreProduction) || 0;

    const overall =
      fineOre + lumpOre;

    const target =
      Number(item.target) || 0;

    const efficiency =
      target > 0
        ? Math.round((overall / target) * 100)
        : 0;

    return {
      date: item.date,
      fineOre,
      lumpOre,
      overall,
      target,
      efficiency,
    };

  });


  // --------------------------------------------------
  // TOTAL PRODUCTION
  // --------------------------------------------------

  const totalFineOre =
    displayData.reduce(
      (sum, item) => sum + item.fineOre,
      0
    );

  const totalLumpOre =
    displayData.reduce(
      (sum, item) => sum + item.lumpOre,
      0
    );

  const totalOverallProduction =
    totalFineOre + totalLumpOre;


  // --------------------------------------------------
  // AVERAGES
  // --------------------------------------------------

  const averageProduction =
    totalOverallProduction /
    displayData.length;

  const averageFineOre =
    totalFineOre /
    displayData.length;

  const averageLumpOre =
    totalLumpOre /
    displayData.length;

  const averageEfficiency =
    displayData.reduce(
      (sum, item) => sum + item.efficiency,
      0
    ) / displayData.length;


  // --------------------------------------------------
  // BEST / WORST DAYS
  // --------------------------------------------------

  const bestProductionDay =
    displayData.reduce(
      (best, item) =>
        item.overall > best.overall
          ? item
          : best,
      displayData[0]
    );

  const worstProductionDay =
    displayData.reduce(
      (worst, item) =>
        item.overall < worst.overall
          ? item
          : worst,
      displayData[0]
    );


  // --------------------------------------------------
  // TARGET ACHIEVEMENT
  // --------------------------------------------------

  const daysAboveTarget =
    displayData.filter(
      (item) =>
        item.overall >= item.target
    ).length;

  const targetAchievement =
    displayData.length > 0
      ? Math.round(
          (daysAboveTarget /
            displayData.length) *
            100
        )
      : 0;


  return (
    <div className="mx-8">

      {/* --------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------- */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Analyze 30-day production performance and operational trends.
        </p>

      </div>


      {/* --------------------------------------------- */}
      {/* SUMMARY CARDS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        {/* Fine Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Fine Ore Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-blue-400">
            {totalFineOre.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            30-day total
          </p>

        </div>


        {/* Lump Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Lump Ore Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-purple-400">
            {totalLumpOre.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            30-day total
          </p>

        </div>


        {/* Overall */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Overall Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {totalOverallProduction.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Fine Ore + Lump Ore
          </p>

        </div>


        {/* Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Average Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {averageEfficiency.toFixed(1)}%
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            30-day average
          </p>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* SECONDARY METRICS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        {/* Average Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Average Daily Production
          </p>

          <h2 className="text-2xl font-bold mt-3 text-white">
            {Math.round(
              averageProduction
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Best Day */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Best Production Day
          </p>

          <h2 className="text-2xl font-bold mt-3 text-green-400">
            {bestProductionDay.date}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {bestProductionDay.overall.toLocaleString()} MT
          </p>

        </div>


        {/* Target Achievement */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Target Achievement
          </p>

          <h2 className="text-2xl font-bold mt-3 text-blue-400">
            {targetAchievement}%
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {daysAboveTarget} of {displayData.length} days
          </p>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* PRODUCTION BY ORE TYPE */}
      {/* --------------------------------------------- */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-2 text-white">
          Fine Ore vs Lump Ore Production
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          Daily comparison of the two production outputs.
        </p>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={displayData}>

              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{
                  fill: "#E2E8F0",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{
                  fill: "#E2E8F0",
                }}
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
                dataKey="fineOre"
                name="Fine Ore"
                fill="#60A5FA"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="lumpOre"
                name="Lump Ore"
                fill="#A78BFA"
                radius={[4, 4, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* PRODUCTION VS TARGET */}
      {/* --------------------------------------------- */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-2 text-white">
          Overall Production vs Target
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          30-day comparison between actual overall production and target.
        </p>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={displayData}>

              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{
                  fill: "#E2E8F0",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={{ stroke: "#475569" }}
                tickLine={false}
                tick={{
                  fill: "#E2E8F0",
                }}
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
                dataKey="overall"
                name="Overall Production"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="target"
                name="Target"
                fill="#64748B"
                radius={[4, 4, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* EFFICIENCY + TARGET */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


        {/* Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2 text-white">
            30-Day Efficiency Trend
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            Daily overall production efficiency against target.
          </p>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={displayData}>

                <XAxis
                  dataKey="date"
                  axisLine={{ stroke: "#475569" }}
                  tickLine={false}
                  tick={{
                    fill: "#E2E8F0",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  axisLine={{ stroke: "#475569" }}
                  tickLine={false}
                  tick={{
                    fill: "#E2E8F0",
                  }}
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
                  name="Efficiency"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ r: 3 }}
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
              />

            </div>

          </div>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* OPERATIONAL INSIGHTS */}
      {/* --------------------------------------------- */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5 text-white">
          Operational Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          {/* Production */}

          <div className="bg-[#1B2A40] rounded-xl p-4">

            <p className="text-blue-400 font-semibold">
              Fine Ore
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Fine ore averaged{" "}
              {Math.round(
                averageFineOre
              ).toLocaleString()} MT
              per operating day.
            </p>

          </div>


          {/* Lump */}

          <div className="bg-[#1B2A40] rounded-xl p-4">

            <p className="text-purple-400 font-semibold">
              Lump Ore
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Lump ore averaged{" "}
              {Math.round(
                averageLumpOre
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
              {worstProductionDay.date} recorded
              the lowest overall production at{" "}
              {worstProductionDay.overall.toLocaleString()} MT.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;