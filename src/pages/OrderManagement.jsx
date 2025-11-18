import { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Plus, Filter, ChevronUp, ChevronDown, Eye, XCircle, CheckCircle, Search,Clock ,SquarePen
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import orderApi from '../api/orderApi';
import OrderDetail from '../components/layout/OrderDetail';
import OrderStatusTracker from '../components/common/OrderStatusTracker';

// ************************************************
// Reusable Component: Status Badge (cho Trạng thái đơn hàng)
// ************************************************
const OrderStatusBadge = ({ status }) => {
    let classes = '';
    let text = status;
    let Icon = null;

    if (status === 'Delivered Successfully') {
        classes = 'bg-green-100 text-green-700 border-green-300';
        Icon = CheckCircle;
    } else if (status === 'Order Placed') {
        classes = 'bg-amber-100 text-amber-700';
        Icon = Clock;
    } else if (status === 'Processing') {
        classes = 'bg-yellow-100 text-yellow-700 border-yellow-300';
        Icon = Eye;
    } else if (status === 'Shipping') {
        classes = 'bg-blue-100 text-blue-700 border-blue-300';
        Icon = ShoppingCart;
    } else if (status === 'Canceled') {
        classes = 'bg-red-100 text-red-700 border-red-300';
        Icon = XCircle;
    }

    return (
        <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full border ${classes}`}>
            {Icon && <Icon className="w-3 h-3" />}
            <span>{text}</span>
        </span>
    );
};

// ************************************************
// Main Component: Order Management Page
// ************************************************
export default function OrderManagementPage() {
    const [orders, setOrders] = useState([]);
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(1);

    const [detail ,setDetail] = useState(false);
    const [changeStatus ,setChangeStatus] = useState(false);
    const [order , setOrder] = useState();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState({ key: 'date', direction: 'desc' });


    const handleSort = (key) => {
        setSortBy(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const sortedOrders = [...orders]
        .filter(o =>
            o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aValue = a[sortBy.key];
            let bValue = b[sortBy.key];

            // Xử lý so sánh số
            if (typeof aValue === 'number' || typeof aValue === 'object') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }
            // Xử lý so sánh chuỗi
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            let comparison = 0;
            if (aValue > bValue) {
                comparison = 1;
            } else if (aValue < bValue) {
                comparison = -1;
            }

            return sortBy.direction === 'asc' ? comparison : comparison * -1;
        });

    // Hàm render icon sắp xếp
    const renderSortIcon = (key) => {
        if (sortBy.key !== key) return null;
        return sortBy.direction === 'asc'
            ? <ChevronUp className="w-4 h-4 ml-1" />
            : <ChevronDown className="w-4 h-4 ml-1" />;
    };

    const formatHeaderKey = (header) => {
        // Chuyển đổi tên cột hiển thị sang key trong data
        const mapping = {
            'Order ID': 'id',
            'Customer': 'customer',
            'Date': 'date',
            'Total': 'total',
            'Status': 'status'
        };
        return mapping[header] || header.toLowerCase();
    };

    const tableHeaders = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Payment', 'Actions'];

    const getOrders = async () => {
        try {
            const limit=5;
            const response = await orderApi.orders(page,limit);
            setOrders(response.orders);
            setTotal(response.total);
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        getOrders();
    },[page]);

    const handleOrder = (order)=>{
        setOrder(order);
        setDetail(true);
    };
    const handleChangeStatus = (order)=>{
        setOrder(order);
        setChangeStatus(true);
    };

    const pages = Math.ceil(total/5);

    return (
        <>
            {/* Actions and Filters Bar */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand">All Orders ({total})</h2>
                <div className="flex space-x-3">
                    <div className="relative hidden sm:block animate-fadeInUp">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            name='order'
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search orders..."
                            className="w-64 pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 bg-gray-50"
                        />
                    </div>
                    <button className="animate-fadeInUp flex items-center space-x-2 px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter Status</span>
                    </button>
                    <button className={`animate-fadeInUp flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all bg-brand hover:bg-brand-hover text-white shadow-md`}>
                        <Plus className="w-4 h-4" />
                        <span>Create New Order</span>
                    </button>
                </div>
            </div>

            {/* Orders Table Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-brand text-white animate-fadeInUp">
                            <tr>
                                {/* Table Headers */}
                                {tableHeaders.map(header => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-teal-400"
                                        onClick={() => header !== 'Actions' && header !== 'Payment' && handleSort(formatHeaderKey(header))}
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {(header !== 'Actions' && header !== 'Payment') && renderSortIcon(formatHeaderKey(header))}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedOrders.length > 0 ? (
                                sortedOrders.map((order,index) => (
                                    <tr key={index} className="hover:bg-cyan-50 transition-colors animate-fadeInUp"
                                        style={{animationDelay:`${index*0.1}s`}}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{order.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-bold">${order.final_amount.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <OrderStatusBadge status={order.status.at(-1).present} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button title="View Details" className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors" onClick={()=>handleOrder(order)}>
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button title="Update Status" className="text-teal-600 hover:text-teal-800 p-1 rounded-full hover:bg-teal-50 transition-colors" onClick={()=>handleChangeStatus(order)}>
                                                    <SquarePen className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 text-lg">
                                        No orders found matching "{searchTerm}".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 flex justify-center gap-4 items-center border-t border-gray-200">
                     <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100" disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
                        <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">{page} / {pages}</button>
                        <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"disabled={page===pages} onClick={()=>setPage(page+1)} >Next</button>
                </div>
            </div>

            {detail&&(
                <OrderDetail order={order} onClose={()=>setDetail(false)}/>
            )}
            {changeStatus&&(
                <div className='fixed z-40 backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center' onClick={()=>setChangeStatus(false)}>
                    <div className=''onClick={(e)=>e.stopPropagation()}>
                    <OrderStatusTracker order={order} onClose={()=>setChangeStatus(false)} onChange={()=>getOrders()}/>
                    </div>
                </div>
            )}
        </>
    );
}