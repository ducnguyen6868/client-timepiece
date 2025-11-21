import { useState, useEffect, useContext } from 'react';
import {
  User, ShoppingCart, MapPin, Zap, Gift, Heart, Settings,
  LogOut, Bell, Search, XCircle, Wallet,
  Home
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import websiteLogo from '../../assets/website-logo.png';
import ImageError from '../../assets/imageError.jpg';

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
    className={`relative flex items-center space-x-3 w-max text-left px-4 py-2.5 rounded-lg transition-all group text-white hover:text-black
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
  const { infoUser, setInfoUser } = useContext(UserContext);
  const [logout, setLogout] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const location = useLocation();
  const queryParams = location?.pathname.split('/user/')[1];
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(queryParams);
  }, [queryParams]);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    setInfoUser({ name: '', email: '', avatar: '' });
    navigate('/');
  };

  const handleChangeTab = (tab) => {
    navigate(`/user/${tab}`);
  }
  return (
    <>
      {/* HEADER */}
      <header className="hidden xl:block sticky top-0 border-b border-gray-100 bg-white/80 backdrop-blur-md z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-widest"
            style={{
              background: 'linear-gradient(90deg, var(--brand-light, #3355ff), var(--brand-color, #00bcd4))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px rgba(0, 188, 212, 0.4))'
            }}
          >
            <img src={websiteLogo} alt="Logo" className="w-7 h-7" />
            TIMEPIECE
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your profile..."
                className="w-64 pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-full focus:ring-1 focus:ring-brand focus:border-brand bg-gray-50"
              />
            </div>

            <button className="text-gray-600 hover:text-teal-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            <img
              src={`${process.env.REACT_APP_API_URL}` + `/${infoUser.avatar}` || `http://localhost:5000/${infoUser.avatar}`}
              title='Avatar'
              alt='Avatar'
              loading='lazy'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ImageError;
              }}
              className="w-8 h-8 rounded-full border border-gray-300 object-cover hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-4 xl:gap-6 lg:gap-8">
        {/* SIDEBAR */}
        <aside className="hidden xl:block md:relative p-2 md:p-0 lg:p-0 lg:col-span-3 md:col-span-2
         bg-white shadow-md border border-gray-100 xl:p-0
          
          ">
          <div className='rounded-xl md:p-2 xl:p-3 lg:p-4 bg-gradient-to-bl from-brand to-brand-hover overflow-y-auto'>
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

          {/* <div className="mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => setLogout(true)}
              className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-sm text-orange-600 bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div> */}
          </div>
        </aside>

        <div className='xs:hidden md:hiden xl:hidden lg:hidden fixed bottom-0 right-0 left-0 z-50 flex justify-between text-brand m-2 rounded-md bg-gray-100'>
          <Link to='/' className={`p-2 flex flex-1 items-center justify-center rounded-md  ${activeTab==='home'?('text-white bg-brand'):('')}` }>
            <Home className='w-8 h-8'/>
          </Link>
          <Link to='/user/profile' className={`p-2 flex flex-1 items-center justify-center rounded-md  ${activeTab==='profile'?('bg-brand text-white'):('')}` }>
            <User className='w-8 h-8'/>
          </Link>
          <Link to='/user/orders' className={`p-2 flex flex-1 items-center justify-center rounded-md  ${activeTab==='orders'?('text-white bg-brand'):('')}` }>
            <ShoppingCart className='w-8 h-8'/>
          </Link>
          <Link to='/user/wallet' className={`p-2 flex flex-1 items-center justify-center rounded-md  ${activeTab==='wallet'?('text-white bg-brand'):('')}` }>
            <Wallet className='w-8 h-8'/>
          </Link>
          <Link to='/user/address' className={`p-2 flex flex-1 items-center justify-center rounded-md  ${activeTab==='address'?('text-white bg-brand'):('')}` }>
            <MapPin className='w-8 h-8'/>
          </Link>
          
        </div>

        {/* CONTENT */}
        <main className="md:col-span-6 lg:col-span-9 bg-white rounded-xl shadow-sm border border-gray-100 p-1 md:p-2 xl:p-3 lg:p-4">
          <Outlet />
        </main>
      </div>

      {/* LOGOUT MODAL */}
      {logout && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setLogout(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <XCircle className="text-red-500 w-10 h-10 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to log out of your account?</p>

            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                onClick={() => setLogout(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                onClick={confirmLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
