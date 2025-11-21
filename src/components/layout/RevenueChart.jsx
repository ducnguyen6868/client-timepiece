import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Activity, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import orderApi from '../../api/orderApi';

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState('7days');
  const [revenueData, setRevenueData] = useState([]);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);

  const getRevenueData = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getRevenueData(timeRange);
      setRevenueData(response.revenueData);
      setSummary(response.summary);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getRevenueData();
  }, [timeRange]);

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days', icon: Calendar },
    { value: '30days', label: 'Last 30 Days', icon: Calendar },
    { value: '3months', label: 'Last 3 Months', icon: Calendar },
    { value: '6months', label: 'Last 6 Months', icon: Calendar },
    { value: 'alltime', label: 'All Time', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 flex flex-row flex-wrap justify-between items-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 p-1 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
              <TrendingUp className="text-white w-full h-full" />
            </div>
            <div>
              <h1 className="text-xl xl:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Sales Analytics
              </h1>
              <p className="text-gray-600 text-sm">Track and analyze your business performance</p>
            </div>
          </div>
          <div className='flex-1 text-right'>
            <select name='optionRange'
              className="h-max cursor-pointer px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white  focus:outline-none focus:ring-2 focus:ring-brand-hover transition-all duration-200  shadow-sm"
              onChange={(e) => setTimeRange(e.target.value)}>
              {timeRangeOptions.map((option) => {
                return (
                  <option value={option.value}
                    key={option.value}
                    className="text-black bg-white"
                  >
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>

        </div>



        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center">
                <DollarSign className="text-cyan-600" size={28} />
              </div>
              <div className="bg-cyan-50 px-3 py-1 rounded-full">
                <span className="text-cyan-600 font-semibold text-sm">Revenue</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{formatCurrency(summary?.totalRevenue, 'en-US', 'USD')}</p>
            <p className="text-gray-400 text-xs">Delivered orders only</p>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="text-teal-600" size={28} />
              </div>
              <div className="bg-teal-50 px-3 py-1 rounded-full">
                <span className="text-teal-600 font-semibold text-sm">Orders</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Orders</h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{summary?.totalOrders}</p>
            <p className="text-gray-400 text-xs">Successfully delivered</p>
          </div>

          {/* Average Order Value Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                <Activity className="text-amber-600" size={28} />
              </div>
              <div className="bg-amber-50 px-3 py-1 rounded-full">
                <span className="text-amber-600 font-semibold text-sm">Average</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Avg Order Value</h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{formatCurrency(summary?.avgOrderValue, 'en-US', 'USD')}</p>
            <p className="text-gray-400 text-xs">Per transaction</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
                <p className="text-gray-500 text-sm mt-1">Track your revenue over time</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                {timeRangeOptions.find(opt => opt.value === timeRange)?.label}
              </div>
            </div>

            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00bcd4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    style={{ fontWeight: 500 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    style={{ fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value, 'en-US', 'USD'), 'Revenue']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ fontWeight: 600, color: '#374151' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00bcd4"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    dot={{ fill: '#00bcd4', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Orders Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Distribution</h2>
                <p className="text-gray-500 text-sm mt-1">Number of orders per period</p>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg">
                <ShoppingCart className="text-teal-600" size={18} />
                <span className="text-teal-600 font-semibold text-sm">{summary?.totalOrders} Orders</span>
              </div>
            </div>

            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    style={{ fontWeight: 500 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    style={{ fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(value) => [value, 'Orders']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ fontWeight: 600, color: '#374151' }}
                    cursor={{ fill: 'rgba(0, 188, 212, 0.05)' }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="#00bcd4"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
