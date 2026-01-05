import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import categoryApi from '../api/categoryApi';
import WatchCard from '../components/common/WatchCard';
import Notification from '../components/common/Notification';
import LoadingAnimations from '../components/common/LoadingAnimations';

export default function CategoryPage() {
    const { slug } = useParams();

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [watches, setWatches] = useState([]);

    const [notification, setNotification] = useState({
        show: false,
        type: '',
        message: ''
    });

   useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await categoryApi.getCategory(slug);
                setCategory(res.category);
                setWatches(res.category.watches || []);
            } catch (err) {
                setNotification({
                    show: true,
                    type: 'error',
                    message: err.response?.data?.message || err.message
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    if (loading) {
        return <LoadingAnimations option="dots_circle" />;
    };

    return (
        <>
            <Notification
                show={notification.show}
                type={notification.type}
                message={notification.message}
                onClose={() =>
                    setNotification((prev) => ({ ...prev, show: false }))
                }
            />
            <div className='p-8'>

                {/* ===== HEADER ===== */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-8 border-b border-border-light">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-text-main text-3xl md:text-4xl font-black tracking-tight">
                            {category?.name}
                        </h1>
                        <p className="text-text-muted max-w-2xl">
                            {category?.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-text-muted text-sm font-medium">
                            Sắp xếp theo:
                        </span>

                        <div className="relative">
                            <select className="appearance-none bg-white border border-border-light rounded-lg pl-4 pr-10 py-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary">
                                <option value="featured">Nổi bật</option>
                                <option value="newest">Mới nhất</option>
                                <option value="price_asc">Giá thấp → cao</option>
                                <option value="price_desc">Giá cao → thấp</option>
                            </select>

                            <ChevronDown
                                size={18}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* ===== FILTER SIDEBAR ===== */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-8">
                        <button className="lg:hidden w-full flex items-center justify-between border rounded-lg p-3 font-bold">
                            Bộ lọc
                            <SlidersHorizontal size={18} />
                        </button>

                        <div className="hidden lg:flex flex-col gap-8">
                            <FilterSection title="Thương hiệu">
                                {['Rolex', 'Omega', 'Seiko', 'Casio'].map((brand) => (
                                    <CheckboxItem key={brand} label={brand} />
                                ))}
                            </FilterSection>

                            <FilterSection title="Chất liệu dây">
                                <CheckboxItem label="Da thật" />
                                <CheckboxItem label="Kim loại" />
                            </FilterSection>

                            <FilterSection title="Bộ máy">
                                <CheckboxItem label="Automatic" />
                                <CheckboxItem label="Quartz" />
                            </FilterSection>
                        </div>
                    </aside>

                    {/* ===== PRODUCT GRID ===== */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {watches.map((watch) => (
                              <WatchCard key={watch._id} watch={watch}/>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

/* ================= COMPONENTS ================= */

function FilterSection({ title, children }) {
    return (
        <details open className="border-t pt-4">
            <summary className="flex justify-between cursor-pointer font-bold">
                {title}
                <ChevronDown size={18} />
            </summary>
            <div className="mt-3 space-y-3">{children}</div>
        </details>
    );
}

function CheckboxItem({ label }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="peer appearance-none size-4 border rounded checked:bg-brand checked:border-brand"
                />
                <Check
                    size={12}
                    className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
                />
            </div>
            <span className="text-sm text-text-muted">{label}</span>
        </label>
    );
}

