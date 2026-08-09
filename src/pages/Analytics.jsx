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

const analyticsData = [
  {
    day: "Mon",
    production: 11200,
    target: 12000,
    efficiency: 93,
  },
  {
    day: "Tue",
    production: 12450,
    target: 12000,
    efficiency: 104,
  },
  {
    day: "Wed",
    production: 11800,
    target: 12500,
    efficiency: 94,
  },
  {
    day: "Thu",
    production: 13200,
    target: 12500,
    efficiency: 106,
  },
  {
    day: "Fri",
    production: 12900,
    target: 12500,
    efficiency: 103,
  },
  {
    day: "Sat",
    production: 13700,
    target: 13000,
    efficiency: 105,
  },
  {
    day: "Sun",
    production: 12800,
    target: 13000,
    efficiency: 98,
  },
];

const shiftData = [
  {
    shift: "Morning",
    production: 42000,
  },
  {
    shift: "Evening",
    production: 28500,
  },
  {
    shift: "Night",
    production: 17550,
  },
];

const Analytics = () => {
  return (
    <div className="p-8 text-white">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Analyze production performance and operational trends.
        </p>
      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Avg. Production
          </p>

          <h2 className="text-3xl font-bold mt-3">
            12,579 MT
          </h2>
        </div>


        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Avg. Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            100.4%
          </h2>
        </div>


        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Best Production Day
          </p>

          <h2 className="text-3xl font-bold mt-3">
            Saturday
          </h2>
        </div>

      </div>


      {/* Production vs Target */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-6">
          Production vs Target
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={analyticsData}>

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

          <h2 className="text-xl font-semibold mb-6">
            Efficiency Trend
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={analyticsData}>

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


        {/* Shift Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Production by Shift
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={shiftData}>

                <XAxis
                  dataKey="shift"
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

                <Bar
                  dataKey="production"
                  fill="#A78BFA"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Operational Insights */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Operational Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-[#1B2A40] rounded-xl p-4">
            <p className="text-green-400 font-semibold">
              ↑ Production
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Production remained above target on most operating days.
            </p>
          </div>


          <div className="bg-[#1B2A40] rounded-xl p-4">
            <p className="text-yellow-400 font-semibold">
              ⚠ Attention
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Wednesday recorded production below the daily target.
            </p>
          </div>


          <div className="bg-[#1B2A40] rounded-xl p-4">
            <p className="text-blue-400 font-semibold">
              ★ Best Performance
            </p>

            <p className="text-slate-300 text-sm mt-2">
              Saturday recorded the highest production of the week.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;