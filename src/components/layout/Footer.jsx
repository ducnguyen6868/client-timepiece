import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ShieldCheck, Globe } from 'lucide-react';
import WebsiteLogo from '../../assets/website-logo.png';

export default function Footer() {

  const discover = [
    { key: 'Về chúng tôi', href: '/about-us' },
    { key: 'Blog tin tức', href: '/blog' },
    { key: 'Tuyển dụng', href: '/recruitment' },
    { key: 'Hệ thống cửa hàng', href: '/showroom' },
  ];

  const support = [
    {key:'Câu hỏi thường gặp',href:'/fqa'},
    {key:'Chính sách bảo mật',href:'/privacy-policy'},
    {key:'Điều khoản sử dụng',href:'/terms-of-use'},
    {key:'Đổi trả và bảo hành',href:'/return-and-warranty'},
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-20 pb-10">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">

          {/* Brand Identity */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <Link to='/' className="flex items-end">
              <img src={WebsiteLogo} alt='Website Logo' title='Website Logo' className='w-8 h-8' />
              <span className='uppercase font-bold text-brand -mt-2'>timepiece</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Hệ thống bán lẻ đồng hồ chính hãng hàng đầu Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, 100% chính hãng cùng dịch vụ bảo hành quốc tế uy tín.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, label: 'Facebook' },
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Youtube size={18} />, label: 'Youtube' },
                { icon: <Globe size={18} />, label: 'Website' }
              ].map((social, index) => (
                <Link
                  key={index}
                  to="#"
                  aria-label={social.label}
                  className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">Khám phá</h4>
            <div className="flex flex-col gap-3">
              {
                discover.map((item, index) => (
                  <Link key={index} className="text-gray-500 dark:text-gray-400 hover:text-sky-500 transition-colors text-[15px]" to={item.href}>
                    {item.key}
                  </Link>
                ))}
            </div>
          </div>

          {/* Quick Links 2 */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">Hỗ trợ khách hàng</h4>
            <div className="flex flex-col gap-3">
              {support.map((item, index) => (
                <Link key={index} className="text-gray-500 dark:text-gray-400 hover:text-sky-500 transition-colors text-[15px]" to={item.href}>
                  {item.key}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">Đăng ký nhận tin</h4>
            <p className="text-gray-500 dark:text-gray-400 text-[15px]">Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi sớm nhất.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <input
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 px-4 py-3.5 text-sm placeholder:text-gray-400 transition-all outline-none"
                  placeholder="Địa chỉ email của bạn"
                  type="email"
                />
                <button
                  type="submit"
                  className="p-2 bg-gray-900 dark:bg-sky-500 text-white rounded-lg hover:opacity-90 transition-all"
                >
                  Đăng ký ngay
                </button>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                <ShieldCheck size={12} /> Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© 2025 WatchStore. Tất cả quyền được bảo lưu.</p>
          </div>

          <div className="flex gap-8 font-medium">
            <Link to="#" className="hover:text-sky-500 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-sky-500 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-sky-500 transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}