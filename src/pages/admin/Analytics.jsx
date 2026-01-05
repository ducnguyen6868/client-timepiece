import React from 'react';
import { 
  Watch, Search, Calendar, Tag, Download, 
  DollarSign, MousePointerClick, ShoppingBag, 
  Users, TrendingUp, TrendingDown, Globe, 
  MoreVertical, ChevronRight 
} from 'lucide-react';

// --- Sub-Components ---

const KPICard = ({ title, value, trend, isUp, icon: Icon, bgIcon: BgIcon }) => (
  <div className="group p-6 rounded-2xl bg-white dark:bg-[#162a2d] border border-slate-100 dark:border-[#27383a] shadow-sm hover:shadow-md transition-all relative overflow-hidden">
    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <BgIcon size={80} className="text-[#00bdd6]" />
    </div>
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-[#00bdd6]/10 rounded-xl text-[#00bdd6]">
          <Icon size={20} />
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{title}</p>
      </div>
      <div>
        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          {isUp ? (
            <TrendingUp size={16} className="text-emerald-500" />
          ) : (
            <TrendingDown size={16} className="text-rose-500" />
          )}
          <span className={`text-xs font-black ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend}
          </span>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-1">vs last month</span>
        </div>
      </div>
    </div>
  </div>
);

const BrandProgress = ({ name, orders, percentage, opacity }) => (
  <div>
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{name}</span>
      <span className="text-xs font-black text-slate-900 dark:text-white">{orders} Orders</span>
    </div>
    <div className="w-full bg-slate-100 dark:bg-[#0f2123] rounded-full h-2">
      <div 
        className="bg-[#00bdd6] h-2 rounded-full transition-all duration-1000" 
        style={{ width: `${percentage}%`, opacity: opacity }}
      ></div>
    </div>
  </div>
);

// --- Main Analytics Component ---

const Analytics = () => {
  return (
    <div className="bg-[#f5f8f8] dark:bg-[#0f2123] text-slate-900 dark:text-white min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 lg:p-10 flex flex-col gap-10">
        
        {/* Page Header & Filters */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">Advanced Analytics</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time performance metrics and deep-dive reporting.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-[#162a2d] p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-[#27383a]">
              <div className="flex items-center gap-2 px-3">
                <Calendar size={18} className="text-[#00bdd6]" />
                <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-[#27383a]" />
              <div className="flex items-center gap-2 px-3">
                <Tag size={18} className="text-[#00bdd6]" />
                <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
                  <option>All Brands</option>
                  <option>Rolex</option>
                  <option>Omega</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00bdd6] hover:bg-[#008ba3] text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-[#00bdd6]/20">
                <Download size={18} />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Revenue" value="$1,240,500" trend="+12.5%" isUp icon={DollarSign} bgIcon={DollarSign} />
          <KPICard title="Conversion Rate" value="2.42%" trend="+0.4%" isUp icon={MousePointerClick} bgIcon={MousePointerClick} />
          <KPICard title="Avg Order Value" value="$4,500" trend="-2.1%" isUp={false} icon={ShoppingBag} bgIcon={ShoppingBag} />
          <KPICard title="Returning Customers" value="18.5%" trend="+5.0%" isUp icon={Users} bgIcon={Users} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-[#162a2d] rounded-2xl border border-slate-100 dark:border-[#27383a] p-8 flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black">Revenue Trends</h3>
                <p className="text-sm text-slate-500 font-medium">Weekly performance comparison</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-[#0f2123] rounded-xl p-1">
                {['Daily', 'Weekly', 'Monthly'].map(t => (
                  <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${t === 'Weekly' ? 'bg-white dark:bg-[#27383a] shadow-md text-[#00bdd6]' : 'text-slate-500'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative group">
              {/* Simplified SVG Chart */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00bdd6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#00bdd6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,40 L0,30 L15,25 L30,35 L45,15 L60,20 L75,5 L90,12 L100,20 L100,40 Z" fill="url(#areaGrad)" />
                <path d="M0,30 L15,25 L30,35 L45,15 L60,20 L75,5 L90,12 L100,20" fill="none" stroke="#00bdd6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="75" cy="5" r="1.5" fill="#fff" stroke="#00bdd6" strokeWidth="1" />
              </svg>
              {/* Tooltip Simulation */}
              <div className="absolute left-[75%] top-[5%] -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1.5 px-3 rounded-lg shadow-xl pointer-events-none">
                $142,500 <span className="text-[#00bdd6] ml-1">PEAK</span>
              </div>
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Wk 01</span><span>Wk 02</span><span>Wk 03</span><span>Wk 04</span><span>Wk 05</span>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white dark:bg-[#162a2d] rounded-2xl border border-slate-100 dark:border-[#27383a] p-8 flex flex-col h-[450px]">
            <h3 className="text-xl font-black mb-8">Sales by Tier</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative">
               <svg width="180" height="180" viewBox="0 0 40 40" className="transform -rotate-90">
                  <circle cx="20" cy="20" r="15.9" fill="transparent" stroke="#1d3639" strokeWidth="5" />
                  <circle cx="20" cy="20" r="15.9" fill="transparent" stroke="#00bdd6" strokeWidth="5" strokeDasharray="45 55" />
                  <circle cx="20" cy="20" r="15.9" fill="transparent" stroke="#5ce1e6" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-45" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black">45%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Premium</span>
               </div>
            </div>
            <div className="mt-8 space-y-4">
              {[
                { label: 'Premium (>$15k)', val: '45%', color: 'bg-[#00bdd6]' },
                { label: 'Mid-Range ($5-15k)', val: '30%', color: 'bg-[#5ce1e6]' },
                { label: 'Entry (<$5k)', val: '25%', color: 'bg-slate-700' }
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm font-bold text-slate-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-black">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#162a2d] rounded-2xl border border-slate-100 dark:border-[#27383a] p-8">
            <h3 className="text-xl font-black mb-8">Orders by Brand</h3>
            <div className="space-y-6">
              <BrandProgress name="Rolex" orders={452} percentage={85} opacity={1} />
              <BrandProgress name="Patek Philippe" orders={218} percentage={55} opacity={0.8} />
              <BrandProgress name="Omega" orders={186} percentage={45} opacity={0.6} />
              <BrandProgress name="Audemars Piguet" orders={94} percentage={25} opacity={0.4} />
            </div>
          </div>

          <div className="bg-white dark:bg-[#162a2d] rounded-2xl border border-slate-100 dark:border-[#27383a] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Geographic Hotspots</h3>
              <Globe className="text-slate-400" size={24} />
            </div>
            <div className="flex-1 bg-[#0f2123] rounded-2xl relative overflow-hidden group">
               {/* Map Placeholder */}
               <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-4 bg-[#00bdd6] rounded-full animate-ping opacity-75" />
                  <div className="size-3 bg-[#00bdd6] rounded-full absolute" />
               </div>
               <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between text-[10px] font-black text-[#00bdd6] uppercase mb-3">Top Market: North America</div>
                  <div className="flex justify-between text-white font-bold text-sm">
                    <span>New York City</span>
                    <span>24.8% Share</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className="bg-white dark:bg-[#162a2d] rounded-2xl border border-slate-100 dark:border-[#27383a] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 dark:border-[#27383a] flex flex-wrap justify-between items-center gap-4">
            <h3 className="text-xl font-black">Product Performance</h3>
            <div className="flex gap-2">
              {['Top Sellers', 'Low Stock', 'Slow Moving'].map((btn, i) => (
                <button key={btn} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${i === 0 ? 'bg-[#00bdd6]/10 text-[#00bdd6] ring-1 ring-[#00bdd6]/30' : 'text-slate-500 hover:bg-slate-50'}`}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-black/20">
                <tr className="border-b border-slate-100 dark:border-[#27383a]">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sold</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#27383a]">
                {[
                  { name: 'Rolex Submariner', category: 'Luxury Diver', sku: 'RLX-SUB-12', price: '$14,500', sold: 124, stock: 80, color: 'bg-emerald-500' },
                  { name: 'Patek Nautilus', category: 'Steel Sports', sku: 'PP-NAUT-57', price: '$115,000', sold: 42, stock: 15, color: 'bg-orange-500' }
                ].map((item) => (
                  <tr key={item.sku} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-slate-200 dark:bg-[#0f2123]" />
                        <div>
                          <p className="text-sm font-black">{item.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium text-slate-500 font-mono">{item.sku}</td>
                    <td className="p-6 text-sm font-black">{item.price}</td>
                    <td className="p-6 text-sm font-black">{item.sold}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 dark:bg-black/40 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.stock}%` }} />
                        </div>
                        <span className={`text-[10px] font-black uppercase ${item.color.replace('bg-', 'text-')}`}>
                          {item.stock > 20 ? 'Healthy' : 'Critical'}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="text-slate-400 hover:text-[#00bdd6] transition-colors"><MoreVertical size={20}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full py-4 text-xs font-black text-[#00bdd6] bg-slate-50/50 dark:bg-black/10 hover:bg-[#00bdd6] hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
            View Complete Inventory <ChevronRight size={14} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Analytics;