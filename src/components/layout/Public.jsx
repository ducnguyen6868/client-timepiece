import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ChatModal from './ChatModal';
import NavBottom from '../common/NavBottom';
import websiteLogo from '../../assets/website-logo.png';

export default function Public() {
    const [isOpen, setIsOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadingAnimation = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
            setLoading(false);
        }
        loadingAnimation();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 select-none">

                {/* Logo + Spinner */}
                <div className="relative flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24 mb-3">
                    <img
                        src={websiteLogo}
                        alt="Website Logo"
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain z-10"
                    />

                    {/* Vòng loading */}
                    <div className="
            absolute inset-0 
            rounded-full 
            border-2 sm:border-3 
            border-transparent 
            border-b-brand 
            animate-spin
        " />
                </div>

                {/* Brand Name */}
                <h1 className="
        text-lg sm:text-2xl md:text-3xl 
        font-extrabold tracking-widest 
        bg-gradient-to-r from-blue-600 to-cyan-500 
        bg-clip-text text-transparent
    ">
                    TIMEPIECE
                </h1>

                {/* Subtitle (tùy chọn, giúp UI cân hơn) */}
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Premium Watch Store
                </p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className='mb-16 md:mb-0'>
                <Outlet />
            </div>
            <div className='hidden md:block'>
                {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50
           bg-brand hover:bg-brand-hover text-white transition-transform
          ${isOpen ? 'rotate-90 scale-90' : 'hover:scale-105'}`}
                    title={isOpen ? 'Minimize Chat' : 'Open Live Chat'}
                >
                    {!isOpen && <MessageSquare className="w-7 h-7 text-white" />}
                </button>
            </div>
            <div className='md:hidden'>
                <NavBottom />
            </div>
            <div className='hidden md:block'>
                <Footer />
            </div>
        </>
    )
}