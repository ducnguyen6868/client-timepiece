import { Shield, UserCheck, UserX, Clock, Mail, Lock, Eye , MoreVertical,Crown
} from 'lucide-react';
import {formatDate} from '../../utils/formatDate';
import {formatTime} from '../../utils/formatTime';

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
    } else if (status === 'Suspended') {
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
export default function StaffList({staffData}){
    
    return(
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1]">
                    <tr>
                        {['User ID', 'Staff Member', 'Role', 'Permissions', 'Status', 'Last Login', 'Actions'].map(header => (
                            <th key={header} className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {staffData?.map((staff, idx) => (
                        <tr key={idx} className="hover:bg-cyan-50 transition-all duration-200 animate-fadeInUp group" style={{ animationDelay: `${idx * 100}ms` }}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                <span className="bg-[#00bcd4] bg-opacity-10 px-3 py-1 rounded-lg">#{staff.code}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center ">
                                    <div className="relative w-10 h-10 ">
                                        <img className="rounded-full object-cover w-full h-full ring-2 ring-[#00bcd4] ring-offset-2 transform group-hover:scale-110 transition-transform duration-300" src={staff.avatar} alt={staff.name} />
                                        {staff.role === 'Super Admin' && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center ring-2 ring-white">
                                                <Crown className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-bold text-gray-900">{staff.name}</div>
                                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                                            <Mail className="w-3 h-3" />
                                            <span>{staff.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-bold rounded-full ${
                                    staff.role === 'Super Admin' 
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
                                        : 'bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white'
                                } shadow-md`}>
                                    <Shield className="w-3 h-3" />
                                    <span>{staff.role}</span>
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <Lock className="w-4 h-4 text-gray-400" />
                                    <span>{staff.permissions}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <UserStatusBadge status={staff.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{formatDate(staff.last_login)} {formatTime(staff.last_login)}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2  transition-opacity duration-300">
                                    <button title="Edit Permissions" className="p-2 text-[#00bcd4] hover:bg-cyan-100 rounded-lg transition-all duration-200 transform hover:scale-110">
                                        <Shield className="w-4 h-4" />
                                    </button>
                                    <button title="View Activity" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-110">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button title="More Options" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}