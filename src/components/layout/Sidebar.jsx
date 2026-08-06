import React from "react";
import {
  FaHome,
  FaChartBar,
  FaBoxOpen,
  FaIndustry,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
    const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    name: "Production",
    icon: <FaIndustry />,
  },
  {
    name: "Stock",
    icon: <FaBoxOpen />,
  },
  {
    name: "Analytics",
    icon: <FaChartBar />,
  },
];
  return (
    <div className=" fixed left-0 top-0 w-64 h-screenw-64 h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold p-6">MineOps</h1>
      <ul className="space-y-3 px-4">
  {menuItems.map((item) => (
    <li
      key={item.name}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition"
    >
      {item.icon}
      <span>{item.name}</span>
    </li>
  ))}
</ul>
    </div>
  );
};

export default Sidebar;
