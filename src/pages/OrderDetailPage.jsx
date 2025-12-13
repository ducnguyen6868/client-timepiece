import { ShoppingCart, Truck, MapPin, Tag, Package, MoveRight } from 'lucide-react';
import { Link , useLocation } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

// Main Component: Order Details Content
export default function OrderDetailPage() {
  const location = useLocation();
  const order =location.state||{};

  if(!order.code){
    return(
      <p>Order not found...</p>
    );
  };

  return (
      <div className="bg-white dark:bg-gray-900 w-full p-6 space-y-2 md:space-y-4 xl:space-y-6 animate-fadeIn" >
        {/* Header */}
        <header className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="text-xl xl:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <ShoppingCart className="w-6 h-6 text-teal-600" />
              Order Details
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span>
                Code: <span className="font-mono font-semibold text-teal-700 dark:text-teal-400">{order.code}  </span>
              </span>
              <span>
                {formatDate(order?.createdAt)} - {formatTime(order?.createdAt)}
              </span>
            </p>
          </div>
        </header>

        {/* Shipping Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
          <InfoBox
            title="Shipping Address"
            icon={<MapPin className="w-5 h-5 text-teal-600" />}
          >
            <p className="font-semibold text-gray-800 dark:text-gray-200">{order.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {order.address}
            </p>
          </InfoBox>

          <InfoBox
            title="Shipping Info"
            icon={<Truck className="w-5 h-5 text-teal-600" />}
          >

            <div className="mt-3 border-t pt-3 space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Order Timeline:
              </p>
              {order?.status?.map((item, i) => (
                <div key={i} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                  <MoveRight className="w-3 h-3 mt-1 mr-2 text-teal-500 flex-shrink-0" />
                  <span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.present}</span>{" "}
                    <span className="text-gray-400">({formatDate(item.time)})</span>
                  </span>
                </div>
              ))}
            </div>
          </InfoBox>
        </section>

        {/* Items */}
        <section>
          <h3 className="text-lg font-bold flex items-center gap-2 border-t pt-4 text-gray-900 dark:text-white">
            <Package className="w-5 h-5 text-teal-600" />
            Items Ordered ({order?.watches?.length})
          </h3>
          <div className="space-y-3 mt-3">
            {order?.watches?.map((watch, index) => (
              <div
                key={index}
                className="flex items-center flex-wrap border border-gray-100 dark:border-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={watch.thumbnail}
                  alt={watch.name}
                  onError={
                    (e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Watch";
                    }}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-700 mr-4"
                />
                <div className="flex-1">
                  <Link to={`/watch/${watch.slug}`} className="font-semibold text-gray-900 dark:text-white">{watch?.name}</Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    x{watch?.quantity} {watch.material} - {watch.strapType} - {watch.color} 
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 border-t pt-2 md:pt-4">
          <InfoBox title="Payment Info" icon={<Tag className="w-5 h-5 text-teal-600" />}>
            <p className="text-gray-700 dark:text-gray-300">
              Method: <span className="font-semibold">{order?.paymentMethod} - {order?.payment}</span>
            </p>
          </InfoBox>
          <div className="space-y-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Summary</h4>
            <SummaryRow label={`Subtotal (${order?.watches?.length} items)`} value={`$${order?.final_amount?.toFixed(2)}`} />

            <SummaryRow
              label="ORDER TOTAL"
              value={`$${order?.final_amount?.toFixed(2)}`}
              large
              highlight
            />
          </div>
        </section>
      </div>
  );
}


const InfoBox = ({ title, icon, children }) => (
  <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const SummaryRow = ({ label, value, highlight, large }) => (
  <div
    className={`flex justify-between ${large ? "text-lg font-bold border-t pt-2 mt-2" : "text-sm"
      } ${highlight ? "text-green-600 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

