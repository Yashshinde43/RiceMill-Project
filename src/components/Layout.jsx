// Layout.js

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col p-6 bg-gray-100">
        <main className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-7xl mx-auto">
            {children}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}


