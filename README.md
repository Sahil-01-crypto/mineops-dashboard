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

---

### 🏭 Production Monitoring

The Production section provides:

- Total production
- Average daily production
- Production efficiency
- Daily production table
- Target vs actual production
- Daily performance analysis

Production metrics are calculated dynamically from the uploaded dataset.

---

### 📦 Stock Monitoring

The Stock section provides:

- Current stock
- Highest recorded stock
- Average stock
- Stock history
- Daily stock changes
- Stock increase/decrease status

Stock metrics are calculated dynamically from the uploaded dataset.

---

### 📈 Analytics

The Analytics section provides:

- Average production
- Average efficiency
- Best production day
- Lowest production day
- Production vs target visualization
- Efficiency trend
- Target achievement
- Operational insights

All analytics are generated dynamically from the uploaded operational dataset.

---

### 📄 PDF Report Generation

MineOps can generate a downloadable operational report containing:

- Executive summary
- Total production
- Average daily production
- Average efficiency
- Current stock
- Target achievement
- Best production day
- Lowest production day
- Daily production table
- Stock history

```text
Operational Data
       ↓
     MineOps
       ↓
   Data Analysis
       ↓
  PDF Report
```

---

### 🔎 Data Search

The navigation search allows users to search across uploaded operational records.

Search can be performed using values such as:

- Date
- Production
- Target
- Dispatch
- Stock

Search results are displayed directly from the uploaded dataset.

---

## 🧠 Architecture

MineOps follows a centralized data architecture.

Instead of each page maintaining its own copy of the uploaded data, the application uses React Context to maintain a shared dataset.

```text
                    Excel / CSV
                         │
                         ▼
                  ExcelUploader
                         │
                         ▼
                MineDataContext
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      Dashboard      Production       Stock
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                     Analytics
                         │
                         ▼
                    PDF Report
```

This architecture allows a single uploaded dataset to be shared across the entire application, ensuring that Dashboard, Production, Stock, Analytics, Search, and PDF reporting operate on the same source of data.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- Recharts
- React Icons

### Data Processing

- XLSX

### Reporting

- jsPDF
- jsPDF AutoTable

### Development & Version Control

- Vite
- Git
- GitHub

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── dashboard/
│   │   ├── KPICard.jsx
│   │   ├── productionChart.jsx
│   │   └── OperationsSummary.jsx
│   │
│   ├── data/
│   │   └── ExcelUploader.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   └── reports/
│       └── PDFReportGenerator.jsx
│
├── context/
│   └── MineDataContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Production.jsx
│   ├── Stock.jsx
│   └── Analytics.jsx
│
├── data/
│
├── App.jsx
└── main.jsx
```

---

## 📋 Expected Data Format

MineOps works with operational datasets containing fields such as:

| Field | Description |
|---|---|
| Date | Operational date |
| Production | Daily production in MT |
| Target | Daily production target |
| Dispatch | Daily dispatch quantity |
| Stock | Available stock in MT |

### Example

| Date | Production | Target | Dispatch | Stock |
|---|---:|---:|---:|---:|
| Monday | 11200 | 12000 | 10500 | 48000 |
| Tuesday | 12450 | 12000 | 10920 | 48650 |
| Wednesday | 11800 | 12500 | 10700 | 47500 |
| Thursday | 13200 | 12500 | 11500 | 49200 |

The application calculates performance metrics from these values.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/mineops.git
```

### 2. Enter the project directory

```bash
cd mineops
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local Vite development server.

---

## 🔄 Application Workflow

```text
1. Open MineOps
        ↓
2. Upload Excel / CSV
        ↓
3. MineOps processes the data
        ↓
4. Dashboard updates
        ↓
5. Production analysis
        ↓
6. Stock analysis
        ↓
7. Advanced analytics
        ↓
8. Search operational records
        ↓
9. Generate PDF report
```

---

## 🎯 Project Goals

MineOps was designed to demonstrate how operational datasets can be transformed into a usable decision-support interface.

The primary goals are:

- Centralized operational data handling
- Automated metric calculation
- Interactive data visualization
- Production monitoring
- Stock monitoring
- Operational performance analysis
- Automated report generation

---

## 📌 Current Version

**MineOps V1**

The current version focuses on:

- Excel/CSV data ingestion
- Shared application data state
- Production monitoring
- Stock monitoring
- Analytics
- Search
- PDF reporting

---

## 🔮 Future Improvements

MineOps V1 currently focuses on client-side data analysis.

Future versions could introduce:

- Backend API
- PostgreSQL / database integration
- User authentication
- Role-based access
- Multiple mine management
- Real-time operational data
- Equipment monitoring
- Automated alerts
- Low-stock notifications
- Historical data storage
- Cloud deployment
- Real mine data/API integration
- Advanced predictive analytics
- Production forecasting

### Possible V2 Architecture

```text
                    Frontend
                       │
                       ▼
                  REST API
                       │
                       ▼
                   Backend
                       │
              ┌────────┴────────┐
              ▼                 ▼
          PostgreSQL       Data Processing
              │                 │
              └────────┬────────┘
                       ▼
                Mine Operations
```

---

## ⭐ Future Vision

MineOps can evolve from a client-side analytics dashboard into a complete mining operations intelligence platform with real-time data, backend services, persistent storage, alerts, authentication, and predictive analytics.

---

## 👨‍💻 Author

**Sahil Kumar Singh**

Built as a project exploring frontend development, data visualization, and operational analytics for mining applications.

---

## 📜 License

This project is intended for learning, experimentation, and portfolio purposes.
