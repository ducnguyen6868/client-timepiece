import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Icon } from '@iconify/react';
import { Link, Outlet, useLocation , useNavigate } from 'react-router-dom';

/* ===== Sub Components ===== */

function SidebarItem({ icon, children, active, danger, href }) {
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
};

const Logout = ({ onClose }) => {
  const navigate= useNavigate();
  const {setInfoUser} = useContext(UserContext);
  const handleLogout = async()=>{
    localStorage.removeItem('token');
    await setInfoUser({});
    navigate('/');
  }
  return (
    <div aria-labelledby="modal-title" aria-modal="true" class="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 min-h-screen" role="dialog"
      onClick={onClose}>
      <div aria-hidden="true" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
      <div class="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          onClick={onClose}
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
        <div class="flex flex-col items-center text-center">
          <div class="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 mb-6">
            <Icon icon="mdi:logout" className=" text-brand text-[32px]" />
          </div>
          <h3 class="text-xl font-bold leading-6 text-slate-900 mb-2" id="modal-title">
            Xác nhận đăng xuất
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Bạn có chắc chắn muốn đăng xuất?
            </p>
          </div>
          <div class="mt-8 grid grid-cols-2 gap-4 w-full">
            <button class="inline-flex w-full justify-center rounded-xl bg-white px-3 py-3 text-sm font-semibold text-gray-700
            shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors sm:mt-0" type="button"
              onClick={onClose}
            >
              Hủy
            </button>
            <button class="inline-flex w-full justify-center rounded-xl bg-brand px-3 py-3 text-sm font-bold
          text-white shadow-lg shadow-brand/20 hover:bg-[#00acc1] transition-all hover:scale-[1.02]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" type="button"
              onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default function UserLayout() {
  const [activeTab, setActiveTab] = useState('profile');

  const { infoUser } = useContext(UserContext);
  const location = useLocation();
  const queryParams = location?.pathname.split('/user/')[1];
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    setActiveTab(queryParams);
  }, [queryParams]);

  return (
    <>
      <main className="flex gap-4 bg-bg-secondary p-4 ">
        {/* Sidebar */}
        <aside className="md:w-72 flex flex-col gap-6 bg-bg-brand shadow-xl p-4 h-dvh rounded-xl">
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
            <SidebarItem icon="mdi:cart-outline" href='/user/cart' active={activeTab.includes('cart')}>
              Giỏ hàng
            </SidebarItem>
            <SidebarItem icon="mdi:heart-outline" href='/user/wishlist' active={activeTab.includes('wishlist')}>
              Sản phẩm yêu thích
            </SidebarItem>
            <SidebarItem icon="mdi:ticket-percent-outline" href='/user/promotions' active={activeTab.includes('promotions')}>
              Kho voucher
            </SidebarItem>

            <div className="h-px bg-gray-200 my-2 mx-4" />

            <button onClick={() => setShowLogout(true)} className='flex items-center gap-3 px-4 py-3 rounded-lg transition text-red-500 hover:bg-red-50'>
              <Icon icon="mdi:logout" className="text-[22px]" />
              Đăng xuất
            </button>
          </nav>
        </aside>

        {/* CONTENT */}
        <Outlet />

        {showLogout && (
          <Logout onClose={() => setShowLogout(false)} />
        )}
      </main>
    </>
  );
}
