# ⛏️ MineOps

### Mining Operations Intelligence Dashboard

MineOps is a web-based mining operations analytics platform that transforms operational data from Excel/CSV files into an interactive dashboard for monitoring production, stock, efficiency, and operational performance.

The application allows users to upload operational data once and automatically analyzes the dataset across multiple sections including Dashboard, Production, Stock, and Analytics.

---

## 🚀 Features

### 📊 Interactive Dashboard

Get a high-level overview of mining operations including:

- Today's Production
- Today's Dispatch
- Available Stock
- Active Equipment
- Production Trend
- Daily Operational Summary

All dashboard metrics are generated from the uploaded operational dataset.

---

### 📁 Excel / CSV Data Upload

MineOps allows users to upload operational data directly through the application.

The uploaded dataset is processed and stored centrally so that all sections of the application can use the same data.

```text
Excel / CSV
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
🏭 Production Monitoring

The Production section provides:

Total production
Average daily production
Production efficiency
Daily production table
Target vs actual production
Daily performance analysis

Production metrics are calculated dynamically from the uploaded dataset.
