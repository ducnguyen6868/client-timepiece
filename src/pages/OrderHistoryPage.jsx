import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';
import orderApi from '../api/orderApi';
import LoadingAnimations from '../components/common/LoadingAnimations';
import Notification from '../components/common/Notification';

// Reusable Component: Order Status Badge
const OrderStatusBadge = ({ status }) => {
    let classes = '';
    let Icon = null;

    switch (status) {
        case 'Delivered Successfully':
            classes = 'bg-green-100 text-green-700';
            Icon = CheckCircle;
            break;
        case 'Order Placed':
            classes = 'bg-amber-100 text-amber-700';
            Icon = Clock;
            break;
        case 'Processing':
            classes = 'bg-yellow-100 text-yellow-700';
            Icon = Loader2;
            break;
        case 'Shipping':
            classes = 'bg-blue-100 text-blue-700';
            Icon = Truck;
            break;
        case 'Canceled':
            classes = 'bg-red-100 text-red-700';
            Icon = XCircle;
            break;
        default:
            classes = 'bg-gray-100 text-gray-600';
            Icon = Clock;
    }

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-sm md:rounded-md xl:rounded-lg ${classes}`}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{status}</span>
        </span>
    );
};

// Main Component: Order Page

export default function OrderHistoryPage() {

    const { infoUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [logged, setLogged] = useState(false);
    const [checkLogged, setCheckLogged] = useState(false);

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const [orders, setOrders] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const statusFilters = ['All', 'Order Placed', 'Processing', 'Shipping', 'Delivered Successfully', 'Canceled'];

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        if (!infoUser || infoUser.fullName === '') setLogged(false);
        else setLogged(true);
        setCheckLogged(true);
    }, [infoUser]);

    useEffect(() => {
        if (!checkLogged) return;
        const getOrders = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 200));
                let response;
                if (logged) {
                    response = await orderApi.getOrders();
                } else {
                    let order = localStorage.getItem('order');
                    order = JSON.parse(order);
                    response = await orderApi.viewList(order);
                }
                setOrders(response.orders || []);
            } catch (err) {
                setShow(true);
                setType('error');
                setMessage(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            };
        };
        getOrders();
    }, [checkLogged]);

    useEffect(() => {
        if (!orders.length) return;
        const filtered = orders.filter(order =>
            activeFilter === 'All' || order.status?.at(-1)?.present === activeFilter
        );
        setFilteredOrders(filtered);
        const pages = Math.ceil(filtered.length / 5);
        setPages(pages);
    }, [activeFilter, orders]);

    const startOrder = (page - 1) * 5;
    const endOrder = startOrder + 5;
    const listOrder = filteredOrders.slice(startOrder, endOrder);

    const handleNavigate=(order)=>{
        navigate(`/order-detail/${order._id}`,{
            state:order
        });
    };

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    };

    return (
        <>
            <Notification show={show} type={type} message={message} onClose={() => setShow(false)} />
            <div className={logged ? `space-y-6` : 'px-4 md:px-5 xl:px-6 lg:px-8'}>
                {/* Status Filter Tabs */}
                <div className="flex space-x-2 my-2 border-b border-gray-200 overflow-x-auto">
                    {statusFilters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap
              ${activeFilter === filter
                                    ? 'border-teal-500 text-brand bg-teal-50/50'
                                    : 'border-transparent text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {filter} (
                            {orders.filter(o =>
                                filter === 'All' || o.status?.at(-1)?.present === filter
                            ).length}
                            )
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-2">
                    {filteredOrders.length > 0 ? (
                        <>
                            {listOrder.map(order => {
                                const latestStatus = order.status?.at(-1);
                                return (
                                    <div key={order._id} 
                                        className="bg-white p-3 md:p-4 xl:p-5 rounded-xl shadow-sm border
                                    border-gray-200 hover:shadow-md transition-all cursor-pointer"
                                    onClick={()=>handleNavigate(order)}
                                    >
                                        <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                                            <div className='hidden md:block'>
                                                <span className="text-xs font-semibold uppercase text-gray-500">Order code : </span>
                                                <span className="text-lg font-bold text-teal-600">{order.code}</span>
                                            </div>
                                            <OrderStatusBadge status={latestStatus?.present} />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Order Date</p>
                                                <span>
                                                    {formatDate(order?.createdAt)} - {formatTime(order?.createdAt)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Total</p>
                                                <p className="text-lg font-bold text-gray-900">${order.final_amount.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Items ({order.watches.length})</p>
                                                {order.watches.map((watch, index) => (
                                                    <p key={index} className="font-medium text-gray-800 truncate">x{watch.quantity} {watch.name} </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='mt-4 md:hidden'>
                                            <span className="text-sm font-semibold uppercase text-gray-500">Order code : </span>
                                            <span className="text-sm font-bold text-teal-600">{order.code}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Pagination Placeholder */}
                            {pages > 1 && (
                                <div className="p-4 flex justify-center gap-4 items-center border-t border-gray-200 bg-white rounded-xl shadow-md">
                                    <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                                    <button className="px-3 py-1 text-sm rounded-lg bg-brand text-white">{page} / {pages}</button>
                                    <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100" disabled={page === pages} onClick={() => setPage(page + 1)} >Next</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                            <Package className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                            <p className="text-lg font-semibold text-gray-700">
                                No {activeFilter === 'All' ? '' : activeFilter} orders found.
                            </p>
                            {activeFilter === 'All' && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Start shopping to see your orders here!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
