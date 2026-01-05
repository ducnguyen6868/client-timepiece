import React, { useState } from 'react';
import {
    Bell, Menu, Search, Download, TrendingUp,
    DollarSign, ShoppingCart, UserPlus, Package, Calendar,
    Users, BarChart3, Settings, LogOut, Watch, ShoppingBag
} from 'lucide-react';

export default function Overview() {

    const [darkMode, setDarkMode] = useState(false);
    const [activeFilter, setActiveFilter] = useState('30days');

    const stats = [
        { label: 'Total Revenue', value: '$124,500', change: '+12%', trend: 'up', icon: DollarSign },
        { label: 'Total Orders', value: '342', change: '+5%', trend: 'up', icon: ShoppingCart },
        { label: 'New Customers', value: '1,205', change: '+8%', trend: 'up', icon: UserPlus },
        { label: 'Active Products', value: '45', change: 'Inventory stable', trend: 'stable', icon: Package }
    ];

    const topProducts = [
        { name: 'Oyster Perpetual', sales: 124, revenue: '$14.2k', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&h=100&fit=crop' },
        { name: 'Speedmaster Moonwatch', sales: 98, revenue: '$9.8k', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop' },
        { name: 'Royal Oak', sales: 85, revenue: '$22.1k', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=100&h=100&fit=crop' },
        { name: 'Tank Must', sales: 62, revenue: '$6.5k', image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=100&h=100&fit=crop' }
    ];

    const orders = [
        { id: '#4402', customer: 'John Doe', product: 'Rolex Submariner', date: 'Oct 24, 2023', status: 'Completed', amount: '$12,500', statusColor: 'green' },
        { id: '#4401', customer: 'Sarah Smith', product: 'Omega Seamaster', date: 'Oct 24, 2023', status: 'Pending', amount: '$5,200', statusColor: 'yellow' },
        { id: '#4400', customer: 'Michael Brown', product: 'Tag Heuer Carrera', date: 'Oct 23, 2023', status: 'Shipped', amount: '$3,450', statusColor: 'blue' },
        { id: '#4399', customer: 'Emily Davis', product: 'Breitling Navitimer', date: 'Oct 23, 2023', status: 'Cancelled', amount: '$8,100', statusColor: 'red' },
        { id: '#4398', customer: 'David Wilson', product: 'Patek Philippe Nautilus', date: 'Oct 22, 2023', status: 'Completed', amount: '$55,000', statusColor: 'green' }
    ];

    const navItems = [
        { icon: BarChart3, label: 'Dashboard', active: true },
        { icon: Watch, label: 'Products', active: false },
        { icon: ShoppingBag, label: 'Orders', active: false },
        { icon: Users, label: 'Customers', active: false },
        { icon: BarChart3, label: 'Reports', active: false }
    ];

    return (
        <div className={`${darkMode ? 'dark' : ''} h-screen overflow-hidden`}>
            <div className="flex h-full bg-gray-50 dark:bg-[#211111]">
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="h-16 bg-white dark:bg-[#2a1a1a] border-b border-gray-100 dark:border-[#3a2a2a] px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden text-gray-900 dark:text-white">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#3a2a2a] rounded-lg px-3 h-10 w-64">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none text-sm w-full ml-2 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                />
                            </div>
                            <button className="hidden sm:flex items-center h-10 px-4 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-bold transition-colors">
                                <Download className="w-4 h-4 mr-2" />
                                Generate Report
                            </button>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a2a] transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border border-white dark:border-[#2a1a1a]"></span>
                            </button>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                        </div>
                    </header>

                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Date Filter */}
                            <div className="flex justify-end">
                                <div className="inline-flex items-center bg-white dark:bg-[#2a1a1a] border border-gray-200 dark:border-[#3a2a2a] rounded-lg p-1 shadow-sm">
                                    {['30days', 'quarter', 'year'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${activeFilter === filter
                                                    ? 'bg-gray-100 dark:bg-[#3a2a2a] text-gray-900 dark:text-white font-bold'
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-brand'
                                                }`}
                                        >
                                            {filter === '30days' ? 'Last 30 Days' : filter === 'quarter' ? 'Last Quarter' : 'Last Year'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white dark:bg-[#2a1a1a] p-6 rounded-lg border border-gray-200 dark:border-[#3a2a2a] shadow-sm group hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                            <stat.icon className="w-6 h-6 text-gray-300 dark:text-gray-600 group-hover:text-brand transition-colors" />
                                        </div>
                                        <p className="text-2xl font-bold text-[#00BCD4] mb-2">{stat.value}</p>
                                        <div className="flex items-center gap-1">
                                            {stat.trend === 'up' && (
                                                <>
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                    <span className="text-xs font-bold text-green-600">{stat.change}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                                                </>
                                            )}
                                            {stat.trend === 'stable' && (
                                                <span className="text-xs font-medium text-gray-500">{stat.change}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Charts Section */}
                            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Revenue Chart */}
                                <div className="lg:col-span-2 bg-white dark:bg-[#2a1a1a] border border-gray-200 dark:border-[#3a2a2a] rounded-lg p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly sales performance</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-[#00BCD4]"></span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Current Period</span>
                                        </div>
                                    </div>
                                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                                        {[65, 59, 80, 81, 56, 55, 70, 85].map((height, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#00BCD4] to-[#00BCD4]/50 rounded-t transition-all hover:from-[#00BCD4] hover:to-[#00BCD4]/70"
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
                                        <span>Week 1</span>
                                        <span>Week 2</span>
                                        <span>Week 3</span>
                                        <span>Week 4</span>
                                    </div>
                                </div>

                                {/* Top Products */}
                                <div className="bg-white dark:bg-[#2a1a1a] border border-gray-200 dark:border-[#3a2a2a] rounded-lg p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Top Selling Models</h3>
                                    <div className="space-y-4">
                                        {topProducts.map((product, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0"></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{product.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} Sales</p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{product.revenue}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-4 py-2 text-sm text-brand font-bold border border-brand/20 rounded-lg hover:bg-brand/5 transition-colors">
                                        View All Products
                                    </button>
                                </div>
                            </section>

                            {/* Recent Orders */}
                            <section className="bg-white dark:bg-[#2a1a1a] border border-gray-200 dark:border-[#3a2a2a] rounded-lg shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#3a2a2a]">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                                    <button className="text-brand text-sm font-bold hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-[#2f2020] border-b border-gray-100 dark:border-[#3a2a2a]">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-[#3a2a2a]">
                                            {orders.map((order, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#211111]/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{order.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                            <span>{order.customer}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{order.product}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${order.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                              ${order.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                              ${order.statusColor === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                              ${order.statusColor === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                            `}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white text-right">{order.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}