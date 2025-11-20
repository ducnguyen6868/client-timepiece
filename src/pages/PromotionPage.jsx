import { useState, useEffect } from "react";
import { Calendar, Search } from "lucide-react";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import promotionApi from "../api/promotionApi";

export default function PromotionPage() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const getPromotion = async () => {
      try {
        const response = await promotionApi.getPromotion();
        setPromotions(response.promotions);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    getPromotion();
  }, []);

  return (
    <div className="min-h-screen bg-bg-secondary md:px-3 xl:px-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center gap-2 mb-4">
        <span className="text-brand hidden md:inline font-medium mb-2">
          Find a new promotion ?
        </span>

        {/* Search bar */}
        <div className="flex items-center relative flex-1 max-w-md w-full">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter promotion code..."
            className="flex-1 outline-none border border-[var(--input-border)] bg-[var(--input-bg)] rounded-[10px] py-2 px-4 pr-10 text-text-primary text-sm transition-all duration-300 focus:border-brand focus:shadow-[0_0_6px_var(--brand-color)]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] cursor-pointer hover:text-brand transition-colors duration-200" />
        </div>

      {/* Filter */}
      <select
        name="promotion-type"
        className="w-[150px] px-3 py-2 border border-[var(--input-border)] rounded-[10px] text-text-primary bg-[var(--input-bg)] text-sm transition-all duration-300 focus:border-brand focus:shadow-[0_0_6px_var(--brand-color)]"
      >
        <option value="All">All</option>
        <option value="used">Used</option>
        <option value="not used">Not Used</option>
        <option value="expired">Expired</option>
      </select>
      </div>

      {/* Promotions grid */}
      <div className="grid gap-5 mx-auto grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {promotions.map((promotion) => (
          <div
            key={promotion._id}
            className="flex bg-[var(--bg-primary)] rounded-xl shadow-sm border border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg"
          >
            {/* Left Side */}
            <div className="relative w-[140px] bg-brand text-[var(--announcement-text)] text-center">
              <img
                src={`${process.env.REACT_APP_API_URL}` + `/${promotion.image}`}
                alt="Promotion"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Răng cưa */}
              <div className="absolute top-0 left-[-3px] bottom-0 w-2 flex flex-col justify-around">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="block w-[10px] h-[10px] bg-bg-secondary rounded-full my-[3px]"
                  />
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-between flex-1 p-4 gap-1">
              <div>
                <h3 className="text-base font-semibold text-text-primary">
                  {promotion.title}
                </h3>
                <p className="text-[13px] text-text-secondary">
                  {promotion.subtitle}
                </p>
              </div>

              <span className="text-[12px] font-semibold text-brand border border-dashed border-brand px-2 py-1 rounded bg-[var(--bg-tertiary)] w-max">
                {promotion.code}
              </span>

              <div className="flex items-center text-[12px] text-[var(--text-muted)] gap-1 mt-1">
                <Calendar className="w-[14px] h-[14px] text-[var(--brand-color)]" />
                <span>Expires on: {formatDate(promotion.end)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
