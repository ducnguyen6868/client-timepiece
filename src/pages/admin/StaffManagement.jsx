import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  ChevronDown, 
  BadgeCheck, 
  Activity, 
  Mail, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <a 
    href="#" 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
      active ? 'bg-[#ea2a33]/10 dark:bg-[#ea2a33]/20' : 'hover:bg-[#f8f6f6] dark:hover:bg-[#3a2525]'
    }`}
  >
    <Icon className={`size-5 transition-colors ${active ? 'text-[#ea2a33]' : 'text-[#886364] group-hover:text-[#ea2a33]'}`} />
    <p className={`text-sm leading-normal ${active ? 'text-[#ea2a33] font-bold' : 'text-[#181111] dark:text-gray-200 font-medium'}`}>
      {label}
    </p>
  </a>
);

const StatCard = ({ title, value, icon: Icon, trend, subtext, iconColor }) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#2d1b1b] border border-[#e5dcdc] dark:border-[#4a3535] shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[#886364] text-xs font-semibold uppercase tracking-wider">{title}</p>
      <Icon className={`size-6 ${iconColor}`} strokeWidth={1.5} />
    </div>
    <div className="flex items-end gap-3">
      <p className="text-[#181111] dark:text-white text-3xl font-bold leading-tight">{value}</p>
      {trend && (
        <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded mb-1">
          <TrendingUp className="size-3 mr-1" />
          {trend}
        </span>
      )}
      {subtext && <p className="text-[#886364] text-xs mb-1 font-medium">{subtext}</p>}
    </div>
  </div>
);

// --- Main Admin Component ---

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState('User Management');

  const admins = [
    { id: 1, name: "Sarah Jenkins", email: "sarah@timepiece.com", role: "Super Admin", security: "2FA Enabled", lastActive: "2 mins ago", location: "Paris, FR", status: "Active", online: true },
    { id: 2, name: "Michael Chen", email: "michael@timepiece.com", role: "Inventory Manager", security: "2FA Enabled", lastActive: "1 hour ago", location: "New York, US", status: "Active", online: true },
    { id: 3, name: "David Ross", email: "david@timepiece.com", role: "Support Agent", security: "Not Setup", lastActive: "1 day ago", location: "London, UK", status: "Inactive", online: false },
    { id: 4, name: "Elena Cote", email: "elena@timepiece.com", role: "Editor", security: "2FA Enabled", lastActive: "3 days ago", location: "Toronto, CA", status: "Active", online: true },
    { id: 5, name: "James Alistair", email: "james@timepiece.com", role: "Viewer", security: "2FA Enabled", lastActive: "1 week ago", location: "Berlin, DE", status: "Suspended", online: false },
  ];

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#211111] text-[#181111] dark:text-white min-h-screen flex w-full">
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#181111] dark:text-white text-3xl md:text-4xl font-black tracking-tight">Staff & Administration</h1>
              <p className="text-[#886364] text-base">Manage access, roles, and security permissions for platform administrators.</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg h-10 px-5 bg-[#ea2a33] hover:bg-red-600 text-white text-sm font-bold transition-all shadow-md shadow-red-500/20">
              <Plus size={18} />
              <span>Add New Admin</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Admins" value="12" icon={BadgeCheck} trend="+1 this week" iconColor="text-[#ea2a33]" />
            <StatCard title="Active Sessions" value="4" icon={Activity} subtext="users online now" iconColor="text-green-500" />
            <StatCard title="Pending Invites" value="2" icon={Mail} subtext="awaiting response" iconColor="text-amber-500" />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-[#2d1b1b] p-4 rounded-xl border border-[#e5dcdc] dark:border-[#4a3535] shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#886364] size-5" />
              <input 
                className="w-full h-11 pl-11 pr-4 rounded-lg bg-[#f8f6f6] dark:bg-[#211111] border border-[#e5dcdc] dark:border-[#4a3535] text-sm focus:ring-2 focus:ring-[#ea2a33]/20 focus:border-[#ea2a33] outline-none transition-all"
                placeholder="Search by name, email, or ID..."
              />
            </div>
            <div className="flex gap-4">
              <div className="relative min-w-[180px]">
                <select className="w-full h-11 px-4 pr-10 rounded-lg bg-[#f8f6f6] dark:bg-[#211111] border border-[#e5dcdc] dark:border-[#4a3535] text-sm appearance-none outline-none focus:border-[#ea2a33]">
                  <option>Filter by Role</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#886364] size-5 pointer-events-none" />
              </div>
              <div className="relative min-w-[140px]">
                <select className="w-full h-11 px-4 pr-10 rounded-lg bg-[#f8f6f6] dark:bg-[#211111] border border-[#e5dcdc] dark:border-[#4a3535] text-sm appearance-none outline-none focus:border-[#ea2a33]">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#886364] size-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-hidden rounded-xl border border-[#e5dcdc] dark:border-[#4a3535] bg-white dark:bg-[#2d1b1b] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="bg-[#f8f6f6] dark:bg-[#332222] border-b border-[#e5dcdc] dark:border-[#4a3535]">
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#886364] uppercase tracking-widest">User Info</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#886364] uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#886364] uppercase tracking-widest">Security</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#886364] uppercase tracking-widest">Last Active</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#886364] uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#886364] uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5dcdc] dark:divide-[#4a3535]">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="group hover:bg-[#f8f6f6] dark:hover:bg-[#2a1a1a] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 shrink-0">
                            <div className="h-full w-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                              {admin.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-[#2d1b1b] ${admin.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold text-[#181111] dark:text-white">{admin.name}</p>
                            <p className="text-xs text-[#886364]">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                          admin.role === 'Super Admin' ? 'bg-[#ea2a33]/10 text-[#ea2a33]' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        }`}>
                          {admin.role === 'Super Admin' && <ShieldCheck size={14} />}
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 w-fit px-2 py-1 rounded border text-xs font-medium ${
                          admin.security === '2FA Enabled' 
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
                            : 'text-amber-600 bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30'
                        }`}>
                          {admin.security === '2FA Enabled' ? <Lock size={14} /> : <AlertTriangle size={14} />}
                          {admin.security}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#181111] dark:text-gray-300 font-medium">{admin.lastActive}</p>
                        <p className="text-xs text-[#886364]">{admin.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
                          admin.status === 'Active' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 ring-green-600/20' :
                          admin.status === 'Suspended' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ring-red-600/20' :
                          'bg-gray-50 dark:bg-gray-700/20 text-gray-600 dark:text-gray-400 ring-gray-500/20'
                        }`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#886364] hover:text-[#ea2a33] transition-colors p-2 rounded-full hover:bg-white dark:hover:bg-[#3a2525]">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#e5dcdc] dark:border-[#4a3535] bg-white dark:bg-[#2d1b1b] px-6 py-4">
              <p className="text-sm text-[#886364] font-medium">
                Showing <span className="text-[#181111] dark:text-white">1</span> to <span className="text-[#181111] dark:text-white">5</span> of <span className="text-[#181111] dark:text-white">12</span> results
              </p>
              <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                <button className="p-2 border border-[#e5dcdc] dark:border-[#4a3535] rounded-l-md hover:bg-gray-50 dark:hover:bg-[#3a2525] transition-colors">
                  <ChevronLeft size={18} className="text-[#886364]" />
                </button>
                <button className="px-4 py-2 border border-[#ea2a33] bg-[#ea2a33] text-white text-sm font-bold">1</button>
                <button className="px-4 py-2 border border-[#e5dcdc] dark:border-[#4a3535] text-[#181111] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3a2525]">2</button>
                <button className="px-4 py-2 border border-[#e5dcdc] dark:border-[#4a3535] text-[#181111] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3a2525]">3</button>
                <button className="p-2 border border-[#e5dcdc] dark:border-[#4a3535] rounded-r-md hover:bg-gray-50 dark:hover:bg-[#3a2525] transition-colors">
                  <ChevronRight size={18} className="text-[#886364]" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffManagement;