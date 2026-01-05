import React, { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, Package, Bell, Settings, LogOut,
  Menu, Search, MessageSquare, HelpCircle, Calendar, CheckCheck,
  AlertTriangle, MessageCircle, CheckCircle, ChevronDown, Users
} from 'lucide-react';

export default function NotificationsActivity() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: ShoppingBag, label: 'Orders', active: false },
    { icon: Package, label: 'Inventory', active: false },
    { icon: Bell, label: 'Notifications', active: true, badge: 8 },
    { icon: Settings, label: 'Settings', active: false }
  ];

  const filters = [
    { id: 'all', label: 'All Activity', count: 24 },
    { id: 'alerts', label: 'System Alerts', icon: AlertTriangle },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'logs', label: 'Admin Logs', icon: Users }
  ];

  const activities = [
    {
      type: 'critical',
      icon: AlertTriangle,
      iconBg: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      border: 'border-red-100 dark:border-red-900/30',
      title: 'Inventory Critical',
      badge: 'Action Required',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      time: '2 mins ago',
      description: 'Rolex Submariner (Ref. 124060) is below threshold. Only 2 units remaining in Main Warehouse.',
      actions: [
        { label: 'Restock Now', primary: true },
        { label: 'View Details', primary: false }
      ]
    },
    {
      type: 'chat',
      icon: MessageCircle,
      iconBg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-gray-100 dark:border-gray-800',
      title: 'New Message from VIP',
      time: '14 mins ago',
      description: '"Is the Omega Speedmaster currently in stock? I\'d like to arrange a viewing for tomorrow..."',
      hasAvatar: true,
      link: 'Reply to John D.'
    },
    {
      type: 'log',
      icon: null,
      hasAvatar: true,
      border: 'border-gray-100 dark:border-gray-800',
      title: 'Price Update Log',
      time: '1 hr ago',
      description: 'Sarah Jenkins updated the price for Patek Philippe Nautilus from $120,000 to $125,000.'
    },
    {
      type: 'resolved',
      icon: CheckCircle,
      iconBg: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-green-600',
      border: 'border-gray-100 dark:border-gray-800',
      title: 'Payment Gateway Error',
      badge: 'Resolved',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      time: '3 hrs ago',
      description: '3 failed transactions detected. System auto-rebooted and connection restored.',
      resolved: true
    }
  ];

  const teamMembers = [
    { name: 'Mike Ross', role: 'Sales Lead', online: true, status: 'green' },
    { name: 'Rachel Zane', role: 'Support', online: true, status: 'green' },
    { name: 'Harvey S.', role: 'Manager (Away)', online: false, status: 'yellow' }
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen overflow-hidden`}>
      <div className="flex h-full bg-gray-50 dark:bg-[#211111]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#2a1818] border-b border-gray-100 dark:border-[#3a2828]">
            <div className="flex items-center gap-4 lg:hidden">
              <button className="text-gray-900 dark:text-white">
                <Menu className="w-6 h-6" />
              </button>
              <div className="text-[#ea2a33] font-bold text-lg">Timepiece Admin</div>
            </div>

            <div className="hidden lg:flex w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or logs..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-[#3a2828] border-none rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ea2a33]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2828] transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-gray-900 dark:text-white" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ea2a33] rounded-full border-2 border-white dark:border-[#2a1818]"></span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2828] transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-[1200px] mx-auto space-y-6">
              {/* Header */}
              <div className='flex justify-between'>
                {/* Filters */}
                <div className="bg-white dark:bg-[#2a1818] p-1.5 rounded-xl border border-gray-100 dark:border-[#3a2828] flex overflow-x-auto shadow-sm w-full md:w-fit">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeFilter === filter.id
                        ? 'bg-[#ea2a33] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                      {filter.icon && <filter.icon className="w-4 h-4" />}
                      <span>{filter.label}</span>
                      {filter.count && (
                        <span className="bg-white/20 text-xs px-1.5 rounded">{filter.count}</span>
                      )}
                    </button>
                  ))}
                </div>
                {/* Time */}
                <div className="flex items-center gap-3">
                  <div className="relative hidden sm:block">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value="Oct 24, 2023 - Oct 31, 2023"
                      readOnly
                      className="pl-10 pr-4 py-2.5 bg-white dark:bg-[#2a1818] border border-gray-200 dark:border-[#3a2828] rounded-lg text-sm font-medium text-gray-900 dark:text-white cursor-pointer min-w-[240px]"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2a1818] border border-gray-200 dark:border-[#3a2828] rounded-lg hover:bg-gray-50 dark:hover:bg-[#3a2828]/80 transition-colors text-gray-900 dark:text-white text-sm font-bold shadow-sm whitespace-nowrap">
                    <CheckCheck className="w-5 h-5" />
                    Mark all read
                  </button>
                </div>
              </div>
              {/* Main Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Timeline */}
                <div className="lg:col-span-8 space-y-6 relative">
                  {/* Vertical Line */}
                  <div className="absolute top-4 bottom-4 left-[27px] w-0.5 bg-gray-200 dark:bg-[#3a2828] -z-10"></div>

                  {activities.map((activity, idx) => (
                    <div key={idx} className={`flex group ${activity.resolved ? 'opacity-70 hover:opacity-100 transition-opacity' : ''}`}>
                      <div className="flex-shrink-0 relative z-10">
                        {activity.hasAvatar ? (
                          <div className={`w-14 h-14 rounded-full ${activity.iconBg || 'bg-white dark:bg-[#2a1818]'} border ${activity.border} flex items-center justify-center shadow-sm overflow-hidden p-1`}>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
                          </div>
                        ) : (
                          <div className={`w-14 h-14 rounded-full ${activity.iconBg} ${activity.type === 'critical' ? 'border-2 border-[#ea2a33]' : `border ${activity.border}`} flex items-center justify-center shadow-sm`}>
                            {activity.icon && <activity.icon className={`w-6 h-6 ${activity.iconColor}`} />}
                          </div>
                        )}
                      </div>

                      <div className={`ml-6 flex-1 bg-white dark:bg-[#2a1818] border ${activity.border} p-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden`}>
                        {activity.type === 'critical' && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ea2a33]"></div>
                        )}

                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                              {activity.title}
                            </h3>
                            {activity.badge && (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${activity.badgeColor}`}>
                                {activity.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          {activity.description}
                        </p>

                        {activity.actions && (
                          <div className="flex gap-3">
                            {activity.actions.map((action, actionIdx) => (
                              <button
                                key={actionIdx}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${action.primary
                                  ? 'bg-[#ea2a33] text-white hover:bg-[#d62029]'
                                  : 'bg-transparent border border-gray-200 dark:border-[#3a2828] text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3a2828]'
                                  }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {activity.link && (
                          <button className="flex items-center gap-2 text-[#ea2a33] hover:text-[#d62029] text-sm font-bold transition-colors">
                            {activity.link} <span>→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Load More */}
                  <button className="w-full py-3 rounded-xl border border-dashed border-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#3a2828] hover:text-gray-900 dark:hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2">
                    Load older notifications
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-white dark:bg-[#2a1818] rounded-xl border border-gray-100 dark:border-[#3a2828] shadow-sm p-5">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                      Overview
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/20">
                        <div className="text-2xl font-black text-[#ea2a33] mb-1">3</div>
                        <div className="text-xs font-bold text-red-800 dark:text-red-200">
                          Unresolved Alerts
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-[#3a2828] p-4 rounded-lg border border-gray-200 dark:border-[#2a1818]">
                        <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">5</div>
                        <div className="text-xs font-bold text-gray-500">New Messages</div>
                      </div>
                    </div>
                  </div>

                  {/* Team Availability */}
                  <div className="bg-white dark:bg-[#2a1818] rounded-xl border border-gray-100 dark:border-[#3a2828] shadow-sm p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Team Online
                      </h4>
                      <a href="#" className="text-[#ea2a33] text-xs font-bold hover:underline">
                        View All
                      </a>
                    </div>
                    <div className="space-y-3">
                      {teamMembers.map((member, idx) => (
                        <div key={idx} className={`flex items-center gap-3 ${!member.online ? 'opacity-60' : ''}`}>
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${member.status === 'green' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full border-2 border-white dark:border-[#2a1818]`}></div>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white block">
                              {member.name}
                            </span>
                            <span className="text-xs text-gray-500">{member.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Settings Promo */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-white/5 opacity-20 transform rotate-12">
                      <Settings className="w-32 h-32" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 relative z-10">Configure Alerts</h4>
                    <p className="text-white/70 text-sm mb-4 relative z-10">
                      Customize what notifications you receive via email or push.
                    </p>
                    <button className="relative z-10 bg-[#ea2a33] hover:bg-[#d62029] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors w-full">
                      Manage Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}