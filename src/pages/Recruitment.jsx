import { useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function Recruitment() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <main class="flex-grow font-sans">
                {/* Hero Section */}
                <section class="relative overflow-hidden bg-[#f5f8f8] pt-12 pb-20 lg:pt-20 lg:pb-28">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                            <div class="flex flex-col gap-6 text-center lg:text-left animate-fade-in-up">
                                <div class="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mx-auto lg:mx-0">
                                    <span class="relative flex h-2 w-2">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                                    </span>
                                    Đang tuyển dụng 5 vị trí mới
                                </div>
                                <h1 class="text-4xl font-extrabold tracking-tight text-[#0c1b1d] sm:text-5xl md:text-6xl">
                                    Cùng kiến tạo <br class="hidden lg:block" />
                                    <span class="text-brand">tương lai của thời gian</span>
                                </h1>
                                <p class="mx-auto max-w-3xl text-lg text-[#0c1b1d]/70 lg:mx-0">
                                    Gia nhập đội ngũ Timepiece để cùng nhau tạo nên những giá trị bền vững. Chúng tôi không chỉ bán đồng hồ, chúng tôi lưu giữ khoảnh khắc.
                                </p>
                                <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                    <a class="inline-flex items-center justify-center rounded-xl bg-brand px-8 py-3 text-base font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90 hover:-translate-y-0.5" href="#positions">
                                        Xem vị trí mở
                                    </a>
                                    <a class="inline-flex items-center justify-center rounded-xl bg-white border border-gray-200 px-8 py-3 text-base font-bold text-[#0c1b1d] transition hover:bg-gray-50 hover:border-gray-300" href="#culture">
                                        Về văn hóa
                                    </a>
                                </div>
                            </div>
                            <div class="relative lg:h-auto">
                                <div class="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-2xl rotate-2 hover:rotate-0 transition duration-500 ease-out" data-alt="modern collaborative office space with team working">
                                    <img title='Recuitment' alt="Team working together" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0nEd9lyfEiOJlf8MPg5w5JxkrIQ353amYP24Hg1d8bU02Xdx9Y3NHWx1VSI4XRJEKtr3GHnDXQW0QcLG_w0ifWjxvDSmCElrmddRIFf9ECl9wcsu1GxPAJL1lhcS3ot9Pse_SX1dbcwQg-SDnQb0twKdPU5Y-3spFJmnm3ed4wxzWju1HvRNLACtQnRY4DEjv3B3o43sD5q-AUDEt_tXHfpAw_2quJOOfDQ7jNg9DIfz7yCzWfFkUgGzg7YvZs09rlDgk1Wz9XJk" />
                                </div>
                                {/* Decor elements */}
                                <div class="absolute -bottom-6 -left-6 -z-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl"></div>
                                <div class="absolute -top-6 -right-6 -z-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Values Section */}
                <section class="bg-white py-20" id="culture">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="mb-12 text-center md:mb-16">
                            <h2 class="text-3xl font-bold tracking-tight text-[#0c1b1d] sm:text-4xl">Giá trị cốt lõi</h2>
                            <p class="mt-4 text-lg text-[#0c1b1d]/60">Những nguyên tắc định hình văn hóa làm việc tại Timepiece</p>
                        </div>
                        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Value 1 */}
                            <div class="group relative rounded-2xl border border-gray-100 bg-[#f5f8f8] p-8 transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                                <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand  transition-colors duration-300">
                                    <Icon icon="material-symbols:lightbulb" width="24" height="24" style={{ color: '#00bcd4' }} />                                </div>
                                <h3 class="mb-3 text-xl font-bold text-[#0c1b1d]">Sáng tạo không ngừng</h3>
                                <p class="text-[#0c1b1d]/70">Luôn tìm kiếm giải pháp mới và độc đáo để mang lại trải nghiệm tốt nhất cho khách hàng.</p>
                            </div>
                            {/* Value 2 */}
                            <div class="group relative rounded-2xl border border-gray-100 bg-[#f5f8f8] p-8 transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                                <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand  transition-colors duration-300">
                                    <Icon icon="material-symbols:precision-manufacturing-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />                                </div>
                                <h3 class="mb-3 text-xl font-bold text-[#0c1b1d]">Chính xác tuyệt đối</h3>
                                <p class="text-[#0c1b1d]/70">Như những chiếc đồng hồ chúng tôi bán, sự chính xác và tỉ mỉ là tiêu chuẩn hàng đầu.</p>
                            </div>
                            {/* Value 3 */}
                            <div class="group relative rounded-2xl border border-gray-100 bg-[#f5f8f8] p-8 transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                                <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand  transition-colors duration-300">
                                    <Icon icon="material-symbols:favorite-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />
                                </div>
                                <h3 class="mb-3 text-xl font-bold text-[#0c1b1d]">Cân bằng &amp; Hạnh phúc</h3>
                                <p class="text-[#0c1b1d]/70">Môi trường làm việc linh hoạt, tôn trọng sự cân bằng giữa công việc và cuộc sống cá nhân.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Benefits Section */}
                <section class="bg-[#f5f8f8] py-20">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="grid items-center gap-12 lg:grid-cols-2">
                            <div>
                                <h2 class="text-3xl font-bold tracking-tight text-[#0c1b1d] sm:text-4xl mb-6">Phúc lợi toàn diện</h2>
                                <p class="text-lg text-[#0c1b1d]/60 mb-8">Chúng tôi quan tâm đến sức khỏe, tài chính và sự phát triển của bạn.</p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-green-100 text-green-600">
                                            <Icon icon="material-symbols:payments-outline-rounded" width="24" height="24" style={{ color: '#16a45b' }} />
                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Lương thưởng cạnh tranh</span>
                                    </div>
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                            <Icon icon="material-symbols:medical-information" width="24" height="24" style={{ color: '#2563eb' }} />                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Bảo hiểm sức khỏe Premium</span>
                                    </div>
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                            <Icon icon="material-symbols:laptop-mac-outline" width="24" height="24" style={{ color: '#4b5563' }} />
                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Cung cấp MacBook Pro</span>
                                    </div>
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                            <Icon icon="material-symbols:local-activity" width="24" height="24" style={{ color: '#9333e3' }} />
                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Giảm giá mua hàng 40%</span>
                                    </div>
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                            <Icon icon="material-symbols:flight-takeoff-rounded" width="24" height="24" style={{ color: '#ea580c' }} />
                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Du lịch hàng năm</span>
                                    </div>
                                    <div class="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-brand/20 transition">
                                        <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                                            <Icon icon="material-symbols:school-rounded" width="24" height="24" style={{ color: '#db2777' }} />
                                        </div>
                                        <span class="font-semibold text-[#0c1b1d]">Ngân sách học tập</span>
                                    </div>
                                </div>
                            </div>
                            <div class="relative h-full min-h-[400px]">
                                <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand/20 to-transparent"></div>
                                <div class="grid grid-cols-2 gap-4 h-full">
                                    <div class="space-y-4 pt-8">
                                        <div class="h-48 w-full rounded-xl bg-gray-200 overflow-hidden" data-alt="Office party celebration">
                                            <img alt='Recruitment' title='Recuitment' class="h-full w-full object-cover hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDetZ5hwVs_-g3JJEgn0QF16Zi38tfH6Tgt67pje0NQt2qbxQQfeIlxcshifgTXzDyunkh95Ge7moM_jm8PCSuLmd7UImGIfAnAoCCbFf3sp0JvXCoeR6A9obHdl3WiNd1BaDXEOJqQtWzk6RYoVKil4d_iRWl_L-hXQ-5-pyKQN31pghX8LZDgXrMNd4kmTrffipNmDYEmaw04kuXi3ZaRbuszbUodh5uf-ehRvnvfQtecnr3HLRFppfVE6woYjrO6V3QE7qcaBTA" />
                                        </div>
                                        <div class="h-32 w-full rounded-xl bg-gray-200 overflow-hidden" data-alt="Employee receiving award">
                                            <img alt='Recruitment' title='Recuitment' class="h-full w-full object-cover hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjptDQFTvDC4Q_StWBLwrpUuWPWNbhMPVSaov92cQmCt_M6-a-wIiGkFRGU_sl1KaK2nIi9TbpT_lqpNf6Mt2pvO1kyJeju_94ckiCn6XfTvTr2E-F75mPnc-7dSM_UyXXi_aojJeuVgb0DGZ6ncnznLtca3_DGD8kHmcLrhZL0JLXzaHZFbrcEPU7eLJQ3SvDePH7WrexbLjEmacGCvQO2Zgt43_thnjEnfrYtDwsjP8OJdd480b9YGXjnSiINk6tKG1rKZStJEY" />
                                        </div>
                                    </div>
                                    <div class="space-y-4">
                                        <div class="h-32 w-full rounded-xl bg-gray-200 overflow-hidden" data-alt="Team lunch gathering">
                                            <img alt='Recruitment' title='Recuitment' class="h-full w-full object-cover hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRWU80iX9fsrNeHYkXBJlFxzK4TGucUyIcofkSMZYeZhV3VOPBxB0u0K4wsPRgZRuNSnJ5DkEd22Ga97sEAYs3_na5FgfF1LhObPPk-jhE8fyQiVXAx9BHC60NzIBOHplnH6Cq9wN1R33vtjHtaJfg6U2ptbaIH-0JYB8SyUJE_eMG13E8TVBVaDsHDQe8okR9nAPRkIWdtNTaDeZcoL9SoE9GybesdkVuyETacLS7966QiTTDnL4IC69jYZInCDHu54EqQA4sAfw" />
                                        </div>
                                        <div class="h-48 w-full rounded-xl bg-gray-200 overflow-hidden" data-alt="Modern break room">
                                            <img alt='Recruitment' title='Recuitment' class="h-full w-full object-cover hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-e1DJzMld1aWuMu1tZuLYvNoCuVik3KdjYUOe9IAe7dZjyTLdPTF09GruLlKhS-AV8iRLGJrYbAVclsgEXIUWAfstzFIIx6Lv94YSQbOS3SOVmdsWHNYSzDWHWxWC-QnwpCm4xBhEDmRiB_j0PgTwmIBMnxV10ox0uNKtPftsaS9wl0dyLOPNlG4DasfC28jUHszOQKltmUxbYHVgm9tHfcRHndl_rJGUefTgH5oh9U39ncDKfO_77ltm7G8jWU7Z6GnM6IjpzwU" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Job Listings Section */}
                <section class="bg-white py-24" id="positions">
                    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col items-center justify-between gap-6 md:flex-row mb-12">
                            <div>
                                <h2 class="text-3xl font-bold tracking-tight text-[#0c1b1d]">Vị trí đang tuyển dụng</h2>
                                <p class="mt-2 text-[#0c1b1d]/60">Tìm kiếm cơ hội phù hợp với bạn.</p>
                            </div>
                            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                <button class="whitespace-nowrap rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/20">Tất cả</button>
                                <button class="whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-[#0c1b1d]/70 hover:bg-gray-200 transition">Marketing</button>
                                <button class="whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-[#0c1b1d]/70 hover:bg-gray-200 transition">Công nghệ</button>
                                <button class="whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-[#0c1b1d]/70 hover:bg-gray-200 transition">Bán hàng</button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            {/* Job Item 1 */}
                            <div class="group rounded-2xl border border-[#e6f3f4] bg-[#f5f8f8] p-6 transition-all hover:border-brand/50 hover:bg-white hover:shadow-lg hover:shadow-brand/5">
                                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div class="flex-1">
                                        <div class="mb-2 flex items-center gap-3">
                                            <span class="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">Công nghệ</span>
                                            <span class="flex items-center gap-1 text-xs text-[#0c1b1d]/50">
                                                <Icon icon="material-symbols:nest-clock-farsight-analog-rounded" width="20" height="20" style={{ color: '#0c1b1d/60' }} /> Full-time
                                            </span>
                                        </div>
                                        <h3 class="text-xl font-bold text-[#0c1b1d] group-hover:text-brand transition-colors">Senior Frontend Developer</h3>
                                        <p class="mt-1 text-sm text-[#0c1b1d]/60 line-clamp-2">Phát triển giao diện người dùng cho nền tảng thương mại điện tử Timepiece với ReactJS và Tailwind CSS.</p>
                                    </div>
                                    <div class="flex items-center gap-6">
                                        <div class="flex flex-col items-start md:items-end gap-1">
                                            <span class="flex items-center gap-1 text-sm font-medium text-[#0c1b1d]/70">
                                                <Icon icon="material-symbols:location-on" width="24" height="24"  style={{color: '#0c1b1d/60'}} /> TP. Hồ Chí Minh
                                            </span>
                                            <span class="text-sm font-bold text-brand">$1500 - $2500</span>
                                        </div>
                                        <button class="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-[#0c1b1d]  transition-all">
                                            <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24"  style={{color: '#00bcd4'}} />
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 md:hidden">
                                    <button class="w-full rounded-xl bg-white border border-brand text-brand py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition">Ứng tuyển ngay</button>
                                </div>
                            </div>
                            {/* Job Item 2 */}
                            <div class="group rounded-2xl border border-[#e6f3f4] bg-[#f5f8f8] p-6 transition-all hover:border-brand/50 hover:bg-white hover:shadow-lg hover:shadow-brand/5">
                                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div class="flex-1">
                                        <div class="mb-2 flex items-center gap-3">
                                            <span class="rounded-md bg-pink-100 px-2 py-0.5 text-xs font-bold text-pink-700">Marketing</span>
                                            <span class="flex items-center gap-1 text-xs text-[#0c1b1d]/50">
                                                <Icon icon="material-symbols:nest-clock-farsight-analog-rounded" width="20" height="20" style={{ color: '#0c1b1d/60' }} /> Full-time
                                            </span>
                                        </div>
                                        <h3 class="text-xl font-bold text-[#0c1b1d] group-hover:text-brand transition-colors">Content Creator (Social Media)</h3>
                                        <p class="mt-1 text-sm text-[#0c1b1d]/60 line-clamp-2">Sáng tạo nội dung video ngắn và bài viết cho các kênh TikTok, Facebook của thương hiệu.</p>
                                    </div>
                                    <div class="flex items-center gap-6">
                                        <div class="flex flex-col items-start md:items-end gap-1">
                                            <span class="flex items-center gap-1 text-sm font-medium text-[#0c1b1d]/70">
                                                <Icon icon="material-symbols:location-on" width="24" height="24"  style={{color: '#0c1b1d/60'}} /> Hà Nội
                                            </span>
                                            <span class="text-sm font-bold text-brand">$800 - $1200</span>
                                        </div>
                                        <button class="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-[#0c1b1d]  transition-all">
                                            <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24"  style={{color: '#00bcd4'}} />
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 md:hidden">
                                    <button class="w-full rounded-xl bg-white border border-brand text-brand py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition">Ứng tuyển ngay</button>
                                </div>
                            </div>
                            {/* Job Item 3 */}
                            <div class="group rounded-2xl border border-[#e6f3f4] bg-[#f5f8f8] p-6 transition-all hover:border-brand/50 hover:bg-white hover:shadow-lg hover:shadow-brand/5">
                                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div class="flex-1">
                                        <div class="mb-2 flex items-center gap-3">
                                            <span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">Bán hàng</span>
                                            <span class="flex items-center gap-1 text-xs text-[#0c1b1d]/50">
                                                <Icon icon="material-symbols:nest-clock-farsight-analog-rounded" width="20" height="20" style={{ color: '#0c1b1d/60' }} /> Theo ca
                                            </span>
                                        </div>
                                        <h3 class="text-xl font-bold text-[#0c1b1d] group-hover:text-brand transition-colors">Cửa hàng trưởng (Store Manager)</h3>
                                        <p class="mt-1 text-sm text-[#0c1b1d]/60 line-clamp-2">Quản lý vận hành, đào tạo nhân sự và đảm bảo doanh số tại showroom flagship Quận 1.</p>
                                    </div>
                                    <div class="flex items-center gap-6">
                                        <div class="flex flex-col items-start md:items-end gap-1">
                                            <span class="flex items-center gap-1 text-sm font-medium text-[#0c1b1d]/70">
                                                <Icon icon="material-symbols:location-on" width="24" height="24"  style={{color: '#0c1b1d/60'}} /> TP. Hồ Chí Minh
                                            </span>
                                            <span class="text-sm font-bold text-brand">Thỏa thuận</span>
                                        </div>
                                        <button class="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-[#0c1b1d]  transition-all">
                                            <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24"  style={{color: '#00bcd4'}} />
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 md:hidden">
                                    <button class="w-full rounded-xl bg-white border border-brand text-brand py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition">Ứng tuyển ngay</button>
                                </div>
                            </div>
                            {/* Job Item 4 */}
                            <div class="group rounded-2xl border border-[#e6f3f4] bg-[#f5f8f8] p-6 transition-all hover:border-brand/50 hover:bg-white hover:shadow-lg hover:shadow-brand/5">
                                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div class="flex-1">
                                        <div class="mb-2 flex items-center gap-3">
                                            <span class="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">Công nghệ</span>
                                            <span class="flex items-center gap-1 text-xs text-[#0c1b1d]/50">
                                                <Icon icon="material-symbols:nest-clock-farsight-analog-rounded" width="20" height="20" style={{ color: '#0c1b1d/60' }} /> Full-time
                                            </span>
                                        </div>
                                        <h3 class="text-xl font-bold text-[#0c1b1d] group-hover:text-brand transition-colors">UI/UX Designer</h3>
                                        <p class="mt-1 text-sm text-[#0c1b1d]/60 line-clamp-2">Thiết kế trải nghiệm người dùng tối ưu cho website và ứng dụng mobile.</p>
                                    </div>
                                    <div class="flex items-center gap-6">
                                        <div class="flex flex-col items-start md:items-end gap-1">
                                            <span class="flex items-center gap-1 text-sm font-medium text-[#0c1b1d]/70">
                                                <Icon icon="material-symbols:location-on" width="24" height="24"  style={{color: '#0c1b1d/60'}} /> Remote / Hybrid
                                            </span>
                                            <span class="text-sm font-bold text-brand">$1000 - $1800</span>
                                        </div>
                                        <button class="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-[#0c1b1d]  transition-all">
                                            <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24"  style={{color: '#00bcd4'}} />
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 md:hidden">
                                    <button class="w-full rounded-xl bg-white border border-brand text-brand py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition">Ứng tuyển ngay</button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12 text-center">
                            <p class="text-[#0c1b1d]/60 mb-4">Không tìm thấy vị trí phù hợp?</p>
                            <button class="inline-flex items-center gap-2 text-brand font-bold hover:underline">
                                Gửi CV cho chúng tôi để lưu vào hồ sơ tiềm năng
                                <span class="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                            </button>
                        </div>
                    </div>
                </section>
                {/* Testimonial / CTA Section */}
                <section class="relative bg-[#0f2123] py-20 overflow-hidden">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div class="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                        <div class="mb-8 flex justify-center">
                            <div class="h-20 w-20 rounded-full border-4 border-white/10 bg-gray-300 p-1" data-alt="Employee portrait">
                                <img alt='Recruitment' title='Recuitment' class="h-full w-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Cd16bvxj9qr6jnpM_njeNkY42IaprzWcYdCb5wuC8qGbYIExgXNRHkaIare-YaCSqc5Zrn5XscMVVfh54TID1rnDunOszadplxhOcwPeIyDJjZOEXPFGHU5dJJ9M33_K9BcgbvOPiJrxOoJ_jzlLSM31gMGuRU6yCdBDxbNu_RsBIxX1NUaZ9nY8qIIvpnhzDnkpqH-ZkjeIJ96DIYwKw3YqOqk3wz0BQBD6fadUnvE7PxH4Mf0_0gLavmuZP_oMRTTuUWP6Qcc" />
                            </div>
                        </div>
                        <blockquote class="text-2xl font-medium leading-relaxed text-white md:text-3xl">
                            "Tại Timepiece, mỗi ý tưởng đều được lắng nghe. Đây không chỉ là nơi làm việc, mà là nơi tôi được thử thách bản thân và phát triển mỗi ngày cùng những đồng nghiệp tuyệt vời."
                        </blockquote>
                        <div class="mt-6">
                            <div class="font-bold text-white">Nguyễn Thùy Linh</div>
                            <div class="text-brand/80">Head of Marketing</div>
                        </div>
                        <div class="mt-16 h-px w-full bg-white/10"></div>
                        <div class="mt-12 flex flex-col items-center gap-6">
                            <h2 class="text-3xl font-bold text-white">Sẵn sàng gia nhập đội ngũ?</h2>
                            <button class="h-12 rounded-xl bg-brand px-8 text-base font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 hover:scale-105">
                                Ứng tuyển ngay hôm nay
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}