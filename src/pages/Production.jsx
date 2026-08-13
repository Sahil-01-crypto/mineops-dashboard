import React from "react";
import { useMineData } from "../context/MineDataContext.jsx";

const Production = () => {
  const { mineData } = useMineData();

  // If no Excel data has been uploaded
  if (!mineData || mineData.length === 0) {
    return (
      <div className="m-1 p-8">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Production
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor monthly fine ore, lump ore and overall production.
          </p>

        </div>

        {/* Empty State */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-10 text-center">

          <h2 className="text-xl font-semibold text-white">
            No Production Data
          </h2>

          <p className="text-slate-400 mt-2">
            Upload an Excel or CSV file from the Dashboard to view
            monthly production data.
          </p>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // PRODUCTION VALUES
  // --------------------------------------------------

  const fineOreProduction = mineData.reduce(
    (sum, item) =>
      sum + (Number(item.fineOreProduction) || 0),
    0
  );

  const lumpOreProduction = mineData.reduce(
    (sum, item) =>
      sum + (Number(item.lumpOreProduction) || 0),
    0
  );

  // Overall production
  const overallProduction =
    fineOreProduction + lumpOreProduction;


  // --------------------------------------------------
  // AVERAGE DAILY PRODUCTION
  // --------------------------------------------------

  const averageProduction =
    overallProduction / mineData.length;


  // --------------------------------------------------
  // EFFICIENCY
  // --------------------------------------------------

  const efficiencyValues = mineData.map((item) => {

    const production =
      Number(item.overallProduction) || 0;

    const target =
      Number(item.target) || 0;

    return target > 0
      ? (production / target) * 100
      : 0;

  });


  const averageEfficiency =
    efficiencyValues.reduce(
      (sum, value) => sum + value,
      0
    ) / efficiencyValues.length;


  // --------------------------------------------------
  // TARGET ACHIEVEMENT
  // --------------------------------------------------

  const targetAchievementDays =
    mineData.filter((item) => {

      const production =
        Number(item.overallProduction) || 0;

      const target =
        Number(item.target) || 0;

      return production >= target;

    }).length;


  const targetAchievement =
    mineData.length > 0
      ? (targetAchievementDays / mineData.length) * 100
      : 0;


  // --------------------------------------------------
  // DAILY PRODUCTION TABLE
  // --------------------------------------------------

  const dailyProduction = mineData.map((item) => {

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
  // HIGHEST PRODUCTION DAY
  // --------------------------------------------------

  const highestProductionDay =
    dailyProduction.reduce(
      (highest, current) =>
        current.overall > highest.overall
          ? current
          : highest,
      dailyProduction[0]
    );


  // --------------------------------------------------
  // LOWEST PRODUCTION DAY
  // --------------------------------------------------

  const lowestProductionDay =
    dailyProduction.reduce(
      (lowest, current) =>
        current.overall < lowest.overall
          ? current
          : lowest,
      dailyProduction[0]
    );


  return (
    <div className="m-1 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Production
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor monthly fine ore, lump ore and overall production.
        </p>

      </div>


      {/* --------------------------------------------- */}
      {/* SUMMARY CARDS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        {/* Fine Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Fine Ore Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-blue-400">
            {fineOreProduction.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Total for 30 days
          </p>

        </div>


        {/* Lump Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Lump Ore Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-purple-400">
            {lumpOreProduction.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Total for 30 days
          </p>

        </div>


        {/* Overall */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Overall Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {overallProduction.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Fine Ore + Lump Ore
          </p>

        </div>


        {/* Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {averageEfficiency.toFixed(1)}%
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Monthly average
          </p>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* SECONDARY SUMMARY */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        {/* Average Daily Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Daily Production
          </p>

          <h2 className="text-2xl font-bold mt-3 text-white">
            {Math.round(
              averageProduction
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Target Achievement */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Target Achievement
          </p>

          <h2 className="text-2xl font-bold mt-3 text-green-400">
            {targetAchievement.toFixed(1)}%
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Days meeting production target
          </p>

        </div>


        {/* Highest Production Day */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Highest Production Day
          </p>

          <h2 className="text-2xl font-bold mt-3 text-white">
            {highestProductionDay.date}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {highestProductionDay.overall.toLocaleString()} MT
          </p>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* PRODUCTION TABLE */}
      {/* --------------------------------------------- */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">

          <h2 className="text-xl font-semibold text-white">
            30-Day Production Analysis
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Daily fine ore, lump ore and overall production performance.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#1B2A40]">

              <tr>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Fine Ore
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Lump Ore
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Overall
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Target
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Efficiency
                </th>

              </tr>

            </thead>


            <tbody>

              {dailyProduction.map((item, index) => (

                <tr
                  key={`${item.date}-${index}`}
                  className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                >

                  {/* Date */}

                  <td className="px-6 py-4 text-white">
                    {item.date}
                  </td>


                  {/* Fine Ore */}

                  <td className="px-6 py-4 font-semibold text-blue-400">
                    {item.fineOre.toLocaleString()} MT
                  </td>


                  {/* Lump Ore */}

                  <td className="px-6 py-4 font-semibold text-purple-400">
                    {item.lumpOre.toLocaleString()} MT
                  </td>


                  {/* Overall */}

                  <td className="px-6 py-4 font-semibold text-white">
                    {item.overall.toLocaleString()} MT
                  </td>


                  {/* Target */}

                  <td className="px-6 py-4 text-slate-400">
                    {item.target.toLocaleString()} MT
                  </td>


                  {/* Efficiency */}

                  <td
                    className={`px-6 py-4 font-semibold ${
                      item.efficiency >= 100
                        ? "text-green-400"
                        : item.efficiency >= 90
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.efficiency}%
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* PRODUCTION INSIGHTS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">


        {/* Highest */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-green-400 font-semibold">
            ↑ Highest Production
          </p>

          <p className="text-white text-lg font-semibold mt-2">
            {highestProductionDay.date}
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Overall production reached{" "}
            {highestProductionDay.overall.toLocaleString()} MT.
          </p>

        </div>


        {/* Lowest */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-yellow-400 font-semibold">
            ↓ Lowest Production
          </p>

          <p className="text-white text-lg font-semibold mt-2">
            {lowestProductionDay.date}
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Overall production was{" "}
            {lowestProductionDay.overall.toLocaleString()} MT.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Production;