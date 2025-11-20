import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, Loader2, AlertTriangle } from 'lucide-react';
import OrderDetail from '../components/layout/OrderDetail';
import orderApi from '../api/orderApi';
import ReviewModal from '../components/common/ReviewModal';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

// ************************************************
// Reusable Component: Order Status Badge
// ************************************************
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
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${classes}`}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{status}</span>
        </span>
    );
};

// ===============================
// Modal Confirm Cancel
// ===============================
const CancelModal = ({ open, onClose, onConfirm, orderCode }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-max animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Cancel Order
                    </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 w-max">
                    Are you sure you want to cancel order <span className="font-medium text-gray-900 dark:text-gray-200">#{orderCode}</span>?<br />
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Keep Order
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    );
};

// ************************************************
// Main Component: Order Page
// ************************************************
export default function OrderPage() {
    const [logged, setLogged] = useState(true);

    const [orders, setOrders] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const statusFilters = ['All', 'Order Placed', 'Processing', 'Shipping', 'Delivered Successfully', 'Canceled'];

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [code, setCode] = useState();
    const [orderId, setOrderId] = useState();

    const [detail, setDetail] = useState(false);
    const [order, setOrder] = useState();

    const [review, setReview] = useState(false);
    const [data, setData] = useState({});
    const handleReview = (order) => {
        const user = order.user || '';
        const name = order.name;
        const codeProduct = order.products[0].code;
        const codeOrder = order.code;
        setData({ user, name, codeProduct, codeOrder });
        setReview(true);
    }

    const handleDetail = (order) => {
        setDetail(true);
        setOrder(order);
    }

    const handleCancelOrder = (order) => {
        setShowCancelModal(true);
        setCode(order.code);
        setOrderId(order._id);
    }

    const handleSubmit = async () => {
        try {
            const status = 'Canceled';
            await orderApi.changeStatus(orderId, status);
            setShowCancelModal(false);
            logged ? getOrders() : getOtherOrders();
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }

    }
    const getOrders = async () => {
        try {
            const response = await orderApi.getOrders();
            setOrders(response.orders || []);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            setLogged(false);
            localStorage.removeItem('token');
        }
    };
    const getOtherOrders = async () => {
        try {
            let order = localStorage.getItem('order');
            order = JSON.parse(order);
            const response = await orderApi.viewList(order);
            setOrders(response.orders || []);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);

        }
    };
    useEffect(() => {
        getOrders();
        if (!logged) {
            getOtherOrders();
        }
    }, [logged]);

    useEffect(() => {
        if (!orders.length) return;
        const filtered = orders.filter(order =>
            activeFilter === 'All' || order.status?.at(-1)?.present === activeFilter
        );
        setFilteredOrders(filtered);
        const pages = Math.ceil(filtered.length / 2);
        setPages(pages);
    }, [activeFilter, orders]);

    const startOrder = (page - 1) * 2;
    const endOrder = startOrder + 2;
    const listOrder = filteredOrders.slice(startOrder, endOrder);

    return (
        <>
            <div className={logged ? `space-y-6` : 'px-4 md:px-5 xl:px-6 lg:px-8' }>
                {/* Status Filter Tabs */}
                <div className="flex space-x-2 space-y-2 border-b border-gray-200 overflow-x-auto">
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
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        <>
                            {listOrder.map(order => {
                                const latestStatus = order.status?.at(-1);
                                return (
                                    <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                                            <div>
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
                                                <p className="text-gray-500">Items ({order.products.length})</p>
                                                {order.products.map((product, index) => (
                                                    <p key={index} className="font-medium text-gray-800 truncate">x{product.quantity} {product.name} </p>
                                                ))}
                                            </div>

                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                                            <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors " onClick={() => handleDetail(order)} >
                                                View Details
                                            </button>

                                            {latestStatus?.present === 'Order Placed' && (
                                                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all" onClick={() => handleCancelOrder(order)}>
                                                    Cancel Order
                                                </button>
                                            )}
                                            {latestStatus?.present === 'Shipping' && (
                                                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all">
                                                    Track Shipment
                                                </button>
                                            )}
                                            {latestStatus?.present === 'Delivered Successfully' && !order.review && (
                                                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all" onClick={() => handleReview(order)}>
                                                    Write Review
                                                </button>
                                            )}
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
            <CancelModal open={showCancelModal} onClose={() => setShowCancelModal(false)} onConfirm={handleSubmit} orderCode={code} />
            {detail && <OrderDetail order={order} onClose={() => setDetail(false)} />}
            {review && (
                <div className='fixed z-40 backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center' onClick={() => setReview(false)}>
                    <div className='' onClick={(e) => e.stopPropagation()}>
                        <ReviewModal data={data} onClose={() => setReview(false)} onChange={() => setLogged(!logged)} />
                    </div>
                </div>
            )}
        </>
    );
}
