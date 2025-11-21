import { useState } from 'react';
import {
    Users, Settings,
    Plus, Filter, Zap, Tag, Gift, Award, Clock, TrendingUp, XCircle, Eye, DollarSign, Search
} from 'lucide-react';

// Dữ liệu giả lập cho Promotions
const promotionsData = [
    {
        id: 'SUMMER25',
        name: 'Summer Flash Sale',
        type: 'Discount Code',
        value: '25% OFF',
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        status: 'Active',
        redemptions: 452
    },
    {
        id: 'FREESHIP',
        name: 'Free Shipping Over $500',
        type: 'Shipping',
        value: 'Free',
        startDate: '2025-01-01',
        endDate: '2026-01-01',
        status: 'Active',
        redemptions: 1200
    },
    {
        id: 'VIP10',
        name: 'VIP Customer 10%',
        type: 'Loyalty Tier',
        value: '10% OFF',
        startDate: '2025-10-01',
        endDate: '2025-10-31',
        status: 'Expired',
        redemptions: 80
    },
    {
        id: 'WELCOME15',
        name: 'New User Welcome',
        type: 'Discount Code',
        value: '15% OFF',
        startDate: '2025-09-01',
        endDate: '2025-12-31',
        status: 'Scheduled',
        redemptions: 0
    },
];

// Dữ liệu giả lập cho Loyalty Tiers
const loyaltyTiers = [
    { name: 'Bronze', minSpend: 0, multiplier: 1, color: 'text-amber-700 bg-amber-100' },
    { name: 'Silver', minSpend: 3000, multiplier: 1.25, color: 'text-gray-700 bg-gray-200' },
    { name: 'Gold', minSpend: 7500, multiplier: 1.5, color: 'text-yellow-700 bg-yellow-100' },
    { name: 'Platinum', minSpend: 15000, multiplier: 2, color: 'text-teal-700 bg-teal-100' },
];

// ************************************************
// Reusable Component: Promotion Status Badge
// ************************************************
const PromotionStatusBadge = ({ status }) => {
    let classes = '';
    let Icon = null;

    if (status === 'Active') {
        classes = 'bg-green-100 text-green-700 border-green-300';
        Icon = Zap;
    } else if (status === 'Scheduled') {
        classes = 'bg-blue-100 text-blue-700 border-blue-300';
        Icon = Clock;
    } else if (status === 'Expired') {
        classes = 'bg-red-100 text-red-700 border-red-300';
        Icon = XCircle;
    }

    return (
        <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full border ${classes}`}>
            {Icon && <Icon className="w-3 h-3" />}
            <span>{status}</span>
        </span>
    );
};

// ************************************************
// Main Component: Promotion & Loyalty Management Page
// ************************************************
export default function PromotionLoyaltyManagementPage() {
    const [activeTab, setActiveTab] = useState('promotions'); // 'promotions' hoặc 'loyalty'
    const [searchTerm, setSearchTerm] = useState('');

    // --- Content for Promotions Tab ---
    const PromotionsContent = () => (
        <div className="space-y-2">
            <div className='flex justify-end mb-4 gap-4 flex-row'>
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        name='order'
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Search promotions..."
                        className="flex-1 max-w-72 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 bg-gray-50"
                    />
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span className='hidden sm:block sm:ml-2' >Filter Type</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all bg-brand hover:bg-brand-hover text-white shadow-md`}>
                        <Plus className="w-4 h-4" />
                        <span className='hidden sm:block sm:ml-2'>Create New Promo</span>
                    </button>

                </div>

            {/* Promotions Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto" >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Code/ID', 'Name', 'Type', 'Value', 'Duration', 'Redemptions', 'Status', 'Actions'].map(header => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {promotionsData.map((promo) => (
                                <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{promo.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{promo.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Tag className="w-4 h-4 text-teal-400" />
                                            <span>{promo.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-bold">{promo.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        {promo.startDate} - {promo.endDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{promo.redemptions}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <PromotionStatusBadge status={promo.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button title="View Details" className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // --- Content for Loyalty Tab ---
    const LoyaltyContent = () => (
        <div className="">
            <div className="flex justify-between items-center mb-2 md:mb-3 xl:mb-4">
                <h3 className="text-base font-bold text-brand">Loyalty Tiers & Rewards Setup</h3>
                <button className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border border-teal-500 text-teal-600 hover:bg-teal-50 shadow-md`}>
                    <Settings className="w-4 h-4" />
                    <span className='hidden sm:block sm:ml-2'>Manage Tier Logic</span>
                </button>
            </div>

            {/* Loyalty Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} title="Total Loyalty Members" value="5,890" change="+15% MoM" isPositive={true} />
                <StatCard icon={DollarSign} title="Loyalty Member Revenue" value="$82,500" change="75% of total" isPositive={true} />
                <StatCard icon={Gift} title="Points Redeemed (MoM)" value="12,400" change="-5% MoM" isPositive={false} />
            </div>

            {/* Tiers Overview */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Tier Definitions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {loyaltyTiers.map(tier => (
                        <div key={tier.name} className={`p-4 rounded-xl border-2 ${tier.color}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xl font-extrabold ${tier.color}`}>{tier.name}</span>
                                <Award className={`w-6 h-6 ${tier.color}`} />
                            </div>
                            <p className="text-xs text-gray-600">Min. Annual Spend:</p>
                            <p className="text-lg font-bold text-gray-900">${tier.minSpend.toLocaleString()}</p>
                            <p className="text-sm mt-2 text-gray-700">
                                <TrendingUp className="w-4 h-4 inline mr-1 text-teal-600" />
                                **{tier.multiplier}x** Point Earning
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Reusable Stat Card (copied and slightly modified from Dashboard)
    const StatCard = ({ title, value, change, isPositive, icon: Icon }) => {
        const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
        const changeBg = isPositive ? 'bg-green-100' : 'bg-red-100';

        return (
            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <div className={`p-2 rounded-full bg-brand hover:bg-brand-hover text-white`}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${changeColor} ${changeBg}`}>
                    <TrendingUp className={`w-3 h-3 mr-1 transform ${isPositive ? 'rotate-0' : 'rotate-180'}`} />
                    {change}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('promotions')}
                    className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'promotions'
                        ? `border-b-4 border-brand text-brand hover:text-brand-hover`
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <Zap className="w-5 h-5 inline" />
                    <span className='hidden sm:block sm:ml-2'>Promotions</span> 
                </button>
                <button
                    onClick={() => setActiveTab('loyalty')}
                    className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'loyalty'
                        ? `border-b-4 border-brand text-brand hover:text-brand-hover`
                        : 'text-gray-500 hover:text-gray-700 ml-4'
                        }`}
                >
                    <Award className="w-5 h-5 inline" />
                    <span className='hidden sm:block sm:ml-2'>Loyalty Program</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="pt-4">
                {activeTab === 'promotions' ? <PromotionsContent /> : <LoyaltyContent />}
            </div>
        </>
    );
}