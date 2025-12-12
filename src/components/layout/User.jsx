import { useState, useEffect } from 'react';
import {
  User, ShoppingCart, MapPin, Zap, Gift, Heart, Settings, Wallet, Home
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


// Sidebar Menu
const sidebarMenu = [
  { name: 'Profile Overview', icon: User, key: 'profile' },
  { name: 'My Orders', icon: ShoppingCart, key: 'orders' },
  { name: 'My Wallet', icon: Wallet, key: 'wallet' },
  { name: 'Address Book', icon: MapPin, key: 'address' },
  { name: 'Points & Rewards', icon: Zap, key: 'point' },
  { name: 'Promotions', icon: Gift, key: 'promotions' },
  { name: 'Wishlist', icon: Heart, key: 'wishlist' },
  { name: 'Account Settings', icon: Settings, key: 'settings' },
];

// Sidebar link
const SidebarLink = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative w-full flex items-center space-x-3 mb-1 text-left px-4 py-2.5 rounded-lg transition-all group text-white hover:text-black
      ${isActive
        ? 'bg-white text-brand font-semibold shadow-sm'
        : 'text-white hover:bg-gray-50 '
      }`}
  >
    <item.icon
      className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-brand' : ''
        }`}
    />
    <span className={`hidden md:block text-sm ${isActive
      ? 'text-brand font-semibold shadow-sm'
      : ''
      }`}>{item.name}</span>
  </button>
);

export default function UserLayout() {
  const [activeTab, setActiveTab] = useState('profile');

  const location = useLocation();
  const queryParams = location?.pathname.split('/user/')[1];
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(queryParams);
  }, [queryParams]);


  const handleChangeTab = (tab) => {
    navigate(`/user/${tab}`);
  }
  return (
    <>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {/* SIDEBAR */}
        <aside className="hidden md:block md:relative p-2 md:p-0 
        lg:p-0 lg:col-span-3 md:col-span-2 xl:p-0 ">
          <div className='rounded-xl md:p-2 xl:p-3 lg:p-4 bg-gradient-to-bl from-brand to-brand-hover'>
            <h2 className="hidden xl:block text-xs uppercase text-white xl:pl-4 xl:pt-2 mb-3 tracking-wide font-medium">Dashboard</h2>
          <nav className="flex flex-row md:flex-col overflow-y-auto">
            {sidebarMenu.map(item => (
              <SidebarLink
                key={item.key}
                item={item}
                isActive={activeTab === item.key}
                onClick={() => handleChangeTab(item.key)}
              />
            ))}
          </nav>

          </div>
        </aside>

        <div className='md:hidden lg:hidden xl:hidden fixed bottom-0 right-0 left-0 z-50 flex p-2 justify-between text-brand m-2 rounded-md bg-gray-100'>
          <Link to='/' className={`p-2 flex flex-1 items-center justify-center rounded-lg  ${activeTab==='home'?('text-white bg-brand'):('')}` }>
            <Home className='w-8 h-8'/>
          </Link>
          <Link to='/user/profile' className={`p-2 flex flex-1 items-center justify-center rounded-lg  ${activeTab==='profile'?('bg-brand text-white'):('')}` }>
            <User className='w-8 h-8'/>
          </Link>
          <Link to='/user/orders' className={`p-2 flex flex-1 items-center justify-center rounded-lg  ${activeTab==='orders'?('text-white bg-brand'):('')}` }>
            <ShoppingCart className='w-8 h-8'/>
          </Link>
          <Link to='/user/wallet' className={`p-2 flex flex-1 items-center justify-center rounded-lg  ${activeTab==='wallet'?('text-white bg-brand'):('')}` }>
            <Wallet className='w-8 h-8'/>
          </Link>
          <Link to='/user/address' className={`p-2 flex flex-1 items-center justify-center rounded-lg  ${activeTab==='address'?('text-white bg-brand'):('')}` }>
            <MapPin className='w-8 h-8'/>
          </Link>
          
        </div>

        {/* CONTENT */}
        <main className="md:col-span-6 lg:col-span-9 rounded-xl">
          <Outlet />
        </main>
      </div>
    </>
  );
}
