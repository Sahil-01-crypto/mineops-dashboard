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

    // ==================================================
    // PREPARE DATA
    // ==================================================

    const processedData = mineData.map((item) => {
      const fineOreProduction =
        Number(item.fineOreProduction) || 0;

      const lumpOreProduction =
        Number(item.lumpOreProduction) || 0;

      const overallProduction =
        fineOreProduction + lumpOreProduction;

      const target =
        Number(item.target) || 0;

      const dispatch =
        Number(item.dispatch) || 0;

      const fineOreStock =
        Number(item.fineOreStock) || 0;

      const lumpOreStock =
        Number(item.lumpOreStock) || 0;

      const overallStock =
        fineOreStock + lumpOreStock;

      const efficiency =
        target > 0
          ? (overallProduction / target) * 100
          : 0;

      return {
        date: item.date,

        fineOreProduction,
        lumpOreProduction,
        overallProduction,

        target,
        dispatch,

        fineOreStock,
        lumpOreStock,
        overallStock,

        efficiency,
      };
    });


    // ==================================================
    // PRODUCTION CALCULATIONS
    // ==================================================

    const totalFineOreProduction =
      processedData.reduce(
        (sum, item) =>
          sum + item.fineOreProduction,
        0
      );

    const totalLumpOreProduction =
      processedData.reduce(
        (sum, item) =>
          sum + item.lumpOreProduction,
        0
      );

    const totalOverallProduction =
      totalFineOreProduction +
      totalLumpOreProduction;


    const averageDailyProduction =
      totalOverallProduction /
      processedData.length;


    // ==================================================
    // EFFICIENCY
    // ==================================================

    const averageEfficiency =
      processedData.reduce(
        (sum, item) =>
          sum + item.efficiency,
        0
      ) / processedData.length;


    // ==================================================
    // TARGET ACHIEVEMENT
    // ==================================================

    const daysAboveTarget =
      processedData.filter(
        (item) =>
          item.overallProduction >= item.target
      ).length;


    const targetAchievement =
      processedData.length > 0
        ? (daysAboveTarget /
            processedData.length) *
          100
        : 0;


    // ==================================================
    // BEST / WORST PRODUCTION
    // ==================================================

    const bestDay =
      processedData.reduce(
        (best, item) =>
          item.overallProduction >
          best.overallProduction
            ? item
            : best,
        processedData[0]
      );


    const worstDay =
      processedData.reduce(
        (worst, item) =>
          item.overallProduction <
          worst.overallProduction
            ? item
            : worst,
        processedData[0]
      );


    // ==================================================
    // STOCK CALCULATIONS
    // ==================================================

    const currentData =
      processedData[processedData.length - 1];


    const currentFineOreStock =
      currentData.fineOreStock;

    const currentLumpOreStock =
      currentData.lumpOreStock;

    const currentOverallStock =
      currentData.overallStock;


    const averageFineOreStock =
      processedData.reduce(
        (sum, item) =>
          sum + item.fineOreStock,
        0
      ) / processedData.length;


    const averageLumpOreStock =
      processedData.reduce(
        (sum, item) =>
          sum + item.lumpOreStock,
        0
      ) / processedData.length;


    const averageOverallStock =
      processedData.reduce(
        (sum, item) =>
          sum + item.overallStock,
        0
      ) / processedData.length;


    const highestOverallStock =
      Math.max(
        ...processedData.map(
          (item) => item.overallStock
        )
      );


    const lowestOverallStock =
      Math.min(
        ...processedData.map(
          (item) => item.overallStock
        )
      );


    // ==================================================
    // CREATE PDF
    // ==================================================

    const doc = new jsPDF();

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();


    // ==================================================
    // HEADER
    // ==================================================

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
      "Monthly Operational Performance Report",
      20,
      33
    );

    doc.setDrawColor(
      80,
      100,
      130
    );

    doc.line(
      20,
      40,
      pageWidth - 20,
      40
    );


    // ==================================================
    // REPORT INFORMATION
    // ==================================================

    doc.setFontSize(10);

    doc.text(
      `Report Generated: ${new Date().toLocaleDateString()}`,
      20,
      50
    );

    doc.text(
      `Operational Records Analyzed: ${processedData.length}`,
      20,
      57
    );

    doc.text(
      "Analysis Period: 30 Days",
      20,
      64
    );


    // ==================================================
    // EXECUTIVE SUMMARY
    // ==================================================

    doc.setFontSize(16);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Executive Summary",
      20,
      78
    );

    doc.setFontSize(10);
    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.text(
      `Fine Ore Production: ${totalFineOreProduction.toLocaleString()} MT`,
      25,
      88
    );

    doc.text(
      `Lump Ore Production: ${totalLumpOreProduction.toLocaleString()} MT`,
      25,
      96
    );

    doc.text(
      `Overall Production: ${totalOverallProduction.toLocaleString()} MT`,
      25,
      104
    );

    doc.text(
      `Average Daily Production: ${Math.round(
        averageDailyProduction
      ).toLocaleString()} MT`,
      25,
      112
    );

    doc.text(
      `Average Efficiency: ${averageEfficiency.toFixed(1)}%`,
      25,
      120
    );

    doc.text(
      `Target Achievement: ${targetAchievement.toFixed(0)}%`,
      25,
      128
    );


    // ==================================================
    // STOCK SUMMARY
    // ==================================================

    doc.setFontSize(16);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Stock Summary",
      20,
      145
    );

    doc.setFontSize(10);
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Current Fine Ore Stock: ${currentFineOreStock.toLocaleString()} MT`,
      25,
      155
    );

    doc.text(
      `Current Lump Ore Stock: ${currentLumpOreStock.toLocaleString()} MT`,
      25,
      163
    );

    doc.text(
      `Current Overall Stock: ${currentOverallStock.toLocaleString()} MT`,
      25,
      171
    );

    doc.text(
      `Average Fine Ore Stock: ${Math.round(
        averageFineOreStock
      ).toLocaleString()} MT`,
      25,
      179
    );

    doc.text(
      `Average Lump Ore Stock: ${Math.round(
        averageLumpOreStock
      ).toLocaleString()} MT`,
      25,
      187
    );

    doc.text(
      `Average Overall Stock: ${Math.round(
        averageOverallStock
      ).toLocaleString()} MT`,
      25,
      195
    );


    // ==================================================
    // PERFORMANCE ANALYSIS
    // ==================================================

    doc.addPage();

    doc.setFontSize(16);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Performance Analysis",
      20,
      25
    );

    doc.setFontSize(10);
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Best Production Day: ${bestDay.date} (${bestDay.overallProduction.toLocaleString()} MT)`,
      25,
      37
    );

    doc.text(
      `Lowest Production Day: ${worstDay.date} (${worstDay.overallProduction.toLocaleString()} MT)`,
      25,
      45
    );

    doc.text(
      `Days Meeting Target: ${daysAboveTarget} of ${processedData.length}`,
      25,
      53
    );

    doc.text(
      `Highest Overall Stock: ${highestOverallStock.toLocaleString()} MT`,
      25,
      61
    );

    doc.text(
      `Lowest Overall Stock: ${lowestOverallStock.toLocaleString()} MT`,
      25,
      69
    );


    // ==================================================
    // PRODUCTION TABLE
    // ==================================================

    doc.setFontSize(16);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "30-Day Production Analysis",
      20,
      85
    );


    const productionTableData =
      processedData.map(
        (item) => [
          item.date,

          `${item.fineOreProduction.toLocaleString()} MT`,

          `${item.lumpOreProduction.toLocaleString()} MT`,

          `${item.overallProduction.toLocaleString()} MT`,

          `${item.target.toLocaleString()} MT`,

          `${item.efficiency.toFixed(1)}%`,
        ]
      );


    autoTable(doc, {

      startY: 91,

      head: [
        [
          "Date",
          "Fine Ore",
          "Lump Ore",
          "Overall",
          "Target",
          "Efficiency",
        ],
      ],

      body: productionTableData,

      theme: "grid",

      styles: {
        fontSize: 7.5,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [
          30,
          45,
          70,
        ],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [
          245,
          247,
          250,
        ],
      },
    });


    // ==================================================
    // STOCK TABLE
    // ==================================================

    const stockTableStart =
      doc.lastAutoTable.finalY + 15;


    // If table is too close to footer,
    // start stock section on a new page.

    if (
      stockTableStart >
      pageHeight - 50
    ) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "30-Day Stock Analysis",
        20,
        25
      );
    } else {

      doc.setFontSize(16);
      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "30-Day Stock Analysis",
        20,
        stockTableStart
      );
    }


    const actualStockStart =
      stockTableStart >
      pageHeight - 50
        ? 31
        : stockTableStart + 6;


    const stockTableData =
      processedData.map(
        (item, index) => {

          const previousStock =
            index > 0
              ? processedData[
                  index - 1
                ].overallStock
              : item.overallStock;


          const change =
            item.overallStock -
            previousStock;


          return [

            item.date,

            `${item.fineOreStock.toLocaleString()} MT`,

            `${item.lumpOreStock.toLocaleString()} MT`,

            `${item.overallStock.toLocaleString()} MT`,

            index === 0
              ? "—"
              : `${
                  change > 0
                    ? "+"
                    : ""
                }${change.toLocaleString()} MT`,
          ];
        }
      );


    autoTable(doc, {

      startY: actualStockStart,

      head: [
        [
          "Date",
          "Fine Ore Stock",
          "Lump Ore Stock",
          "Overall Stock",
          "Change",
        ],
      ],

      body: stockTableData,

      theme: "grid",

      styles: {
        fontSize: 7.5,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [
          30,
          45,
          70,
        ],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [
          245,
          247,
          250,
        ],
      },
    });


    // ==================================================
    // FOOTER
    // ==================================================

    const pageCount =
      doc.internal.getNumberOfPages();


    for (
      let page = 1;
      page <= pageCount;
      page++
    ) {

      doc.setPage(page);

      doc.setFontSize(8);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setTextColor(
        100,
        100,
        100
      );

      doc.text(
        `MineOps Operational Report • Page ${page} of ${pageCount}`,
        20,
        pageHeight - 10
      );

    }


    // ==================================================
    // DOWNLOAD
    // ==================================================

    doc.save(
      "MineOps_30_Day_Operational_Report.pdf"
    );
  };


  return (
    <button
      onClick={generateReport}
      disabled={
        !mineData ||
        mineData.length === 0
      }
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition"
    >
      Generate PDF Report
    </button>
  );
};

export default PDFReportGenerator;