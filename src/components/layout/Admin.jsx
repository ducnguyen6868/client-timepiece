import { useEffect, useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingBag, Gift, Settings,
    Bell, MessageSquare, Users, MessagesSquare
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import websiteLogo from '../../assets/website-logo.png';

// ************************************************
// Reusable Component: Sidebar Link
// ************************************************
const SidebarLink = ({ item, isActive }) => (
    <Link
        to={`${item.key}`}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors 
            ${isActive
                ? `bg-teal-100 text-brand hover:text-brand-hover font-semibold`
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
        }
    >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{item.name}</span>
    </Link>
);

// ************************************************
// Main Component: Overview Dashboard
// ************************************************
export default function Admin() {
    const [activeMenu, setActiveMenu] = useState('overview');

    const location = useLocation();
    const queryParams = location.pathname.split('/admin/')[1];

    useEffect(() => {
        setActiveMenu(queryParams);
    }, [queryParams]);

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard, key: 'overview' },
        { name: 'Products', icon: Package, key: 'products' },
        { name: 'Orders', icon: ShoppingBag, key: 'orders' },
        { name: 'Users', icon: Users, key: 'users' },
        { name: 'Chats', icon: MessagesSquare, key: 'chats' },
        { name: 'Promotions and Loyalty ', icon: Gift, key: 'promotions' },
        { name: 'Settings', icon: Settings, key: 'settings' },
    ];


    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Column: Sidebar */}
            <aside className="hidden w-64 md:flex flex-col border-r border-gray-200 bg-white shadow-xl lg:static z-40">
                {/* Tên Công Ty và Slogan */}
                <div className="flex flex-row space-x-3 gap-1 pl-7 py-4 border-b border-gray-300 ">
                    <img className='w-7' src={websiteLogo} alt='Logo' title='Logo' />
                    <Link to='/admin'
                        className="text-xl font-extrabold tracking-widest"
                        style={{
                            // Sử dụng linear-gradient tùy chỉnh của bạn
                            background: 'linear-gradient(90deg, var(--brand-light, #3355ff), var(--brand-color, #00bcd4))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 2px rgba(0, 188, 212, 0.4))'
                        }}
                    >
                        TIMEPIECE
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-grow p-4 space-y-1">
                    {sidebarItems.map(item => (
                        <SidebarLink
                            key={item.key}
                            item={item}
                            isActive={activeMenu === item.key}
                            onClick={() => setActiveMenu(item.key)}
                        />
                    ))}
                </nav>

                {/* Footer/Logout */}
                <div className="p-5 border-t border-gray-200">
                    <button className="flex items-center space-x-3 text-sm text-red-500 hover:text-red-700 transition-colors p-3 rounded-lg w-full justify-start">
                        <MessageSquare className="w-5 h-5" />
                        <span>Support</span>
                    </button>
                    <button className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 transition-colors p-3 rounded-lg w-full justify-start">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </div>
            </aside>

            {/* Navigation */}
             <nav
                // Position: Fixed at the bottom, spanning full width
                className="md:hidden fixed bottom-0 right-0 left-0 w-full p-2 shadow-2xl z-50"
            >
                {/* Center content on wide screens, ensure spacing on mobile */}
                <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2 bg-gray-100 rounded-lg">
                    <Link to='/admin/overview'
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeMenu === 'overview'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-md`}
                    >
                        <LayoutDashboard className="h-8 w-8" />
                    </Link>
                    <Link to='/admin/orders'
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeMenu === 'orders'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-md`}
                    >
                        <ShoppingBag className="h-8 w-8" />
                    </Link>
                    <Link to='/admin/users'
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeMenu === 'users'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-md`}
                    >
                        <Users className="h-8 w-8" />
                    </Link>
                    <Link to='/admin/promotions'
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeMenu === 'promotions'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-md`}
                    >
                        <Gift className="h-8 w-8" />
                    </Link>
                    <Link to='/admin/chats'
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeMenu === 'chats'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-md`}
                    >
                        <MessageSquare className="h-8 w-8" />
                    </Link>
                

                </div>
            </nav>

            {/* Right Column: Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header / Top Nav */}
                <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30 flex flex-row justify-between items-center pl-8">
                    <h3 className='size-5 text-brand w-max font-black' >Good morning , Admin !</h3>
                    <div className="flex items-center p-4 gap-4">
                        <button className="text-gray-600 hover:text-teal-600 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=30&h=30&fit=crop" alt="Admin" className="w-8 h-8 rounded-full object-cover border-2 border-teal-500" />
                    </div>
                </header>
                {/* Main Content Area */}
                <main className="flex-1 p-4 mb-20 md:mb-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}