import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Package, User } from 'lucide-react';
import ChatModal from '../layout/ChatModal';
// --- New NavBar Component ---
export default function NavBottom() {
    const [activeTab, setActiveTab] = useState('');
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', Icon: Home, key: '' },
        { name: 'Order', Icon: Package, key: 'order' },
        { name: 'Chat', Icon: MessageSquare, key: 'chat' },
        { name: 'Account', Icon: User, key: 'user/profile' }, // Highlight User/Admin profile
    ];
    const location = useLocation();
    const queryParams = location?.pathname.split('/')[1];

    useEffect(() => {
        setActiveTab(queryParams);
    }, [queryParams]);

    const handleActiveTab= (item)=>{
        setActiveTab(item.key);
        if(item.key==='chat') return;
        navigate(`/${item.key}`);
    }

    return (
        <>
            {activeTab === 'chat' && (
                <ChatModal />
            )}
            <nav
                // Position: Fixed at the bottom, spanning full width
                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl z-50"
            >
                {/* Center content on wide screens, ensure spacing on mobile */}
                <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={()=>handleActiveTab(item)}
                            className={`flex flex-col items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === item.key
                                ? `text-brand` // Active link color (User is active for Admin Login context)
                                : 'text-gray-500 hover:text-gray-700'
                                } rounded-md`}
                        >
                            <item.Icon className="h-6 w-6" />
                            {/* Show text label on smaller screens too for clarity, or hide for minimalism */}
                            <span className="text-[10px] sm:text-xs mt-0.5">{item.name}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
};