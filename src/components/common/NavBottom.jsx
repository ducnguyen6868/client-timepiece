import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Gift, ShoppingBag, User } from 'lucide-react';
import ImageError from '../../assets/imageError.jpg';
import ChatModal from '../layout/ChatModal';

// --- New NavBar Component ---
export default function NavBottom() {
    const [activeTab, setActiveTab] = useState('');

    const [login, setLogin] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const { infoUser } = useContext(UserContext);

    const location = useLocation();
    const queryParams = location?.pathname.split('/')[1];

    useEffect(() => {
        setActiveTab(queryParams);
    }, [queryParams]);

    useEffect(() => {
        if (!infoUser || infoUser.fullName === '') return;
        setLogin(true);
    }, [infoUser]);

    const handleActiveTab = (item) => {
        setActiveTab(item);
        if (item === '/chat') {
            setShow(true);
            return;
        };

        if (item === '/user/orders' &&!login) {
            navigate(`/order-history`);
            return;
        };
        navigate(`${item}`);
    }

    return (
        <>
            {activeTab === 'chat' && show && (
                <ChatModal onClose={() => setShow(false)} />
            )}
            <nav
                // Position: Fixed at the bottom, spanning full width
                className="fixed bottom-0 left-0 right-0 m-2 w-ful shadow-2xl z-50"
            >
                {/* Center content on wide screens, ensure spacing on mobile */}
                <div className="flex w-full justify-around items-center h-16 max-w-xl mx-auto px-2 bg-gray-100 rounded-lg">
                    <button
                        onClick={() => handleActiveTab('/')}
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === ''
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-lg`}
                    >
                        <Home className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('/user/orders')}
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'order-history'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-lg`}
                    >
                        <ShoppingBag className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('/user/promotions')}
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === '/user/promotions'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-lg`}
                    >
                        <Gift className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('/chat')}
                        className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'chat'
                            ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                            : 'text-brand hover:text-brand-hover'
                            } rounded-lg`}
                    >
                        <MessageSquare className="h-8 w-8" />
                    </button>
                    {login ? (
                        <>
                            <Link to='/user/profile' className='flex flex-col flex-1 justify-center items-center gap-1'>
                                <img src={infoUser.avatar} alt='Avatar' title='Avatar'
                                    onError={(e) => {
                                        e.target.src = ImageError
                                    }}
                                    className='w-10 h-10 md:w-10 md:h-10 rounded-full object-cover'
                                />
                            </Link>
                        </>

                    ) : (
                        <button
                            onClick={() => handleActiveTab('user/profile')}
                            className={`flex flex-col flex-1 items-center justify-center p-2 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'user/profile'
                                ? `text-white bg-brand` // Active link color (User is active for Admin Login context)
                                : 'text-brand hover:text-brand-hover'
                                } rounded-lg`}
                        >
                            <User className="h-8 w-8" />
                        </button>
                    )}

                </div>
            </nav>
        </>
    );
};