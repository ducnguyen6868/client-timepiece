import { useState } from 'react';
import {
    Wallet, TrendingUp, Plus, Minus, ArrowUpRight, ArrowDownLeft,
    Clock, AlertCircle, RefreshCw, Eye, EyeOff, CreditCard, Download, Search
} from 'lucide-react';

export default function WalletPage() {
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // all, deposit, withdraw
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data
    const walletBalance = 1250000;
    const pendingAmount = 50000;

    const transactions = [
        {
            id: 1,
            type: 'deposit',
            amount: 500000,
            description: 'Account Top-up',
            date: '2024-11-20',
            time: '14:30',
            status: 'completed'
        },
        {
            id: 2,
            type: 'withdraw',
            amount: 200000,
            description: 'Payment for Order #12345',
            date: '2024-11-19',
            time: '10:15',
            status: 'completed'
        },
        {
            id: 3,
            type: 'deposit',
            amount: 300000,
            description: 'Refund from Order #12344',
            date: '2024-11-18',
            time: '16:45',
            status: 'completed'
        },
        {
            id: 4,
            type: 'withdraw',
            amount: 150000,
            description: 'Payment for Order #12343',
            date: '2024-11-17',
            time: '09:20',
            status: 'pending'
        },
        {
            id: 5,
            type: 'deposit',
            amount: 800000,
            description: 'Account Top-up',
            date: '2024-11-15',
            time: '11:00',
            status: 'completed'
        }
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesTab = activeTab === 'all' || transaction.type === activeTab;
        const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            <div className="container text-white mx-auto px-4 rounded-lg md:rounded-xl xl:rounded-2xl sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 bg-gradient-to-tr from-green-500 to-brand">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Wallet className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold ">My Wallet</h1>
                        <p className="text-xs sm:text-sm text-white/80 mt-0.5">Manage your balance and transactions</p>
                    </div>
                </div>

                {/* Beta Notice */}
                <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6">
                    <div className="flex gap-2 sm:gap-3">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-yellow-100 mb-1">
                                Feature in Development
                            </h3>
                            <p className="text-[10px] sm:text-xs text-yellow-50/90 leading-relaxed">
                                This wallet feature is currently in beta testing. Please use with caution and report any issues to our support team. Some features may be limited or subject to change.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-xs sm:text-sm text-white/80">Available Balance</p>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label={showBalance ? "Hide balance" : "Show balance"}
                                >
                                    {showBalance ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                {showBalance ? formatCurrency(walletBalance) : '••••••••'}
                            </h2>
                        </div>
                        <button
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Refresh balance"
                        >
                            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-4 sm:mb-6">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>Pending: {showBalance ? formatCurrency(pendingAmount) : '••••••'}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <button className="flex items-center justify-center gap-2 bg-white text-[#00bcd4] hover:bg-gray-50 font-semibold rounded-lg sm:rounded-xl py-3 sm:py-3.5 transition-all hover:scale-105 active:scale-95 shadow-lg">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Deposit</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold rounded-lg sm:rounded-xl py-3 sm:py-3.5 transition-all hover:scale-105 active:scale-95 border border-white/30">
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Withdraw</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="container mx-auto sm:px-4 lg:px-6 mt-2 md:mt-4 xl:mt-6 lg:mt-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Total Deposits</p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                                    {formatCurrency(1600000)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Total Withdrawals</p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                                    {formatCurrency(350000)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#00bcd4]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">This Month</p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                                    {formatCurrency(800000)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Transactions</p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                                    {transactions.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Section */}
            <div className="container mx-auto sm:px-4 lg:px-6 py-6 sm:py-8">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Section Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Transaction History</h2>
                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View all your wallet activities</p>
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4] hover:text-white rounded-lg transition-colors font-semibold text-sm">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none text-sm"
                                />
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${activeTab === 'all'
                                            ? 'bg-white text-[#00bcd4] shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveTab('deposit')}
                                    className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${activeTab === 'deposit'
                                            ? 'bg-white text-[#00bcd4] shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Deposits
                                </button>
                                <button
                                    onClick={() => setActiveTab('withdraw')}
                                    className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${activeTab === 'withdraw'
                                            ? 'bg-white text-[#00bcd4] shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Withdrawals
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transactions List */}
                    <div className="divide-y divide-gray-100">
                        {filteredTransactions.length === 0 ? (
                            <div className="p-8 sm:p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <Wallet className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {/* Icon */}
                                        <div
                                            className={`flex-shrink-0 p-2 sm:p-3 rounded-lg sm:rounded-xl ${transaction.type === 'deposit'
                                                    ? 'bg-green-100'
                                                    : 'bg-red-100'
                                                }`}
                                        >
                                            {transaction.type === 'deposit' ? (
                                                <ArrowDownLeft className={`w-5 h-5 sm:w-6 sm:h-6 text-green-600`} />
                                            ) : (
                                                <ArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 text-red-600`} />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                                {transaction.description}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {transaction.date} • {transaction.time}
                                                </p>
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${transaction.status === 'completed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right flex-shrink-0">
                                            <p
                                                className={`text-sm sm:text-base md:text-lg font-bold ${transaction.type === 'deposit'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                    }`}
                                            >
                                                {transaction.type === 'deposit' ? '+' : '-'}
                                                {formatCurrency(transaction.amount)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

