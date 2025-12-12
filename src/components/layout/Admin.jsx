import { useEffect, useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingBag, Gift, Settings,
    MessageSquare, Users, MessagesSquare
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import websiteLogo from '../../assets/website-logo.png';

/* -----------------------------------------------------------
   Reusable Sidebar Item
----------------------------------------------------------- */
const SidebarLink = ({ item, isActive }) => (
    <Link
        to={item.key}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all
        ${isActive
                ? "bg-teal-100 text-brand shadow-sm font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
    >
        <item.icon className="w-5 h-5" />
        <span className="text-sm">{item.name}</span>
    </Link>
);


/* -----------------------------------------------------------
   Main Component
----------------------------------------------------------- */
export default function Admin() {
    const [activeMenu, setActiveMenu] = useState("overview");

    const location = useLocation();
    const queryParams = location.pathname.split("/admin/")[1];

    useEffect(() => {
        setActiveMenu(queryParams);
    }, [queryParams]);

    const sidebarItems = [
        { name: "Overview", icon: LayoutDashboard, key: "overview" },
        { name: "Watches", icon: Package, key: "watches" },
        { name: "Orders", icon: ShoppingBag, key: "orders" },
        { name: "Users", icon: Users, key: "users" },
        { name: "Chats", icon: MessagesSquare, key: "chats" },
        { name: "Promotions & Loyalty", icon: Gift, key: "promotions" },
        { name: "Settings", icon: Settings, key: "settings" },
    ];

    return (
        <div className="min-h-screen flex bg-gray-50 relative">

            {/* -----------------------------------------------------------
               Sidebar (Desktop)
            ----------------------------------------------------------- */}
            <aside
                className="
                    hidden md:flex flex-col
                    bg-white border-r border-gray-200 shadow-sm
                    z-30
                "
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-6 py-4 border-b">
                    <img className="w-7" src={websiteLogo} alt="Logo" />
                    <Link
                        to="/admin"
                        className="text-xl font-extrabold tracking-wide"
                        style={{
                            background: "linear-gradient(90deg, var(--brand-light,#3355ff), var(--brand-color,#00bcd4))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        TIMEPIECE
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                    {sidebarItems.map(item => (
                        <SidebarLink
                            key={item.key}
                            item={item}
                            isActive={activeMenu === item.key}
                        />
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-4 py-4 border-t space-y-2">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-red-500 hover:bg-red-50 transition">
                        <MessageSquare className="w-5 h-5" />
                        Support
                    </button>

                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-gray-600 hover:bg-gray-100 transition">
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                </div>
            </aside>


            {/* -----------------------------------------------------------
               Bottom Navigation (Mobile)
            ----------------------------------------------------------- */}
            <nav className="
                md:hidden fixed bottom-0 left-0 right-0
                p-3 bg-white shadow-xl z-40
            ">
                <div className="
                    flex justify-around items-center 
                    bg-gray-100 rounded-2xl px-2 py-2
                    max-w-lg mx-auto shadow-md
                ">
                    {[
                        { to: "/admin/overview", icon: LayoutDashboard, key: "overview" },
                        { to: "/admin/orders", icon: ShoppingBag, key: "orders" },
                        { to: "/admin/users", icon: Users, key: "users" },
                        { to: "/admin/promotions", icon: Gift, key: "promotions" },
                        { to: "/admin/chats", icon: MessageSquare, key: "chats" },
                    ].map(item => {
                        const Icon = item.icon;
                        const active = activeMenu === item.key;

                        return (
                            <Link
                                key={item.key}
                                to={item.to}
                                className={`
                                    flex flex-col items-center justify-center px-3 py-2 
                                    rounded-xl text-xs font-medium transition-all
                                    ${active
                                        ? "bg-brand text-white shadow-md scale-105"
                                        : "text-brand hover:text-brand-hover"
                                    }
                                `}
                            >
                                <Icon className="w-6 h-6" />
                            </Link>
                        );
                    })}
                </div>
            </nav>


            {/* -----------------------------------------------------------
               Main Content
            ----------------------------------------------------------- */}
            <main className="
                flex-1 overflow-y-auto p-4
       
                mb-16 md:mb-0 /* space for bottom navbar mobile */ 
            ">
                <Outlet />
            </main>
        </div>
    );
}
