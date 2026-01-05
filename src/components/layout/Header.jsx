import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Search, ShoppingBag, UserCircle2, Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import WebsiteLogo from '../../assets/website-logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const pathName = location.pathname;

  const { infoUser } = useContext(UserContext);

  // Xử lý đổi style header khi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nam', href: `/category/men's-watches` },
    { name: 'Nữ', href: `/category/women's-watches` },
    { name: 'Thương hiệu', href: '/brands' },
    { name: 'Khuyến mãi', href: '/promotions', highlight: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg py-3'
          : 'bg-white dark:bg-gray-900 py-5'
          } border-b border-gray-100 dark:border-gray-800`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-12">

            {/* Logo */}
            <Link to='/' className="flex items-end">
              <img src={WebsiteLogo} alt='Website Logo' title='Website Logo' className='w-8 h-8' />
              <span className='uppercase font-bold text-brand -mt-2'>timepiece</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  to={link.href}
                  key={link.name}
                  className={`relative font-bold text-[15px] transition-colors group py-2 ${link.highlight ? 'text-red-500 hover:text-red-600' : pathName.includes(link.href) ? 'text-sky-500' : 'text-gray-700 dark:text-gray-200 hover:text-sky-500'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 w-0 group-hover:w-full ${pathName.includes(link.href) ? 'w-full' : ''}`}></span>
                </Link>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">

              {/* Search Bar (Desktop) */}
              <div className="hidden md:flex flex-1 max-w-sm relative group">
                <input
                  className="w-full h-11 pl-11 pr-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-sky-500 focus:ring-0 transition-all duration-300 text-sm font-medium placeholder:text-gray-400 outline-0"
                  placeholder="Tìm kiếm đồng hồ..."
                  type="text"
                />
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors">
                  <Search size={22} />
                </button>

                <button className="relative p-2.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-500/10 text-gray-700 dark:text-gray-200 hover:text-sky-500 transition-all group">
                  <ShoppingBag size={22} />
                  <span className="absolute top-2 right-2 size-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
                </button>

                {infoUser.fullName ? (
                  <Link to='/user/profile'>
                    <img src={infoUser.avatar} alt='Avatar' title='Avatar' className='w-8 h-8 rounded-full object-cover' />
                  </Link>
                ) : (
                  <Link to='/login' className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-all font-bold text-sm shadow-md active:scale-95">
                    <UserCircle2 size={18} />
                    <span className="hidden sm:inline">Đăng nhập</span>
                  </Link>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer (Simplified) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-6 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-bold text-gray-800 dark:text-white hover:text-sky-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>
      {/* Spacer để nội dung không bị đẩy lên dưới Fixed Header */}
      <div className="h-20"></div>
    </>
  );
}