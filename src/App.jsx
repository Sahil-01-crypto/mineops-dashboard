import React from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import Navbar from './components/layout/Navbar.jsx'
import KPICard from './components/dashboard/KPICard.jsx'
import Dashboard from './pages/Dashboard.jsx'
const App = () => {
  return (
    <div className='flex bg-[#0B1220] min-h-screen'>
      <Sidebar/>

      <div className='flex-1 ml-64 '>
        <Navbar/>
        <Dashboard/>
      </div>
      
    </div>
  )
}

export default App
