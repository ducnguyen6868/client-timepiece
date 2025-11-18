import {
    UserCheck, UserX, Clock, Mail, Phone,
    Edit, UndoDot, Eye, ShoppingBag, Calendar,
    TrendingUp, Star, Crown, Zap, Ban ,ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import userApi from '../../api/userApi';
import Notification from './Notification';


// ************************************************
// Reusable Component: User Status Badge
// ************************************************
const UserStatusBadge = ({ status }) => {
    let classes = '';
    let Icon = null;

    if (status === 'actived') {
        classes = 'bg-green-100 text-green-700 border-green-300';
        Icon = UserCheck;
    } else if (status === 'inActive') {
        classes = 'bg-gray-100 text-gray-700 border-gray-300';
        Icon = Clock;
    } else if (status === 'suspended') {
        classes = 'bg-red-100 text-red-700 border-red-300';
        Icon = UserX;
    }

    return (
        <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full border ${classes} animate-fadeInUp`}>
            {Icon && <Icon className="w-3 h-3" />}
            <span>{status}</span>
        </span>
    );
};

// ************************************************
// Reusable Component: Loyalty Badge
// ************************************************
const LoyaltyBadge = ({ tier }) => {
    let classes = '';
    let Icon = null;

    if (tier === 'Gold') {
        classes = 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
        Icon = Crown;
    } else if (tier === 'Silver') {
        classes = 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
        Icon = Star;
    } else {
        classes = 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
        Icon = Zap;
    }

    return (
        <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-bold rounded-full ${classes} shadow-md animate-pulse-slow`}>
            {Icon && <Icon className="w-3 h-3" />}
            <span>{tier}</span>
        </span>
    );
};


export default function CustomerList({ customersData, onChange }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const handleChangeStatus = async (user) => {
        try {
            const userId = user._id;
            const status = user.status === 'inActive' ? 'actived' : user.status === 'actived' ? 'suspended' : 'inActive';
            const response = await userApi.patchStatusUser(userId, status);
            setType('success');
            setMessage(response.message);
            onChange?.();
        } catch (err) {
            setType('error');
            setMessage(err.response?.data?.message || err.message);
        }finally{
            setShow(true);
        }

    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-slide-up">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1]">
                            <tr>
                                {['User ID', 'Customer Name', 'Contact', 'Joined Date', 'Orders', 'Total Spent', 'Loyalty', 'Status', 'Actions'].map(header => (
                                    <th key={header} className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customersData?.map((customer, idx) => (
                                <tr key={idx} className="hover:bg-cyan-50 transition-all duration-200 animate-fadeInUp group" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        <span className="bg-[#00bcd4] bg-opacity-10 px-3 py-1 rounded-lg">#{customer.code}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="relative w-10 h-10">
                                                <img className="object-cover rounded-full ring-2 ring-[#00bcd4] ring-offset-2 transform group-hover:scale-110 transition-transform duration-300" src={customer.avatar} alt={customer.name} />
                                                {customer.status === 'actived' && (
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white animate-pulse"></div>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-bold text-gray-900">{customer.fullName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className='flex items-center space-x-2 mb-1 hover:text-[#00bcd4] transition-colors'>
                                            <Mail className='w-4 h-4 text-[#00bcd4]' />
                                            <span>{customer.email}</span>
                                        </div>
                                        <div className='flex items-center space-x-2 hover:text-[#00bcd4] transition-colors'>
                                            <Phone className='w-4 h-4 text-[#00bcd4]' />
                                            <span>{customer.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{formatDate(customer.createdAt)} {formatTime(customer.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <ShoppingBag className="w-4 h-4 text-[#00bcd4]" />
                                            <span className="text-sm font-bold text-[#00bcd4]">{customer.orders?.length}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-bold text-gray-900">{customer.totalSpent}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <LoyaltyBadge tier={customer.loyalty} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <UserStatusBadge status={customer.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2  transition-opacity duration-300">
                                            <button title="View Details" className="p-2 text-[#00bcd4] hover:bg-cyan-100 rounded-lg transition-all duration-200 transform hover:scale-110">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button title="Edit" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-110">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            {customer.status === 'suspended' ? (
                                                <button title="Un Supesened"
                                                    className="p-2 text-green-600 hover:bg-green-100 
                                            rounded-lg transition-all duration-200 transform hover:scale-110"
                                                    onClick={() => handleChangeStatus(customer)}
                                                >
                                                    <UndoDot className="w-4 h-4" />
                                                </button>
                                            ) : customer.status === 'inActive'?(
                                                <button title="Active"
                                                    className="p-2 text-violet-600 hover:bg-violet-100 
                                            rounded-lg transition-all duration-200 transform hover:scale-110"
                                                    onClick={() => handleChangeStatus(customer)}
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                </button>
                                            ): (
                                                <button title="Supesened"
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg
                                            transition-all duration-200 transform hover:scale-110"
                                                    onClick={() => handleChangeStatus(customer)}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                            )

                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Notification show={show} message={message} type={type} onClose={() => setShow(false)} />
        </>
    )
}