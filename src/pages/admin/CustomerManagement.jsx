import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Warehouse, 
  BarChart3, 
  UserCog, 
  Settings, 
  LogOut, 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ChevronRightSquare,
  Star,
  Mail,
  Phone,
  MapPin,
  Menu
} from 'lucide-react';

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <a 
    href="#" 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
      active ? 'bg-[#ea2a33]/10 text-[#ea2a33]' : 'text-[#181111] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
    }`}
  >
    <Icon className={`size-5 ${active ? 'fill-[#ea2a33]/20' : 'text-[#886364] group-hover:text-[#ea2a33]'}`} />
    <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
  </a>
);

const StatCard = ({ title, value, change, isPositive }) => (
  <div className="bg-white dark:bg-[#2a1a1a] p-5 rounded-xl border border-[#e5dcdc] dark:border-[#443333] shadow-sm">
    <p className="text-[#886364] text-sm font-medium">{title}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-2xl font-bold text-[#181111] dark:text-white">{value}</p>
      <span className={`text-[10px] font-bold ${isPositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'} dark:bg-opacity-20 px-1.5 py-0.5 rounded`}>
        {change}
      </span>
    </div>
  </div>
);

// --- Main Component ---

const CustomerManagement = () => {
  return (
    <div className="bg-[#f8f6f6] dark:bg-[#211111] font-sans text-[#181111] dark:text-white h-screen flex overflow-hidden">

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8f6f6] dark:bg-[#211111]">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-[#2a1a1a] border-b border-[#e5dcdc] dark:border-[#443333] flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[#181111] dark:text-white">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold tracking-tight">Customer Management</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 size-2 bg-[#ea2a33] rounded-full border-2 border-white dark:border-[#2a1a1a]" />
            </button>
            <button className="hidden sm:flex items-center gap-2 h-10 px-4 bg-[#ea2a33] hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20">
              <Plus size={18} />
              <span>Add Customer</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Customers" value="1,248" change="+5%" isPositive={true} />
              <StatCard title="Active This Month" value="142" change="+12%" isPositive={true} />
              <StatCard title="VIP Members" value="86" change="+2%" isPositive={true} />
              <StatCard title="Avg. LTV" value="$12,450" change="+0.8%" isPositive={true} />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-96 group">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#886364] group-focus-within:text-[#ea2a33]" />
                <input 
                  type="text" 
                  placeholder="Search by name, email..." 
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white dark:bg-[#2a1a1a] border-none ring-1 ring-[#e5dcdc] dark:ring-[#443333] focus:ring-2 focus:ring-[#ea2a33] text-sm outline-none shadow-sm transition-all"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar">
                <button className="whitespace-nowrap px-4 py-2 bg-[#ea2a33] text-white text-sm font-semibold rounded-full shadow-sm">All Customers</button>
                <button className="whitespace-nowrap px-4 py-2 bg-white dark:bg-[#2a1a1a] ring-1 ring-[#e5dcdc] dark:ring-[#443333] text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">High Spenders</button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-[#886364] transition-colors">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Content Table & Detail View */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* Customer List (Master) */}
              <div className="xl:col-span-8 bg-white dark:bg-[#2a1a1a] rounded-xl border border-[#e5dcdc] dark:border-[#443333] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-white/5 text-[10px] uppercase text-[#886364] font-bold tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Orders</th>
                        <th className="px-6 py-4 text-right">Spent</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5dcdc] dark:divide-[#443333]">
                      <tr className="bg-[#ea2a33]/5 cursor-pointer hover:bg-[#ea2a33]/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-slate-200 border border-[#ea2a33]/20 overflow-hidden">
                              <img src="https://i.pravatar.cc/150?u=isa" alt="Isabella" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">Isabella G.</p>
                              <p className="text-xs text-[#886364]">isabella.g@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700">
                            <span className="size-1.5 rounded-full bg-green-600 animate-pulse"></span> Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm">14</td>
                        <td className="px-6 py-4 text-right text-sm font-bold">$42,500.00</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-[#ea2a33] hover:translate-x-1 transition-transform">
                            <ChevronRightSquare size={20} />
                          </button>
                        </td>
                      </tr>
                      {/* Thêm các row khác tương tự */}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="p-4 border-t border-[#e5dcdc] dark:border-[#443333] flex items-center justify-between">
                  <span className="text-sm text-[#886364]">Showing 1-10 of 1,248</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft size={16}/></button>
                    <button className="p-1.5 border rounded-lg hover:bg-gray-50"><ChevronRight size={16}/></button>
                  </div>
                </div>
              </div>

              {/* Right Detail Panel */}
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-white dark:bg-[#2a1a1a] rounded-xl border border-[#e5dcdc] dark:border-[#443333] p-6 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="size-24 rounded-full border-4 border-white dark:border-[#443333] overflow-hidden shadow-lg">
                         <img src="https://i.pravatar.cc/150?u=isa" alt="Profile" />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-1.5 border-2 border-white dark:border-[#2a1a1a]">
                        <Star size={12} fill="currentColor" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-bold">Isabella G.</h3>
                    <p className="text-sm text-[#886364]">Member since Jan 2021</p>
                    <div className="mt-5 flex gap-3 w-full">
                      <button className="flex-1 py-2 rounded-lg bg-[#ea2a33] text-white text-sm font-semibold hover:bg-red-700 transition-colors">Edit</button>
                      <button className="flex-1 py-2 rounded-lg border border-[#e5dcdc] dark:border-[#443333] text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Message</button>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#e5dcdc] dark:border-[#443333] space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-[#886364]"><Mail size={16} /></div>
                      <p className="text-sm font-medium truncate">isabella.g@example.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-[#886364]"><Phone size={16} /></div>
                      <p className="text-sm font-medium">+1 (555) 019-2834</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-[#886364]"><MapPin size={16} /></div>
                      <p className="text-sm font-medium">124 Luxury Lane, Beverly Hills, CA 90210</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerManagement;