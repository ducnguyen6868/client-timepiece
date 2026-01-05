import { useState, useEffect , useContext } from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Icon} from '@iconify/react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

/* ===== Sub Components ===== */

function SidebarItem({ icon, children, active, danger , href }) {
    return (
        <Link
            to={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${active && "bg-brand text-white shadow"}
                ${danger && "text-red-500 hover:bg-red-50"}
                ${!active && !danger && "text-slate-600 hover:bg-gray-100"}
            `}
        >
            <Icon icon={icon} className="text-[22px]" />
            <span className="text-sm font-medium">{children}</span>
        </Link>
    );
}

export default function UserLayout() {
  const [activeTab, setActiveTab] = useState('profile');

  const {infoUser} = useContext(UserContext);
  const location = useLocation();
  const queryParams = location?.pathname.split('/user/')[1];
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(queryParams);
  }, [queryParams]);

  return (
    <>
      <main className="flex gap-4 bg-bg-secondary p-4 ">
        {/* Sidebar */}
        <aside className="md:w-72 flex flex-col gap-6 bg-bg-primary shadow-xl p-4 h-dvh rounded-xl">
          {/* User info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-secondary border border-gray-200 shadow-sm">
            <div className="relative size-12 rounded-lg overflow-hidden bg-gray-100 border">
              <img
                src={infoUser.avatar}
                alt="Avatar người dùng"
                title='Avatar'
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-slate-900 truncate">{infoUser.fullName}</h3>
              <p className="text-xs text-gray-500 truncate">{infoUser.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <SidebarItem icon="mdi:account-outline" active={activeTab.includes('profile')} href='/user/profile'>
              Thông tin tài khoản
            </SidebarItem>
            <SidebarItem icon="mdi:history" href='/user/orders-history' active={activeTab.includes('order')}>
              Lịch sử mua hàng
            </SidebarItem>
            <SidebarItem icon="mdi:map-marker-outline" href='/user/address' active={activeTab.includes('address')}>
              Sổ địa chỉ
            </SidebarItem>
            <SidebarItem icon="mdi:cart-outline"  href='/user/cart' active={activeTab.includes('cart')}>
              Giỏ hàng
            </SidebarItem>
            <SidebarItem icon="mdi:heart-outline"  href='/user/wishlist' active={activeTab.includes('wishlist')}>
              Sản phẩm yêu thích
            </SidebarItem>
            <SidebarItem icon="mdi:ticket-percent-outline"  href='/user/promotions' active={activeTab.includes('promotions')}>
              Kho voucher
            </SidebarItem>

            <div className="h-px bg-gray-200 my-2 mx-4" />

            <SidebarItem icon="mdi:logout" danger>
              Đăng xuất
            </SidebarItem>
          </nav>
        </aside>

        {/* CONTENT */}
        <Outlet />
      </main>
    </>
  );
}
