import React, { useState } from 'react';
import { Watch, Search, Bell,  Plus, 
  TrendingUp, Filter,  ArrowUpDown,  MoreVertical, Bolt, 
  X,  Ticket,  Calendar, ChevronLeft, ChevronRight, Clock
} from 'lucide-react';

// --- Sub-Components ---

const StatCard = ({ title, value, trend, trendLabel, isRevenue }) => (
  <div className="bg-white dark:bg-[#1a2c2e] rounded-xl p-5 border border-[#dae5e7] dark:border-gray-700 shadow-sm relative overflow-hidden group">
    {isRevenue && <div className="absolute right-0 top-0 h-full w-1 bg-[#00bdd6]" />}
    <div className="flex justify-between items-start mb-2">
      <p className="text-[#5e878d] text-sm font-medium">{title}</p>
      {trend && (
        <span className={`${trendLabel ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1`}>
          {!trendLabel && <TrendingUp size={10} />} {trend}
        </span>
      )}
      {trendLabel && (
        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full">
          {trendLabel}
        </span>
      )}
    </div>
    <p className="text-3xl font-black text-[#101818] dark:text-white tracking-tight">{value}</p>
  </div>
);

const CampaignRow = ({ name, id, type, discount, start, end, status }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-800",
    Scheduled: "bg-amber-100 text-amber-800",
    Expired: "bg-gray-100 text-gray-600",
  };

  const typeStyles = {
    "Flash Sale": "bg-purple-100 text-purple-800",
    "Coupon": "bg-blue-100 text-blue-800",
    "Brand Discount": "bg-gray-100 text-gray-800",
    "Seasonal": "bg-orange-100 text-orange-800",
  };

  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-[#dae5e7] dark:border-gray-800">
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="font-semibold text-[#101818] dark:text-white">{name}</span>
          <span className="text-xs text-[#5e878d]">ID: {id}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeStyles[type]}`}>
          {type}
        </span>
      </td>
      <td className="py-4 px-6 text-sm font-bold text-[#101818] dark:text-gray-300">{discount}</td>
      <td className="py-4 px-6">
        <div className="flex flex-col text-[11px] text-[#5e878d]">
          <span className="font-medium text-[#101818] dark:text-gray-400">{start}</span>
          <span className="opacity-60">to {end}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusStyles[status]}`}>
          {status === 'Active' && <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />}
          {status}
        </span>
      </td>
      <td className="py-4 px-6 text-right">
        <button className="text-[#5e878d] hover:text-[#00bdd6] p-1 rounded-md transition-colors">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
};

// --- Main Page Component ---

const CampaignManagement = () => {
  const [promoType, setPromoType] = useState('Flash Sale');

  return (
    <div className="bg-[#f5f8f8] dark:bg-[#0f2123] text-[#101818] antialiased min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 lg:px-8 flex flex-col gap-8">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black dark:text-white tracking-tight">Campaign Management</h1>
            <p className="text-[#5e878d] font-medium ">Create and track marketing performances across the store.</p>
          </div>
          <button className="bg-[#00bdd6] hover:bg-[#008ba3] text-white h-12 px-6 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#00bdd6]/20">
            <Plus size={20} />
            <span>New Campaign</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Campaigns" value="12" trend="12%" />
          <StatCard title="Upcoming" value="5" trendLabel="Next 7 days" />
          <StatCard title="Expired" value="28" />
          <StatCard title="Revenue from Promos" value="$145,200" trend="20%" isRevenue />
        </div>

        {/* Workspace Split */}
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* List Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#1a2c2e] rounded-2xl border border-[#dae5e7] dark:border-gray-800 p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-[#5e878d] hover:bg-[#f5f8f8] dark:hover:bg-white/5 rounded-xl transition-colors"><Filter size={18}/></button>
                <button className="p-2.5 text-[#5e878d] hover:bg-[#f5f8f8] dark:hover:bg-white/5 rounded-xl transition-colors"><ArrowUpDown size={18}/></button>
                <div className="h-8 w-px bg-[#dae5e7] dark:bg-gray-800 mx-2" />
                <div className="flex p-1 bg-[#f5f8f8] dark:bg-black/20 rounded-lg">
                  {['All', 'Active', 'Drafts'].map(tab => (
                    <button key={tab} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${tab === 'All' ? 'bg-white dark:bg-[#1a2c2e] shadow-sm text-[#00bdd6]' : 'text-[#5e878d]'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5e878d]" />
                <input className="w-full sm:w-64 bg-[#f5f8f8] dark:bg-black/20 border-none rounded-xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-[#00bdd6]/20" placeholder="Search ID or name..." />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a2c2e] rounded-2xl border border-[#dae5e7] dark:border-gray-800 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f5f8f8] dark:bg-black/20 border-b border-[#dae5e7] dark:border-gray-800">
                  <tr>
                    <th className="py-4 px-6 text-[10px] font-black text-[#5e878d] uppercase tracking-widest">Campaign Name</th>
                    <th className="py-4 px-6 text-[10px] font-black text-[#5e878d] uppercase tracking-widest">Type</th>
                    <th className="py-4 px-6 text-[10px] font-black text-[#5e878d] uppercase tracking-widest">Discount</th>
                    <th className="py-4 px-6 text-[10px] font-black text-[#5e878d] uppercase tracking-widest">Duration</th>
                    <th className="py-4 px-6 text-[10px] font-black text-[#5e878d] uppercase tracking-widest">Status</th>
                    <th className="py-4 px-6 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dae5e7] dark:divide-gray-800">
                  <CampaignRow name="Summer Solstice Flash Sale" id="#CMP-2024-001" type="Flash Sale" discount="25% Off" start="Jun 21, 2024" end="Jun 23, 2024" status="Active" />
                  <CampaignRow name="New Customer Welcome" id="#CMP-2024-002" type="Coupon" discount="$50 Fixed" start="Jan 01, 2024" end="Dec 31, 2024" status="Active" />
                  <CampaignRow name="Rolex Exclusive" id="#CMP-2024-003" type="Brand Discount" discount="10% Off" start="Aug 15, 2024" end="Aug 20, 2024" status="Scheduled" />
                  <CampaignRow name="Winter Clearance" id="#CMP-2023-089" type="Seasonal" discount="40% Off" start="Dec 01, 2023" end="Jan 15, 2024" status="Expired" />
                </tbody>
              </table>
              <div className="p-4 flex items-center justify-between text-xs font-bold text-[#5e878d]">
                <span>Showing 1-4 of 12</span>
                <div className="flex gap-2">
                  <button className="p-2 border border-[#dae5e7] dark:border-gray-800 rounded-lg disabled:opacity-30"><ChevronLeft size={16}/></button>
                  <button className="p-2 border border-[#dae5e7] dark:border-gray-800 rounded-lg"><ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full xl:w-[400px] flex flex-col gap-6">
            {/* Widget */}
            <div className="bg-[#0f2123] rounded-2xl border border-[#00bdd6]/30 shadow-2xl overflow-hidden text-white relative">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#00bdd6]/5">
                <div className="flex items-center gap-2 text-[#00bdd6]">
                  <Bolt size={18} fill="currentColor" />
                  <span className="font-black text-xs uppercase tracking-widest">Active Flash Sale</span>
                </div>
                <span className="bg-[#00bdd6]/20 text-[#00bdd6] text-[10px] font-black px-2 py-0.5 rounded ring-1 ring-[#00bdd6]/50">LIVE</span>
              </div>
              <div className="p-6 flex flex-col items-center">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Time Remaining</p>
                <div className="flex gap-3 text-center mb-8">
                  {['02', '14', '35'].map((t, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-white/5 rounded-xl p-3 min-w-[60px] border border-white/5">
                        <span className="block text-3xl font-black">{t}</span>
                        <span className="text-[9px] text-gray-500 font-bold">{i === 0 ? 'HRS' : i === 1 ? 'MIN' : 'SEC'}</span>
                      </div>
                      {i < 2 && <span className="text-2xl text-[#00bdd6] mt-2">:</span>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="w-full space-y-3">
                   {[
                     { name: 'Omega Speedmaster', price: '$4,160', old: '$5,200', pct: '85%' },
                     { name: 'Tag Heuer Carrera', price: '$2,520', old: '$3,150', pct: '45%' }
                   ].map(w => (
                     <div key={w.name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 hover:border-[#00bdd6]/40 transition-all cursor-pointer group">
                        <div className="size-10 rounded-lg bg-gray-800 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold group-hover:text-[#00bdd6] transition-colors">{w.name}</p>
                          <div className="flex gap-2 text-[11px]">
                            <span className="text-gray-500 line-through">{w.old}</span>
                            <span className="text-[#00bdd6] font-bold">{w.price}</span>
                          </div>
                        </div>
                        <div className="h-1.5 w-12 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00bdd6]" style={{width: w.pct}} />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-[#1a2c2e] rounded-2xl border border-[#dae5e7] dark:border-gray-800 shadow-sm flex flex-col">
              <div className="p-4 border-b border-[#dae5e7] dark:border-gray-800 flex justify-between items-center bg-[#f5f8f8]/50 dark:bg-black/10">
                <h3 className="font-black text-sm uppercase tracking-tight dark:text-white">Create Promotion</h3>
                <button className="text-[#5e878d] hover:text-red-500 transition-colors"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-[#5e878d] uppercase mb-2 block tracking-widest">Campaign Name</label>
                  <input className="w-full bg-[#f5f8f8] dark:bg-black/20 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#00bdd6]/20 dark:text-white" placeholder="e.g. Autumn Exclusive" />
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-[#5e878d] uppercase mb-2 block tracking-widest">Promo Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Flash Sale', 'Coupon', 'Brand Disc.', 'Seasonal'].map(type => (
                      <button key={type} 
                        onClick={() => setPromoType(type)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${promoType === type ? 'border-[#00bdd6] bg-[#00bdd6]/5 text-[#00bdd6]' : 'border-[#dae5e7] dark:border-gray-700 text-[#5e878d]'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#00bdd6]/5 rounded-2xl border border-[#00bdd6]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Ticket size={16} className="text-[#00bdd6]" />
                    <span className="text-[10px] font-black text-[#00bdd6] uppercase tracking-widest">Coupon Code</span>
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 bg-white dark:bg-black/40 border border-[#00bdd6]/30 rounded-lg p-2 text-center font-mono font-black text-[#00bdd6]" readOnly value="WATCH2024" />
                    <button className="bg-[#00bdd6] text-white px-3 rounded-lg text-xs font-bold">New</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-[#5e878d] uppercase mb-2 block tracking-widest">Start</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-3 text-[#5e878d]" />
                      <input type="date" className="w-full bg-[#f5f8f8] dark:bg-black/20 border-none rounded-xl p-2.5 pl-9 text-xs dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-[#5e878d] uppercase mb-2 block tracking-widest">End</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-3 text-[#5e878d]" />
                      <input type="date" className="w-full bg-[#f5f8f8] dark:bg-black/20 border-none rounded-xl p-2.5 pl-9 text-xs dark:text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 bg-[#f5f8f8] dark:bg-white/5 dark:text-white rounded-xl text-xs font-black transition-colors">CANCEL</button>
                  <button className="flex-1 py-3 bg-[#00bdd6] text-white rounded-xl text-xs font-black shadow-lg shadow-[#00bdd6]/20">SAVE CAMPAIGN</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignManagement;