import { Icon } from '@iconify/react';
import { useEffect } from 'react';

export default function ShowRoom() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <main className="flex-1 flex flex-col font-sans">
                {/* Hero Search Section */}
                <div className="relative bg-[#0f2123] py-12 px-4 sm:px-10 lg:px-40 flex flex-col items-center justify-center overflow-hidden">
                    {/* Background with overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2123]/80 to-[#0f2123]/90 z-10"></div>
                        <div className="w-full h-full bg-cover bg-center opacity-60 grayscale"
                            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWcVP91cQnOLP7SahXkafqA0q1DF0hZMtkLS1NskwHs44l9geRz4pKPqzNNHdQFpEpp7ZLb2cww4ivXUXgISDSbtbSDegk0ZdYC9_btjQaeCCK3j7Uc4urOzuXjzHP4BG1S0hINxzAbvNLP03Ee5sQjVQo29qW2A8DhuAw_MOgaYjDxZeizYlRdwH-OiAlI6RaAS4fU5t54hKKQuK8dE07twei9qy213tFb0x00XyKbNL8IVrzsyHLLLs5DYNmT4rN_rXweJVheyM')` }}></div>
                    </div>
                    <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-6">
                        <div className="space-y-2">
                            <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
                                Hệ thống Cửa hàng
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                                Hơn 50 chi nhánh trên toàn quốc. Tìm cửa hàng gần bạn nhất để trải nghiệm và bảo dưỡng đồng hồ chính hãng.
                            </p>
                        </div>
                        {/* Search Bar */}
                        <div className="w-full max-w-2xl bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-gray-100">
                                <Icon icon="mdi:map-marker" className="text-[#00bcd4] mr-3 text-xl" />
                                <select className="w-full border-none bg-transparent focus:ring-0 text-sm font-medium text-gray-700 cursor-pointer">
                                    <option>Toàn quốc</option>
                                    <option>Hà Nội</option>
                                    <option>TP. Hồ Chí Minh</option>
                                    <option>Đà Nẵng</option>
                                </select>
                            </div>
                            <div className="flex-[2] flex items-center px-4 h-12">
                                <input className="w-full outline-none border-none bg-transparent focus:ring-0 text-sm placeholder:text-gray-400" placeholder="Nhập đường, quận, huyện..." type="text" />
                            </div>
                            <button className="h-12 px-8 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                <span>Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Content Container (Split View) */}
                <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-300px)] min-h-[600px] overflow-hidden">
                    {/* Left Sidebar: List of Stores */}
                    <div className="w-full lg:w-[450px] flex flex-col border-r border-[#e6f3f4] bg-white h-full relative z-10 shadow-lg lg:shadow-none">
                        {/* Filters/Chips */}
                        <div className="p-4 border-b border-[#f0f7f8] bg-white sticky top-0 z-20">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[#0c1b1d] font-semibold">Kết quả tìm kiếm (12)</p>
                                <button className="text-[#00bcd4] text-sm font-medium flex items-center gap-1 hover:underline">
                                    <Icon icon="mdi:crosshairs-gps" className="text-[18px]" />
                                    Gần tôi nhất
                                </button>
                            </div>
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                                <button className="shrink-0 px-4 py-1.5 rounded-full bg-[#00bcd4] text-white text-sm font-semibold transition-colors">Tất cả</button>
                                <button className="shrink-0 px-4 py-1.5 rounded-full bg-[#f0f7f8] hover:bg-[#e0f0f2] text-[#0c1b1d] text-sm font-medium transition-colors">Q.1</button>
                                <button className="shrink-0 px-4 py-1.5 rounded-full bg-[#f0f7f8] hover:bg-[#e0f0f2] text-[#0c1b1d] text-sm font-medium transition-colors">Q.3</button>
                                <button className="shrink-0 px-4 py-1.5 rounded-full bg-[#f0f7f8] hover:bg-[#e0f0f2] text-[#0c1b1d] text-sm font-medium transition-colors">Tân Bình</button>
                                <button className="shrink-0 px-4 py-1.5 rounded-full bg-[#f0f7f8] hover:bg-[#e0f0f2] text-[#0c1b1d] text-sm font-medium transition-colors">Gò Vấp</button>
                            </div>
                        </div>
                        {/* Store List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafb]">
                            {/* Store Item 1 */}
                            <div className="group bg-white rounded-xl p-4 border border-transparent hover:border-[#00bcd4]/30 hover:shadow-md transition-all cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                        <img alt="Timepiece Showroom District 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjBmNb_-e86ang57vctyYILoumA-zx8UxQ6P5JhJ3r5gPGU9MV4ai897o4EVODicH5tU-yGCfWAUpUSdK4BgEm9M-cxbXFWZuqHEj1vnGCLBRLtwwYFsYjuYfSSnPv5YbjPfAZb_o992Xqr_ecISoW5LbtcLhPD17qeVQyUGUuGgOYm-nvvOBoYt-XFwiROHV0sNy32-orbvo5TKc5n5V9T1XUIe9BF912Af9QHB23znhl8wBo03Aa1VSEhJN8tUT-YAng8SI7YYI" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-[#0c1b1d] text-lg leading-tight">Showroom Quận 1</h3>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                                    Đang mở
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
                                                <Icon icon="mdi:map-marker" className="text-[16px] mt-0.5 text-gray-400" />
                                                123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <button className="flex-1 h-8 rounded-md bg-[#00bcd4]/10 hover:bg-[#00bcd4]/20 text-[#00bcd4] text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                <Icon icon="mdi:directions" className="text-[16px]" />
                                                Chỉ đường
                                            </button>
                                            <button className="size-8 rounded-md border border-gray-200 hover:border-[#00bcd4] hover:text-[#00bcd4] flex items-center justify-center transition-colors">
                                                <Icon icon="mdi:phone" className="text-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Store Item 2 */}
                            <div className="group bg-white rounded-xl p-4 border border-transparent hover:border-[#00bcd4]/30 hover:shadow-md transition-all cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                        <img alt="Timepiece Boutique District 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfI0P84hc8P9RItJ4PiHwA5hxEO-dIvMQRC0MATpOnBItCJUdjU4UBVt7CB7SXB5koAQyuBUYgzTAM5lk_vk5qpsUKY2Avf9CHDi0hwMWsfl6r_-OJm7TJk6nRbxFZsw6HNR8x5jYMgdpmD_MM9HQrwjsiSnj6JSQU1o28ELiRU5V-2wiWJeTT7z4lq51mpWJ2cBcc3FBkxcr1Xd8DZtBcr234_4_2T6JieQz2CK5kjQ6hucj-qqrJmQ1AbgeJpTO11CfKJ-tBCSU" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-[#0c1b1d] text-lg leading-tight">Boutique Quận 3</h3>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wide">
                                                    Đóng cửa
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
                                                <Icon icon="mdi:map-marker" className="text-[16px] mt-0.5 text-gray-400" />
                                                456 Hai Bà Trưng, Phường 8, Quận 3, TP.HCM
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <button className="flex-1 h-8 rounded-md bg-[#00bcd4]/10 hover:bg-[#00bcd4]/20 text-[#00bcd4] text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                <Icon icon="mdi:directions" className="text-[16px]" />
                                                Chỉ đường
                                            </button>
                                            <button className="size-8 rounded-md border border-gray-200 hover:border-[#00bcd4] hover:text-[#00bcd4] flex items-center justify-center transition-colors">
                                                <Icon icon="mdi:phone" className="text-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Store Item 3 */}
                            <div className="group bg-white rounded-xl p-4 border border-transparent hover:border-[#00bcd4]/30 hover:shadow-md transition-all cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                        <img alt="Timepiece Center Tan Binh" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmmYALXShzirTG1nGGBpZeQKfs9ZOEXYJ8Zaq_dSB8MoX3oUcFgG0Y4wBnd-svPrCIbPoY2zmjZsg-Jk8JGCueYbw3vPKHD1xxxU5FRaHjromnHDYOYcmvHW2uIVy2LM4nkia2Zi8n7ggVKGn5i0-nq7pXaxEpsLDa_GoNzb5FuhEj77tDIdmHIJgf6tndN4jzJHyLqeOgNzp1hPxRXigI6ei1FygTbslK73ENRyVhiQ84ILZvGxEQsdKIJ5xOxrmlsyPlcqViIrM" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-[#0c1b1d] text-lg leading-tight">Center Tân Bình</h3>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                                    Đang mở
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
                                                <Icon icon="mdi:map-marker" className="text-[16px] mt-0.5 text-gray-400" />
                                                789 Cộng Hòa, Phường 13, Tân Bình, TP.HCM
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <button className="flex-1 h-8 rounded-md bg-[#00bcd4]/10 hover:bg-[#00bcd4]/20 text-[#00bcd4] text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                <Icon icon="mdi:directions" className="text-[16px]" />
                                                Chỉ đường
                                            </button>
                                            <button className="size-8 rounded-md border border-gray-200 hover:border-[#00bcd4] hover:text-[#00bcd4] flex items-center justify-center transition-colors">
                                                <Icon icon="mdi:phone" className="text-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Store Item 4 */}
                            <div className="group bg-white rounded-xl p-4 border border-transparent hover:border-[#00bcd4]/30 hover:shadow-md transition-all cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                        <img alt="Timepiece Go Vap" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArqvQs7K42kYjdlRYI5iMl32q46J2xvojT4Qd0L6C43NChSm84vrB6LxU3AIfqwWQzfEBCgAAR_PN5Chwo4g9mU9abIcizkcoqcwgM2B0TnH-iGHT7fS5NnQCGfbPHQrJ2p0EgemiPS1ygMo_rqasnLt53X9gxtLgK2CY0McMTXh9SUM7qvRBTQJoOTFtJCRuKjwQlg3WiawgW2epHT_qZ7pN4NZJQ7c3gSrhe9WjMocnbjNKnKLuRimb3rto-glFFj004kuCl8hQ" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-[#0c1b1d] text-lg leading-tight">Store Gò Vấp</h3>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                                    Đang mở
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
                                                <Icon icon="mdi:map-marker" className="text-[16px] mt-0.5 text-gray-400" />
                                                10 Quang Trung, Gò Vấp, TP.HCM
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <button className="flex-1 h-8 rounded-md bg-[#00bcd4]/10 hover:bg-[#00bcd4]/20 text-[#00bcd4] text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                <Icon icon="mdi:directions" className="text-[16px]" />
                                                Chỉ đường
                                            </button>
                                            <button className="size-8 rounded-md border border-gray-200 hover:border-[#00bcd4] hover:text-[#00bcd4] flex items-center justify-center transition-colors">
                                                <Icon icon="mdi:phone" className="text-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Side: Map */}
                    <div className="flex-1 relative bg-gray-100 hidden lg:block">
                        {/* Map Image Placeholder */}
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: ` url('https://lh3.googleusercontent.com/aida-public/AB6AXuDb-Z8RVlhfzbqM26Cc7UfrjHu57eNXJPHOU7oizkvYRWrwQFLvI6NdT0WLgvFkpOAbgaSnAyzqlzGzXzNmqP7bngR6MPepMsFatF6a7IQOtF3LLi-H_qleQiE_Sq-NcTiGZbBiKNsDf940Q5qTiNUKBkioTmpOEhjr4MPb5WsBHCGWAHqnXX6XcQQuOBsCWtqrLMwCtbV4mprX3p-4dudMkL3aa8vQApD7Xb4IxmqRT7Dn-ZBN1osJncHO2VDw1HWB2GfiNkL8yV4')` }}>
                        </div>
                        {/* Overlay Map Controls */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 hover:text-[#00bcd4] transition-colors">
                                <Icon icon="mdi:crosshairs-gps" className="text-xl" />
                            </button>
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <button className="size-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-[#00bcd4] transition-colors border-b border-gray-100">
                                    <Icon icon="mdi:plus" className="text-xl" />
                                </button>
                                <button className="size-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-[#00bcd4] transition-colors">
                                    <Icon icon="mdi:minus" className="text-xl" />
                                </button>
                            </div>
                        </div>
                        {/* Fake Map Pin 1 */}
                        <div className="absolute top-[40%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <div className="size-4 bg-[#00bcd4] rounded-full border-2 border-white shadow-lg animate-ping absolute opacity-75"></div>
                                <div className="size-4 bg-[#00bcd4] rounded-full border-2 border-white shadow-lg relative z-10"></div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl p-2 hidden group-hover:block z-20">
                                    <img alt="Store preview" className="w-full h-24 object-cover rounded mb-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPTEWfkZI4u59oezg0KXvgb8ANq3A38E8bQhYM3xTfCeikIgRdFz74SIMv7DY6ELK5v9w3-yGCyB5ZAGKLJ4nnXhDf3g4NjcoePVc5_swKCjBHJmypvhHXahfBaB0Vn3Zg991cdPbsp1xAjIYhBqCVu2pZl6rAGzs7H5nNUv919FdfbOx48wsh_eRiZg5dBf8IHF7Kdep38NtHF80NP447DtRVhqGgTnGsY_h3cxMLfqdYAEClzvXFuKfPYhQ5EHPFX57U_L4V3EI" />
                                    <h4 className="font-bold text-sm">Showroom Quận 1</h4>
                                    <p className="text-xs text-green-600 font-semibold">Đang mở cửa</p>
                                </div>
                            </div>
                        </div>
                        {/* Fake Map Pin 2 */}
                        <div className="absolute top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <Icon icon="mdi:map-marker" className="text-[#00bcd4] text-4xl drop-shadow-md" />
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-0 left-1/2 -translate-x-1/2 w-40 bg-white rounded-lg shadow-xl p-2 hidden group-hover:block z-20 text-center">
                                    <h4 className="font-bold text-sm">Boutique Quận 3</h4>
                                    <p className="text-xs text-gray-500">Đóng cửa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}