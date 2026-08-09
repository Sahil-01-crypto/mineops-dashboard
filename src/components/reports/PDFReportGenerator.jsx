import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useMineData } from "../../context/MineDataContext.jsx";

const PDFReportGenerator = () => {
  const { mineData } = useMineData();

  const generateReport = () => {
    if (!mineData || mineData.length === 0) {
      alert("Please upload operational data first.");
      return;
    }

    // -----------------------------
    // Prepare data
    // -----------------------------

    const productionValues = mineData.map(
      (item) => Number(item.Production) || 0
    );

    const stockValues = mineData.map(
      (item) => Number(item.Stock) || 0
    );

    const totalProduction = productionValues.reduce(
      (sum, value) => sum + value,
      0
    );

    const averageProduction =
      totalProduction / mineData.length;

    const efficiencyValues = mineData.map((item) => {
      const production = Number(item.Production) || 0;
      const target = Number(item.Target) || 0;

      return target > 0
        ? (production / target) * 100
        : 0;
    });

    const averageEfficiency =
      efficiencyValues.reduce(
        (sum, value) => sum + value,
        0
      ) / efficiencyValues.length;

    const bestDay = mineData.reduce(
      (best, item) =>
        Number(item.Production) >
        Number(best.Production)
          ? item
          : best
    );

    const worstDay = mineData.reduce(
      (worst, item) =>
        Number(item.Production) <
        Number(worst.Production)
          ? item
          : worst
    );

    const currentStock =
      stockValues[stockValues.length - 1];

    const daysAboveTarget = mineData.filter((item) => {
      const production = Number(item.Production) || 0;
      const target = Number(item.Target) || 0;

      return production >= target;
    }).length;

    const targetAchievement =
      (daysAboveTarget / mineData.length) * 100;


    // -----------------------------
    // Create PDF
    // -----------------------------

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();


    // -----------------------------
    // Header
    // -----------------------------

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");

    doc.text(
      "MineOps",
      20,
      25
    );

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Operational Performance Report",
      20,
      33
    );

    doc.setDrawColor(80, 100, 130);

    doc.line(
      20,
      40,
      pageWidth - 20,
      40
    );


    // -----------------------------
    // Report Information
    // -----------------------------

    doc.setFontSize(11);

    doc.text(
      `Report Date: ${new Date().toLocaleDateString()}`,
      20,
      50
    );

    doc.text(
      `Records Analyzed: ${mineData.length}`,
      20,
      57
    );


    // -----------------------------
    // Executive Summary
    // -----------------------------

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Executive Summary",
      20,
      72
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Total Production: ${totalProduction.toLocaleString()} MT`,
      25,
      82
    );

    doc.text(
      `Average Daily Production: ${Math.round(
        averageProduction
      ).toLocaleString()} MT`,
      25,
      90
    );

    doc.text(
      `Average Efficiency: ${averageEfficiency.toFixed(1)}%`,
      25,
      98
    );

    doc.text(
      `Current Stock: ${currentStock.toLocaleString()} MT`,
      25,
      106
    );

    doc.text(
      `Target Achievement: ${targetAchievement.toFixed(0)}%`,
      25,
      114
    );


    // -----------------------------
    // Performance Analysis
    // -----------------------------

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Performance Analysis",
      20,
      132
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Best Production Day: ${bestDay.Date} (${Number(
        bestDay.Production
      ).toLocaleString()} MT)`,
      25,
      142
    );

    doc.text(
      `Lowest Production Day: ${worstDay.Date} (${Number(
        worstDay.Production
      ).toLocaleString()} MT)`,
      25,
      150
    );

    doc.text(
      `Days Meeting Target: ${daysAboveTarget} of ${mineData.length}`,
      25,
      158
    );


    // -----------------------------
    // Daily Production Table
    // -----------------------------

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Daily Production",
      20,
      178
    );

    const tableData = mineData.map((item) => {
      const production =
        Number(item.Production) || 0;

      const target =
        Number(item.Target) || 0;

      const efficiency =
        target > 0
          ? ((production / target) * 100).toFixed(1)
          : "N/A";

      return [
        item.Date,
        `${production.toLocaleString()} MT`,
        `${target.toLocaleString()} MT`,
        `${efficiency}%`,
      ];
    });

    autoTable(doc, {
      startY: 184,

      head: [
        [
          "Day",
          "Production",
          "Target",
          "Efficiency",
        ],
      ],

      body: tableData,

      theme: "grid",

      styles: {
        fontSize: 9,
        cellPadding: 4,
      },

      headStyles: {
        fillColor: [30, 45, 70],
        textColor: 255,
      },
    });


    // -----------------------------
    // Stock History
    // -----------------------------

    const stockTableStart =
      doc.lastAutoTable.finalY + 15;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Stock History",
      20,
      stockTableStart
    );

    const stockTableData = mineData.map(
      (item, index) => {
        const stock =
          Number(item.Stock) || 0;

        const previousStock =
          index > 0
            ? Number(mineData[index - 1].Stock) || 0
            : stock;

        const change =
          stock - previousStock;

        return [
          item.Date,
          `${stock.toLocaleString()} MT`,
          index === 0
            ? "—"
            : `${change > 0 ? "+" : ""}${change.toLocaleString()} MT`,
        ];
      }
    );

    autoTable(doc, {
      startY: stockTableStart + 6,

      head: [
        [
          "Day",
          "Available Stock",
          "Change",
        ],
      ],

      body: stockTableData,

      theme: "grid",

      styles: {
        fontSize: 9,
        cellPadding: 4,
      },

      headStyles: {
        fillColor: [30, 45, 70],
        textColor: 255,
      },
    });


    // -----------------------------
    // Footer
    // -----------------------------

    const pageCount =
      doc.internal.getNumberOfPages();

    for (
      let page = 1;
      page <= pageCount;
      page++
    ) {
      doc.setPage(page);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      doc.text(
        `MineOps Operational Report • Page ${page} of ${pageCount}`,
        20,
        doc.internal.pageSize.getHeight() - 10
      );
    }


    // -----------------------------
    // Download PDF
    // -----------------------------

    doc.save(
      "MineOps_Operational_Report.pdf"
    );
  };


  return (
    <button
      onClick={generateReport}
      disabled={!mineData || mineData.length === 0}
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition"
    >
      Generate PDF Report
    </button>
  );
};

export default PDFReportGenerator;