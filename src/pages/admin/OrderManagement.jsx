import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  XCircle,
  CheckCircle,
  Search,
  Clock,
  MoreVertical,
  Download,
  TrendingUp,
  ArrowUp,
  Truck,
  RotateCcw,
  Printer,
  X
} from 'lucide-react';

import { formatDate } from '../../utils/formatDate';
import orderApi from '../../api/orderApi';
import OrderDetail from '../OrderDetailPage';
import OrderStatusTracker from '../../components/common/OrderStatusTracker';
import LoadingAnimations from '../../components/common/LoadingAnimations';
import AdminLogin from './AdminLogin';

/* =========================
   Status Badge
========================= */
const OrderStatusBadge = ({ status }) => {
  const map = {
    'Delivered Successfully': {
      cls: 'bg-green-100 text-green-700 border-green-300',
      Icon: CheckCircle
    },
    'Order Placed': {
      cls: 'bg-amber-100 text-amber-700',
      Icon: Clock
    },
    Processing: {
      cls: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Icon: Eye
    },
    Shipping: {
      cls: 'bg-blue-100 text-blue-700 border-blue-300',
      Icon: Truck
    },
    Canceled: {
      cls: 'bg-red-100 text-red-700 border-red-300',
      Icon: XCircle
    }
  };

  const item = map[status];
  if (!item) return null;

  const { cls, Icon } = item;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${cls}`}
    >
      <Icon className="w-3 h-3" />
      <span>{status}</span>
    </span>
  );
};

/* =========================
   Main Page
========================= */
export default function OrderManagementPage() {
  const [loading, setLoading] = useState(false);
  const [adminLogged, setAdminLogged] = useState(true);

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [detail, setDetail] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [order, setOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ key: 'date', direction: 'desc' });

  /* =========================
     Sorting
  ========================= */
  const handleSort = key => {
    setSortBy(prev => ({
      key,
      direction:
        prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const renderSortIcon = key => {
    if (sortBy.key !== key) return null;
    return sortBy.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  /* =========================
     Fetch Orders
  ========================= */
  const getOrders = async () => {
    try {
      setLoading(true);
      const limit = 5;
      const res = await orderApi.getOrdersManage(page, limit);
      setOrders(res.orders);
      setTotal(res.total);
    } catch (err) {
      setAdminLogged(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [page]);

  if (!adminLogged) return <AdminLogin />;

  /* =========================
     Render
  ========================= */
  return (
    <>
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm">
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-bold shadow-md">
                <Plus className="w-4 h-4" />
                Create Order
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat
                title="Total Revenue"
                value="$124,500"
                trend="12% vs last week"
                icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                subIcon={<ArrowUp className="w-3 h-3" />}
              />
              <Stat
                title="Pending Shipment"
                value="14"
                subtitle="Needs attention"
                icon={<Truck className="w-5 h-5 text-secondary" />}
              />
              <Stat
                title="Total Orders"
                value="1,248"
                subtitle="+8 today"
                icon={<ShoppingCart className="w-5 h-5 text-purple-500" />}
              />
              <Stat
                title="Returns"
                value="3"
                subtitle="0.2% return rate"
                icon={<RotateCcw className="w-5 h-5 text-orange-500" />}
              />
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full pl-10 pr-3 py-2.5 border rounded-lg"
                placeholder="Search orders by ID, customer..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-xl overflow-x-scroll">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    {['Order ID', 'Date', 'Customer', 'Total', 'Status'].map(
                      h => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left text-xs font-bold uppercase"
                        >
                          {h}
                        </th>
                      )
                    )}
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {orders.map(o => (
                    <tr
                      key={o.id}
                      className="hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium">#{o.code}</td>
                      <td className="px-6 py-4">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-6 py-4">{o.name}</td>
                      <td className="px-6 py-4 font-medium">
                        ${o.final_amount}
                      </td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={o.status?.at(-1).present} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-primary">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="flex justify-between items-center px-4 py-3 border-t">
                <span className="text-sm text-gray-500">
                  Page {page}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))}>
                    <ChevronLeft />
                  </button>
                  <button onClick={() => setPage(p => p + 1)}>
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================
   Small Stat Card
========================= */
function Stat({ title, value, subtitle, trend, icon, subIcon }) {
  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-500">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {trend && (
        <p className="text-green-600 text-xs flex items-center gap-1">
          {subIcon}
          {trend}
        </p>
      )}
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
