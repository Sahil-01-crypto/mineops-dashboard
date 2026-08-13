# ⛏️ MineOps

### Mining Operations Intelligence Dashboard

MineOps is a web-based mining operations analytics platform that transforms structured operational data from Excel/CSV files into an interactive dashboard for monitoring production, stock, efficiency, and operational performance.

The application allows users to upload operational data once and automatically analyzes the dataset across multiple sections including **Dashboard, Production, Stock, and Analytics**.

The current version is designed around a **30-day operational dataset** and distinguishes between **Fine Ore, Lump Ore, and Overall Production/Stock** to provide a more detailed view of mining operations.

---

## 🚀 Features

### 📊 Interactive Dashboard

The MineOps Dashboard provides a high-level overview of the uploaded mining dataset.

It includes:

- Fine Ore Production
- Lump Ore Production
- Overall Production
- Overall Stock
- Today's Dispatch
- 30-Day Production Trend
- Daily Operational Summary

All dashboard metrics are calculated dynamically from the uploaded operational dataset.

The production trend allows users to compare:

- Fine Ore
- Lump Ore
- Overall Production

The dashboard does not display arbitrary operational values when no dataset has been uploaded.

---

### 📁 Excel / CSV Data Upload

MineOps allows users to upload operational data directly through the application.

The uploaded dataset is processed on the client side and stored centrally so that all sections of the application can use the same data.

```text
Excel / CSV
     ↓
ExcelUploader
     ↓
Data Processing
     ↓
MineDataContext
     ↓
Dashboard
Production
Stock
Analytics
```

###🔄 Application Workflow
```
1. Open MineOps
        ↓
2. Upload Excel / CSV
        ↓
3. ExcelUploader processes the dataset
        ↓
4. Data is stored in MineDataContext
        ↓
5. Dashboard displays operational overview
        ↓
6. Production analyzes Fine + Lump + Overall Production
        ↓
7. Stock analyzes Fine + Lump + Overall Stock
        ↓
8. Analytics generates performance visualizations
        ↓
9. Search provides quick navigation
        ↓
10. PDF Report generates an operational summary
```

# 📋 Expected Data Format

MineOps is designed to process a **30-day operational dataset** containing
production, stock, target, and dispatch information.

The dataset separates the two major production outputs:

- Fine Ore
- Lump Ore

The application then calculates or uses the corresponding overall values.

---

## 📊 Example Operational Dataset

The Excel file can follow a structure like this:

| Date | Fine Ore Production | Lump Ore Production | Overall Production | Target | Dispatch | Fine Ore Stock | Lump Ore Stock | Overall Stock |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 01-08-2026 | 5,900 | 3,750 | 9,650 | 12,000 | 9,000 | 24,000 | 17,350 | 41,350 |
| 02-08-2026 | 6,300 | 4,000 | 10,300 | 12,000 | 9,500 | 24,750 | 17,900 | 42,650 |
| 03-08-2026 | 5,600 | 3,600 | 9,200 | 11,500 | 8,700 | 24,200 | 17,500 | 41,700 |
| 04-08-2026 | 6,850 | 4,350 | 11,200 | 12,500 | 10,200 | 24,950 | 18,100 | 43,050 |
| 05-08-2026 | 5,500 | 3,550 | 9,050 | 12,000 | 8,800 | 24,150 | 17,500 | 41,650 |
| 06-08-2026 | 5,900 | 3,700 | 9,600 | 12,000 | 9,100 | 23,900 | 17,350 | 41,250 |
| 07-08-2026 | 6,200 | 4,000 | 10,200 | 12,500 | 9,600 | 24,300 | 17,800 | 42,100 |

> **Note:** The above values are example/demo data intended to demonstrate
> the expected structure of the MineOps dataset.

---

## 🧮 Data Relationships

MineOps uses the following operational relationships:

### Overall Production

```text
Overall Production
=
Fine Ore Production + Lump Ore Production
```

## ⭐ Future Vision

MineOps can evolve from a client-side analytics dashboard into a complete mining operations intelligence platform with real-time data, backend services, persistent storage, alerts, authentication, and predictive analytics.

---

## 👨‍💻 Author

**Sahil Kumar Singh**

Built as a project exploring  development, data visualization, and operational analytics for mining applications.

---

## 📜 License

This project is intended for learning, experimentation, and portfolio purposes.
