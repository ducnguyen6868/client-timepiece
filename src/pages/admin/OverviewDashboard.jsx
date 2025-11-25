import { AlertTriangle, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import orderApi from '../../api/orderApi';
import RevenueChart from '../../components/layout/RevenueChart';

const topCustomers = [
    { name: 'Eleanor Vance', sales: 5490.50, status: 'VIP', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734bcae?w=50&h=50&fit=crop' },
    { name: 'Marcus Thorne', sales: 4890.00, status: 'Gold', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=50&h=50&fit=crop' },
    { name: 'Sophia Li', sales: 3870.00, status: 'Silver', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=50&h=50&fit=crop' },
    { name: 'David Chen', sales: 3100.00, status: 'Bronze', avatar: 'https://images.unsplash.com/photo-1506794778202-dfa6703828d0?w=50&h=50&fit=crop' },
];


const adminAlerts = [
    { text: 'Server load is critically high, investigate immediately.', level: 'high' },
    { text: 'New customer support ticket requires attention.', level: 'medium' },
    { text: 'Inventory count mismatch for product X.', level: 'low' },
];

// ************************************************
// Main Component: Overview Dashboard
// ************************************************
export default function Overview() {
    const [topProducts, setTopProducts] = useState([]);
    const [time, setTime] = useState('7day');

    useEffect(() => {
        const getTopSelling = async () => {
            try {
                const response = await orderApi.getTopSelling(time);
                setTopProducts(response.topProducts);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getTopSelling();
    }, [time]);

    const getCustomerStatusClass = (status) => {
        if (status === 'VIP') return 'text-yellow-600 border-yellow-300 bg-yellow-50';
        if (status === 'Gold') return 'text-amber-600 border-amber-300 bg-amber-50';
        if (status === 'Silver') return 'text-gray-600 border-gray-300 bg-gray-50';
        return 'text-orange-600 border-orange-300 bg-orange-50';
    };

    return (
        <>
            <RevenueChart />

            {/* Top-Selling Watches */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200 my-4">
                <div className='flex justify-between items-center mb-4 border-b border-gray-100 pb-2'>
                    <h2 className="text-xl font-bold text-gray-900 outline-none border-none">Top-Selling Watches</h2>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white  focus:outline-none focus:ring-2 focus:ring-brand-hover transition-all duration-200  shadow-sm"
                    >
                        <option value="7day" className="text-black bg-white">
                            7 days ago
                        </option>
                        <option value="30day" className="text-black bg-white">
                            30 days ago
                        </option>
                        <option value="allTime" className="text-black bg-white">
                            All time
                        </option>
                    </select>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {topProducts?.map(product => (
                        <div key={product._id} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <img src={`${process.env.REACT_APP_API_URL}`+`/${product.image}`} alt={product.name}
                                className="w-20 h-20 object-cover rounded-lg mb-2 border border-gray-300"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                                }}
                            />
                            <p className="text-sm font-medium text-gray-900 truncate w-full px-1">{product.name}</p>
                            <span className="text-xs text-gray-600 mt-1">{product.totalSold} units sold</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Top-Selling Watches & Promotions/Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Top Customers */}
                <div className="bg-white flex flex-col gap-4 p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Top Customers</h2>
                    <div className="space-y-4">
                        {topCustomers.map(customer => (
                            <div key={customer.name} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                                        <button className={`text-xs font-medium border rounded-full px-4 py-0.5 ${getCustomerStatusClass(customer.status)}`}>
                                            {customer.status}
                                        </button>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">${customer.sales.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Promotions & Loyalty */}
                <div className="bg-white flex flex-col gap-4 p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Promotions & Loyalty</h2>

                    <div className="space-y-4 text-sm">
                        <div className="border border-teal-300 bg-teal-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-teal-700">Summer Sale</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-200 text-teal-800 font-semibold">Active</span>
                            </div>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-xs">
                                <li>Up to 30% off on selected items</li>
                                <li>27% redemption rate</li>
                            </ul>
                        </div>
                        <div className="border border-blue-300 bg-blue-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-blue-700">New Customer Welcome</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 font-semibold">Active</span>
                            </div>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-xs">
                                <li>10% off first order for new sign-ups</li>
                                <li>High conversion rate</li>
                            </ul>
                        </div>
                    </div>
                    <button className={`flex justify-center items-center gap-4 flex-1 text-xs px-3 py-1.5 rounded-lg font-medium bg-brand hover:bg-brand-hover text-white`} >
                        <Plus width={20} /> Create New Promo
                    </button>

                </div>

                {/* Admin Alerts */}
                <div className="bg-white flex flex-col gap-4 p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Admin Alerts</h2>
                    <div className="space-y-3">
                        {adminAlerts.map((alert, index) => {
                            let iconColor = 'text-red-500';
                            let bgColor = 'bg-red-50';
                            let borderColor = 'border-red-300';
                            if (alert.level === 'medium') {
                                iconColor = 'text-yellow-500';
                                bgColor = 'bg-yellow-50';
                                borderColor = 'border-yellow-300';
                            } else if (alert.level === 'low') {
                                iconColor = 'text-blue-500';
                                bgColor = 'bg-blue-50';
                                borderColor = 'border-blue-300';
                            }

                            return (
                                <div key={index} className={`flex items-start p-3 rounded-lg border ${bgColor} ${borderColor}`}>
                                    <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                                    <p className="text-xs text-gray-800 ml-3">{alert.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}