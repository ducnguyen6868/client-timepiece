import { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, Search, Filter, ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import CustomerList from '../../components/common/CustomerList';
import StaffList from '../../components/common/StaffList';
import userApi from '../../api/userApi';
import AdminLogin from './AdminLogin';
import LoadingAnimations from '../../components/common/LoadingAnimations';

// ************************************************
// Main Component: User Management Page
// ************************************************
export default function UserManagement() {

    const [adminLogged , setAdminLogged] = useState(true);
    const [loading,setLoading]= useState(false);

    const [activeTab, setActiveTab] = useState('customers');
    const [usersData, setUsersData] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalStaff, setTotalStaff] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const [page, setPage] = useState(1);
    const pages = Math.ceil(total / 5);

    const role = activeTab === 'customers' ? 'user' : 'admin';
    const limit = 5;
    const getList = async () => {
        try {
            setLoading(true);
            const response = await userApi.getList(role, page, limit);
            setUsersData(response.usersData);
            setTotal(response.total);
            setTotalUser(response.totalUser);
            setTotalStaff(response.totalStaff);
        } catch {
            setAdminLogged(false);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getList();
    }, [activeTab, page]);

    if(!adminLogged){
        return(
            <AdminLogin/>
        );
    };
    
    if(loading){
        return(
            <LoadingAnimations option='dots_circle'/>
        );
    };

    return (
        <div className="space-y-6">

            {/* Tab Navigation */}
            <div className="flex flex-row flex-wrap justify-between items-start md:items-center gap-4 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <div className="flex flex-1 min-w-44 border-b-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`flex-1 justify-center px-6 py-3 text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${activeTab === 'customers'
                            ? `bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white shadow-lg transform scale-105`
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        <span className='hidden sm:block'>Customers</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === 'customers' ? 'bg-white text-[#00bcd4]' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {totalUser}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('staff')}
                        className={`flex-1 justify-center px-6 py-3 text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${activeTab === 'staff'
                            ? `bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white shadow-lg transform scale-105`
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Shield className="w-5 h-5" />
                        <span className='hidden sm:block'>Admin & Staff</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === 'staff' ? 'bg-white text-[#00bcd4]' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {totalStaff}
                        </span>
                    </button>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00bcd4] bg-white shadow-sm transition-all duration-300"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${showFilters
                            ? 'bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#00bcd4]'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span className='hidden sm:block sm:ml-2'>Filters</span>
                    </button>

                    <button className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 transform hover:scale-105 bg-brand hover:bg-brand-hover text-white shadow-lg hover:shadow-xl`}>
                        <UserPlus className="w-4 h-4" />
                        <span className='hidden sm:block sm:ml-2'>{activeTab === 'customers' ? 'Add Customer' : 'Add Staff'}</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'customers' ? <CustomerList customersData={usersData} onChange={()=>getList()}/> : <StaffList staffData={usersData} />}

            {/* Pagination */}
            <div className='flex gap-2 justify-center p-2'>
                <button onClick={() => setPage(page - 1)} disabled={page === 1} >
                    <ChevronLeftCircle />
                </button>
                <span>{page}/{pages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === pages} >
                    <ChevronRightCircle />
                </button>
                <span>({total})</span>
            </div>

        </div>
    );
}