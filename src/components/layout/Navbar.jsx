import React, { useState } from "react";
import { FaBell, FaMoon, FaSearch, FaUserCircle } from "react-icons/fa";

import { useMineData } from "../../context/MineDataContext.jsx";

const Navbar = () => {
  const { mineData } = useMineData();

  const [search, setSearch] = useState("");

  const searchResults =
    search.trim() && mineData
      ? mineData.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase()),
          ),
        )
      : [];

  return (
    <nav className="h-20 px-8 flex items-center justify-between">
      {/* Search Section */}

      <div className="relative w-[550px]">
        <FaSearch
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
            text-lg
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search production, stock..."
          className="
            w-full
            h-11
            rounded-xl
            bg-[#0F172A]
            border border-[#2A3A55]
            pl-12
            pr-4
            text-slate-200
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />

        {/* Search Results */}

        {search.trim() && (
          <div
            className="
              absolute
              top-14
              left-0
              w-full
              bg-[#172236]
              border border-[#2A3B57]
              rounded-xl
              shadow-xl
              z-50
              overflow-hidden
            "
          >
            {searchResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    className="
                      px-5
                      py-4
                      border-b
                      border-[#2A3B57]
                      hover:bg-[#1B2A40]
                      transition
                    "
                  >
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">
                        {item.Date || "Unknown Date"}
                      </span>

                      <span className="text-blue-400">
                        {item.Production
                          ? `${Number(item.Production).toLocaleString()} MT`
                          : "No Production Data"}
                      </span>
                    </div>

                    <div className="flex gap-5 mt-2 text-sm text-slate-400">
                      <span>
                        Target:{" "}
                        {item.Target
                          ? Number(item.Target).toLocaleString()
                          : "—"}
                      </span>

                      <span>
                        Dispatch:{" "}
                        {item.Dispatch
                          ? Number(item.Dispatch).toLocaleString()
                          : "—"}
                      </span>

                      <span>
                        Stock:{" "}
                        {item.Stock ? Number(item.Stock).toLocaleString() : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-6 text-center text-slate-400">
                No matching records found.
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
