import React, { useState } from "react";

import Sidebar from "./components/layout/Sidebar.jsx";
import Navbar from "./components/layout/Navbar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Production from "./pages/Production.jsx";
import Stock from "./pages/Stock.jsx";
import Analytics from "./pages/Analytics.jsx";

import { MineDataProvider } from "./context/MineDataContext.jsx";

const App = () => {
  const [page, setPage] = useState("Dashboard");

  return (
    <MineDataProvider>

      <Sidebar setPage={setPage} />

      <div className="flex-1 ml-64 bg-[#0B1220] min-h-screen">

        <Navbar />

        {page === "Dashboard" && <Dashboard />}

        {page === "Production" && <Production />}

        {page === "Stock" && <Stock />}

        {page === "Analytics" && <Analytics />}

      </div>

    </MineDataProvider>
  );
};

export default App;