import { useContext } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Gift,ShieldUser,ChartArea,
   Settings, Users,MessagesSquare,ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import websiteLogo from '../../assets/website-logo.png';
import { UserContext } from '../../contexts/UserContext';
import SidebarLink from './SidebarLink';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { infoUser } = useContext(UserContext);
  const location = useLocation();
  const activeMenu = location.pathname.split('/admin/')[1];

  const sidebarItems = [
    { name: 'Overview', icon: LayoutDashboard, key: 'overview' },
    { name: 'Watches', icon: Package, key: 'watches' },
    { name: 'Orders', icon: ShoppingBag, key: 'orders' },
    { name: 'Analytics', icon: ChartArea, key: 'analytics' },
    { name: 'Customers', icon: Users, key: 'customers' },
    { name: 'Staffs', icon: ShieldUser, key: 'staffs' },
    { name: 'Chats', icon: MessagesSquare, key: 'chats' },
    { name: 'Promotions', icon: Gift, key: 'promotions' },
    { name: 'Settings', icon: Settings, key: 'settings' },
  ];

  return (
    <aside
      className={`
        hidden md:flex flex-col
        bg-white border-r border-gray-200 shadow-sm
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo */}
      <Link
        to="/admin"
        className="group flex items-center gap-2 px-6 py-4 border-b"
      >
        <img className="w-7 shrink-0" src={websiteLogo} alt="Logo" />

        <span
          className={`
            text-xl font-extrabold tracking-wide
            whitespace-nowrap
            transition-all duration-300
            ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
          `}
          style={{
            background:
              'linear-gradient(90deg, #3355ff, #00bcd4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          TIMEPIECE
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sidebarItems.map(item => (
          <SidebarLink
            key={item.key}
            item={item}
            isActive={activeMenu === item.key}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-3">
        {/* Admin info */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <img
            className="w-8 h-8 rounded-full"
            src={infoUser.avatar}
            alt="Admin"
            onError={(e) => {
              e.target.src =
                'https://placehold.co/300x300/e2e8f0/64748b?text=F';
            }}
          />

          <div
            className={`
              transition-all duration-200
              ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
            `}
          >
            <p className="text-sm font-semibold text-gray-800">
              {infoUser.fullName}
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            mx-auto flex items-center justify-center
            w-9 h-9 rounded-full
            border bg-white shadow
            hover:bg-gray-100 transition
          "
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </aside>
  );
}
