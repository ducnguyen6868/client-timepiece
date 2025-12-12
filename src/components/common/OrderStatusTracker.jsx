import { useState, useEffect } from "react";
import {Package,Truck,CheckCircle, Clock, MapPin, ChevronRight,  XCircle,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { toast } from "react-toastify";
import orderApi from "../../api/orderApi";

export default function OrderStatusTracker({ order, onClose, onChange }) {
    const [orderStatus, setOrderStatus] = useState("");
    const statusPresent = order?.status?.at(-1)?.present;

    useEffect(() => {
        setOrderStatus(statusPresent);
    }, [statusPresent]);

    let statuses = [
        {
            id: "Order Placed",
            label: "Order Placed",
            icon: CheckCircle,
            description: "Customer order successfully.",
        },
        {
            id: "Processing",
            label: "Processing",
            icon: Package,
            description: "Preparing customer items.",
        },
        {
            id: "Shipping",
            label: "Shipping",
            icon: Truck,
            description: "On the way to customer",
        },
        {
            id: "Delivered Successfully",
            label: "Delivered",
            icon: MapPin,
            description: "Order completed",
        },
        {
            id: "Canceled",
            label: "Canceled",
            icon: XCircle,
            description: "Order has been canceled",
        },
    ];

    statuses = statuses.map((item, index) => ({
        ...item,
        time: order?.status?.[index]?.time || "",
    }));

    const statusIndex = statuses.findIndex((s) => s.id === orderStatus);
    const isCanceled = orderStatus === "Canceled";

    const handleSubmitStatus = async () => {
        const orderId = order._id;
        const status = statuses[statusIndex + 1]?.id;
        try {
            const response = await orderApi.patchStatus(orderId, status);
            toast.success(response.message);
            onChange?.();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            onClose?.();
        }
    };

    return (
        <div className="min-w-[500px] flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 w-full mx-auto">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Order Status
            </h2>

            {isCanceled ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="relative">
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100">
                            <XCircle size={64} color="#f50404ff" />
                        </div>
                        <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-red-600 mt-4">
                        Order Canceled
                    </h3>
                    <p className="text-gray-500 mt-2">This order has been canceled.</p>
                </div>
            ) : (
                <div className="relative w-max">
                    {/* Timeline */}
                    <div className="flex justify-between gap-4 items-center w-max">
                        {statuses.slice(0, 4).map((status, index) => {
                            const Icon = status.icon;
                            const isActive = index === statusIndex;
                            const isCompleted = index < statusIndex;
                            const isUpcoming = index > statusIndex;

                            return (
                                <>
                                    <div key={status.id} className="flex flex-col items-center relative">
                                        <h3
                                            className={`font-medium ${isUpcoming
                                                ? "text-gray-400"
                                                : "text-gray-800 dark:text-gray-200"
                                                }`}
                                        >
                                            {status.label}
                                        </h3>
                                        {/* Status Icon */}
                                        <div
                                            className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${isCompleted
                                                ? "border-teal-500 bg-teal-500 text-white"
                                                : isActive
                                                    ? "border-teal-400 bg-teal-100 text-teal-600"
                                                    : "border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-400"
                                                }`}
                                        >
                                            <Icon size={24} />
                                            {isCompleted && (
                                                <CheckCircle
                                                    size={18}
                                                    className="absolute -bottom-1 -right-1 text-green-400 bg-white rounded-full"
                                                />
                                            )}
                                            {isActive && (
                                                <div className="absolute inset-0 animate-ping rounded-full bg-teal-300 opacity-40"></div>
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className="text-center mt-2 w-max">

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {status.description}
                                            </p>
                                            <p className="text-xs mt-1 text-teal-600 dark:text-teal-400 font-semibold">
                                                {status.time ? formatDate(status.time) : ""}
                                            </p>
                                        </div>
                                        {isActive && (
                                            <span className="inline-flex items-center gap-1 text-xs mt-1 text-teal-500 font-semibold absolute top-28">
                                                <Clock size={14} /> In Progress
                                            </span>
                                        )}
                                    </div>
                                    {/* Connector line */}
                                    {index < 3 && (
                                        <div
                                            className={`w-12 h-[1px]  rounded-full ${index < statusIndex
                                                ? "bg-teal-500"
                                                : "bg-gray-200 dark:bg-gray-700"
                                                } transition-all duration-500`}
                                        ></div>
                                    )}
                                </>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Footer buttons */}
            {!isCanceled && statusIndex < 3 && (
                <button
                    onClick={handleSubmitStatus}
                    className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-teal-500 text-white font-medium rounded-md shadow hover:bg-teal-600 active:scale-95 transition-all duration-300"
                >
                    {statuses[statusIndex + 1].label}
                    <ChevronRight size={16} />
                </button>
            )}
        </div>
    );
}
