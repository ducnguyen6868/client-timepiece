import {
    ShoppingCart, MapPin, Zap, Heart, Award, BarChart2, Tag, Camera, LogOut, XCircle
} from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import profileApi from '../api/profileApi';
import Notification from '../components/common/Notification';
import LoadingAnimations from '../components/common/LoadingAnimations';
import ImageError from '../assets/imageError.jpg';

// ************************************************
// Main Component: Profile Page
// ************************************************
export default function ProfilePage() {

    const [user, setUser] = useState({});
    const { setInfoUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [logout, setLogout] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await profileApi.profile();
                setUser(response.user);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message)
            }finally{
                setLoading(false);
            }
        }
        getProfile();
    }, []);

    const getRank = (rank) => {
        switch (rank) {
            case 'Brown': return <span className="inline-flex items-center w-max px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                <Award className="w-3 h-3 mr-1" />
                {rank + ' member'}
            </span>;
            case 'Silver': return <span className="inline-flex items-center w-max px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                <Award className="w-3 h-3 mr-1" />
                {rank + ' member'}
            </span>;
            case 'Gold': return <span className="inline-flex items-center w-max px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-600">
                <Award className="w-3 h-3 mr-1" />
                {rank + ' member'}
            </span>;
            case 'Diamond': return <span className="inline-flex items-center w-max px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                <Award className="w-3 h-3 mr-1" />
                {rank + ' member'}
            </span>;
            default: break
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoadingAvatar(true);
            await new Promise(resolve => setTimeout(resolve, 500));

            const response = await profileApi.patchAvatar(formData);

            // Update user avatar locally
            setUser(prev => ({ ...prev, avatar: response.avatar }));
            setInfoUser(prev => ({ ...prev, avatar: response.avatar }));
            setShow(true);
            setType('success');
            setMessage(response.message);
        } catch (err) {
            setMessage(err.response?.data?.message || err.message);
            setShow(true);
            setType('error');
        } finally {
            setLoadingAvatar(false);
        }
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        setInfoUser({ fullName: '', email: '', avatar: '' });
        navigate('/');
    };

    if(loading){
        return(
            <LoadingAnimations option='dots_circle'/>
        );
    };
    return (
        <>
            {/* 1. Profile Overview (Default Content) */}
            <>
                <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
                {/* User Card */}
                <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
                    <div className='relative rounded-full overflow-hidden'>
                        <img src={user.avatar}
                            alt={user.name}
                            title={user.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-teal-500"
                            onError={(e) => e.target.src = ImageError} />
                        <button className='w-full absolute bottom-0 flex justify-center backdrop-blur-[2px]'>
                            <Camera className='w-6 h-6 text-gray-400' />
                        </button>
                        <input name='image' type='file' acept='.png , .jpg , .jpeg' className='absolute inset-0 visibility opacity-0 cursor-pointer' onChange={(e) => handleAvatarChange(e)} />
                        {loadingAvatar && (
                            <div className='absolute inset-0 p-8 z-50 flex justify-center items-center'>
                                <div className='border-b-2 rounded-full w-full h-full border-brand animate-spin'></div>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <h2 className="text-xl font-bold text-gray-900 flex gap-4 items-end">
                            <span>{user.fullName}</span>
                        </h2>
                        <p className="text-gray-600 mb-1 text-base ">{user.email}</p>
                        {getRank(user.rank)}
                    </div>
                </div>

                {/* Reward Progress */}
                <div className="my-4 ">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                        <Zap className="w-5 h-5 mr-2 text-teal-600" />
                        Reward Progress
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-600">Current Points: <span className='text-brand'>{user.point?.quantity || 0}</span></span>
                            <span className="text-sm text-gray-500">Next Tier: {user.rankScore[1] || 0}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="h-2.5 rounded-full"
                                style={{ width: `${Math.ceil(0 / user.rankScore[1])}`, backgroundColor: '#00bcd4' }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{user.rankScore[1] - 0} points to reach next tier!</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="my-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                        <BarChart2 className="w-5 h-5 mr-2 text-teal-600" />
                        Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard icon={ShoppingCart} label="Total Orders" value={user.orders?.length} color="teal" />
                        <StatCard icon={Heart} label="Wishlist Items" value={user.wishlist?.length} color="red" />
                        <StatCard icon={Tag} label="Active Promotions" value={user.promotions?.length} color="blue" />
                        <StatCard icon={MapPin} label="Saved Addresses" value={user.addresses?.length} color="orange" />
                    </div>
                </div>

                {/* Logout */}
                <div className='flex justify-center items-center'>
                    <button className='flex gap-2 bg-red-500 text-white
                  py-2 px-12 rounded-xl justify-center items-center'
                        onClick={() => setLogout(true)}
                    >
                        <LogOut />
                        <span >Logout</span>
                    </button>
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
        </>
    );
}

// ************************************************
// Reusable Component: Quick Stat Card
// ************************************************
const StatCard = ({ icon: Icon, label, value, color }) => {
    // Mapping color names to Tailwind classes
    const colorClasses = {
        teal: 'text-teal-600 bg-teal-50',
        red: 'text-red-600 bg-red-50',
        blue: 'text-blue-600 bg-blue-50',
        orange: 'text-orange-600 bg-orange-50',
    };

    return (
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${colorClasses[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
};