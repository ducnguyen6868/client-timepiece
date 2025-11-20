import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare , Gift, Package, User } from 'lucide-react';
import ImageError from '../../assets/imageError.jpg';
import ChatModal from '../layout/ChatModal';

// --- New NavBar Component ---
export default function NavBottom() {
    const [activeTab, setActiveTab] = useState('');
    const [login, setLogin] = useState(false);
    const [show,setShow] = useState(false);

    const navigate = useNavigate();

    const { infoUser } = useContext(UserContext);

    const location = useLocation();
    const queryParams = location?.pathname.split('/')[1];

    useEffect(() => {
        setActiveTab(queryParams);
    }, [queryParams]);

    useEffect(() => {
        if (!infoUser || !infoUser.fullName) return;
        setLogin(true);
    }, [infoUser]);

    const handleActiveTab = (item) => {
        setActiveTab(item);
        if (item === 'chat'){
            setShow(true);
            return;
        } 
        navigate(`/${item}`);
    }

    return (
        <>
            {activeTab === 'chat' && show && (
                <ChatModal onClose={()=>setShow(false)}/>
            )}
            <nav
                // Position: Fixed at the bottom, spanning full width
                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl z-50"
            >
                {/* Center content on wide screens, ensure spacing on mobile */}
                <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
                    <button
                        onClick={() => handleActiveTab('')}
                        className={`flex flex-col flex-1 items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === ''
                            ? `text-brand` // Active link color (User is active for Admin Login context)
                            : 'text-gray-500 hover:text-gray-700'
                            } rounded-md`}
                    >
                        <Home className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('wallet')}
                        className={`flex flex-col flex-1 items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'order'
                            ? `text-brand` // Active link color (User is active for Admin Login context)
                            : 'text-gray-500 hover:text-gray-700'
                            } rounded-md`}
                    >
                        <Package className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('user/promotions')}
                        className={`flex flex-col flex-1 items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'order'
                            ? `text-brand` // Active link color (User is active for Admin Login context)
                            : 'text-gray-500 hover:text-gray-700'
                            } rounded-md`}
                    >
                        <Gift className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => handleActiveTab('chat')}
                        className={`flex flex-col flex-1 items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'chat'
                            ? `text-brand` // Active link color (User is active for Admin Login context)
                            : 'text-gray-500 hover:text-gray-700'
                            } rounded-md`}
                    >
                        <MessageSquare className="h-8 w-8" />
                    </button>
                    {login ? (
                        <>
                            <Link to='/user/profile' className='flex flex-col gap-1'>
                                <img src={`${process.env.REACT_APP_API_URL}`+`/${infoUser.avatar}` || infoUser.avatar} alt='Avatar' title='Avatar'
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
                            className={`flex flex-col flex-1 items-center justify-center p-1 sm:p-2 text-xs font-medium transition duration-200 ease-in-out ${activeTab === 'user/profile'
                                ? `text-brand` // Active link color (User is active for Admin Login context)
                                : 'text-gray-500 hover:text-gray-700'
                                } rounded-md`}
                        >
                            <User className="h-8 w-8" />
                        </button>
                    )}

                </div>
            </nav>
        </>
    );
};