import { Link } from 'react-router-dom';
import {
    Facebook, Instagram, Youtube, Mail, MapPin, Package,
    LifeBuoy, RefreshCw, Smartphone, CheckCircle, Zap
} from 'lucide-react';
import websiteLogo from '../../assets/website-logo.png';

// ************************************************
// Reusable Component: Animated Link (Đã sửa lỗi hover)
// ************************************************
const AnimatedLink = ({ to, children, className = '' }) => (
    <Link
        to={to}
        // Loại bỏ style cố định màu chữ để lớp hover hoạt động
        className={`relative inline-block text-sm transition-all duration-300 group text-text-primary hover:text-teal-600 ${className}`}
    >
        {children}
        {/* Animated Underline */}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

// ************************************************
// Reusable Component: Social Icon Button
// ************************************************
const SocialIconButton = ({ Icon, to, label }) => (
    <Link
        to={to}
        aria-label={label}
        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 text-text-primary
                   hover:border-teal-400 hover:text-teal-400 hover:shadow-[0_0_10px_rgba(0,188,212,0.3)] hover:scale-[1.05]`}
    >
        <Icon className="w-5 h-5 transition-colors duration-300" />
    </Link>
);

// ************************************************
// Main Component: Website Footer Light Mode
// ************************************************
export default function Footer() {

    return (
        <footer className={` bg-bg-primary text-text-primary border-t border-gray-200`}>

            {/* 💎 Main 4-Column Layout */}
            <div className={`max-w-7xl mx-auto px-6 lg:px-8 py-8 `}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Brand & About */}
                    <div className="space-y-6">
                        {/* Tên Công Ty và Slogan */}
                        <div className="flex flex-row gap-2 ">
                            <img className='w-7' src={websiteLogo} alt='Logo' title='Logo' />
                            <Link to='/'
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

                        <p className={`text-base font-light text-text-primary font-sans`}>
                            “Discover timeless style with every tick.”
                        </p>

                        <p className="text-sm text-text-secondary" >
                            TIMEPIECE blends precision, luxury, and youthful energy to inspire your moments.
                        </p>

                        <div className="flex space-x-4 pt-2">
                            <SocialIconButton Icon={Facebook} to="#" label="Facebook" />
                            <SocialIconButton Icon={Instagram} to="#" label="Instagram" />
                            <SocialIconButton Icon={Youtube} to="#" label="YouTube" />
                            <SocialIconButton Icon={Zap} to="#" label="TikTok" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-5">
                        <h3 className={`text-lg font-semibold border-b border-transparent transition-all duration-300 text-text-primary group hover:border-teal-400 w-fit`}>
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'Shop', 'Promotions', 'Points', 'About Us', 'Contact'].map(item => (
                                <li key={item}>
                                    <AnimatedLink to={`#${item.toLowerCase().replace(' ', '-')}`}>
                                        {item}
                                    </AnimatedLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Customer Support - Đã sửa lỗi hover ở AnimatedLink */}
                    <div className="space-y-5">
                        <h3 className={`text-lg font-semibold text-text-primary`}>Support</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Help Center', icon: LifeBuoy },
                                { name: 'Warranty & Repairs', icon: CheckCircle },
                                { name: 'Shipping Information', icon: Package },
                                { name: 'Returns & Refunds', icon: RefreshCw },
                                { name: 'Track Your Order', icon: MapPin },
                                { name: 'FAQs', icon: Mail },
                            ].map(item => (
                                <li key={item.name}>
                                    <AnimatedLink to={`#${item.name.toLowerCase().replace(/ &| /g, '-')}`} className={`flex items-center gap-2 pb-1 max-w-max`}>
                                        {/* Biểu tượng vẫn giữ màu Accent */}
                                        <item.icon className="w-4 h-4  text-brand" />
                                        <span className="text-sm">{item.name}</span>
                                    </AnimatedLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & App */}
                    <div className="space-y-3">
                        <h3 className={`text-lg font-semibold text-text-primary`}>Stay Updated</h3>
                        <p className="text-sm text-text-secondary space-y-3"  >
                            Join our exclusive circle to receive new launches and promotions.
                        </p>

                        {/* Email Input */}
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2 text-sm text-text-primary bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-teal-500 transition-all duration-300`}
                            />
                            <button
                                className="w-full py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform
                                           hover:scale-[1.02] hover:shadow-lg text-white bg-brand"
                            >
                                Subscribe
                            </button>
                        </div>

                        <p className="text-xs italic opacity-80 text-text-secondary" >
                            We respect your privacy.
                        </p>

                        {/* App Badges */}
                        <div className="flex space-x-3 pt-2">
                            <AppBadge label="App Store" />
                            <AppBadge label="Google Play" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌐 3. Bottom Section (Subfooter) */}
            <div className={`max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-6 border-t border-gray-200 bg-bg-primary`}>
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary" >
                    <p className="order-2 md:order-1 mt-4 md:mt-0">
                        © 2025 TIMEPIECE. All rights reserved.
                    </p>
                    <div className="order-1 md:order-2 flex space-x-4">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <Link
                                key={item}
                                to={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                className="hover:text-teal-600 hover:underline transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ************************************************
// Reusable Component: App Download Badge (Simplified)
// ************************************************
const AppBadge = ({ label }) => (
    <div
        className={`flex items-center space-x-1.5 p-2 border border-gray-300 rounded-md cursor-pointer transition-all duration-300 text-text-primary
                   hover:border-teal-400 hover:shadow-md hover:shadow-teal-100`}
    >
        <Smartphone className="w-4 h-4 text-brand" />
        <span className="text-xs font-medium">{label}</span>
    </div>
);