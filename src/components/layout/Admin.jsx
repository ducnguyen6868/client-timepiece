import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../common/Sidebar";

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
