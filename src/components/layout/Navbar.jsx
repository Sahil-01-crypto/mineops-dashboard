import { FaBell, FaMoon, FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="
        sticky top-0 z-50
        h-20
        bg-[#111827]
        border-b border-[#1E293B]
        flex items-center justify-between
        px-8
      "
    >
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
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">
        <button
          className="
            h-11 w-11
            rounded-xl
            bg-[#182235]
            border border-[#2A3A55]
            flex items-center justify-center
            hover:bg-[#22304a]
            transition
          "
        >
          <FaMoon className="text-slate-300 text-lg" />
        </button>

        <button
          className="
            relative
            h-11 w-11
            rounded-xl
            bg-[#182235]
            border border-[#2A3A55]
            flex items-center justify-center
            hover:bg-[#22304a]
            transition
          "
        >
          <FaBell className="text-slate-300 text-lg" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        <button
          className="
            h-11 w-11
            rounded-full
            bg-blue-600
            flex items-center justify-center
            hover:bg-blue-500
            transition
          "
        >
          <FaUserCircle className="text-white text-2xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;