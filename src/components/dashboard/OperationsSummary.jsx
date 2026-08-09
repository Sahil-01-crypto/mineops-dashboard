import React from "react";

const OperationsSummary = () => {
  return (
    <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6 h-full">

      <h2 className="text-xl font-semibold text-white mb-6">
        Today's Operations
      </h2>

      {/* Production */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">Production</span>
          <span className="text-white font-semibold">
            12,480 MT
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div className="h-2 w-[89%] bg-blue-400 rounded-full"></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          89% of daily target
        </p>
      </div>

      {/* Dispatch */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">Dispatch</span>
          <span className="text-white font-semibold">
            10,920 MT
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div className="h-2 w-[78%] bg-blue-400 rounded-full"></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          78% of daily target
        </p>
      </div>

      {/* Equipment */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">Equipment</span>
          <span className="text-white font-semibold">
            34 / 41
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div className="h-2 w-[83%] bg-blue-400 rounded-full"></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          83% currently active
        </p>
      </div>

      {/* Target */}
      <div className="border-t border-[#2A3B57] pt-5">
        <p className="text-sm text-slate-400">
          Daily Production Target
        </p>

        <p className="text-2xl font-bold text-white mt-1">
          14,000 MT
        </p>
      </div>

    </div>
  );
};

export default OperationsSummary;