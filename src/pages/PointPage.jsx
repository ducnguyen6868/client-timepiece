import { useEffect, useState } from "react";
import { History, Star, Coins } from "lucide-react";
import { toast } from "react-toastify";
import profileApi from "../api/profileApi";

export default function PointPage() {
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPoint = async () => {
      try {
        setLoading(true);
        const response = await profileApi.profile();
        setPoint(response.point);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getPoint();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-brand font-medium animate-pulse">
        Loading points...
      </div>
    );

  if (!point)
    return (
      <div className="flex justify-center items-center h-screen text-[var(--text-secondary)]">
        No point data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-bg-secondary p-2 md:p-3 xl:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6 border-b border-brand pb-4">
        <div className="flex flex-row items-center gap-3">
          <History className="w-5 h-5 md:w-6 md:h-6 text-brand" />
          <h3 className="text-base md:text-lg font-semibold text-brand">
            Point History
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-bg-primary border border-brand text-brand px-2 py-1 md:px-3 md:py-2 xl:px-4 rounded-full shadow-sm">
          <Coins className="w-4 h-4" />
          <span className="font-semibold text-sm">
            {point.quantity ?? 0} pts
          </span>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {point.history?.length > 0 ? (
          point.history
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-bg-primary rounded-xl border border-brand shadow-sm px-4 py-3 hover:shadow-md transition-all duration-300 animate-fadeIn"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 p-2 rounded-full">
                    <Star
                      className="text-brand"
                      size={18}
                      fill="currentColor"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[var(--text-primary)] text-sm">
                      {item.action}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {formatDate(item.time)} • {formatTime(item.time)}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-sm font-semibold ${
                    item.point > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {item.point > 0
                    ? `+${item.point.toFixed(2)}`
                    : `-${(item.point * -1).toFixed(2)}`}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-[var(--text-muted)] italic mt-6">
            No check-in history yet.
          </p>
        )}
      </div>
    </div>
  );
}
