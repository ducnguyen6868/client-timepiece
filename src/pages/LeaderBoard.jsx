import { Icon } from '@iconify/react';
import { useEffect } from 'react';

export default function LeaderBoard() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <main className="min-h-screen pb-20">
                <section className="relative bg-gradient-to-br from-[#0f2123] to-[#1a3a3e] overflow-hidden text-white pt-12 pb-24 clip-path-slant">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: `radial-gradient(#00bcd4 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px]"></div>
                    <div className="absolute left-10 bottom-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Vinh danh <span className="text-cyan-400">Contributors</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mb-12">
                            Cùng tôn vinh những thành viên tích cực đã đóng góp ý tưởng tuyệt vời giúp WatchStore ngày càng hoàn thiện hơn.
                        </p>
                    </div>
                </section>
                <section className="relative max-w-[1440px] mx-auto px-6 lg:px-10 -mt-16 z-20">
                    <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-8 pb-12">
                        <div className="order-2 md:order-1 w-full md:w-1/3 max-w-[320px] relative group cursor-pointer">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-gray-400 to-transparent rounded-[2.5rem] opacity-30 blur-sm group-hover:opacity-60 transition duration-500"></div>
                            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl text-center relative overflow-hidden h-full flex flex-col justify-end min-h-[380px] hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border-4 border-white shadow-sm">2</div>
                                <div className="mt-8 mb-4 relative mx-auto w-24 h-24">
                                    <div className="absolute inset-0 rounded-full border-4 border-gray-400 p-1">
                                        <img alt="Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCybG3bYPsdLhz8Q9xco4PRv0TlV3rM1uGKJScQDWu32FU5fR7aDtRX9WkWZZrv8wUIvPgzGQ1WqsRj6scFm2s9d0SOilTVlOkspsj6ROjn7Ova7o5n6RbcbbYsRjOX1JsiKlf0guxGi9RlYipFF8S-Hx481S_eRz08GnI66VUO2vJyXVNTMKlh6EomLsGARzJWomM7eoAkypbA-nuPRRQGQwIsR7s5p2qIyC8SUmGz6WSiDUv_VjtytqNYMb9HP80uQnIZE1sFbj0" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white shadow-sm">
                                        <Icon icon="mdi:star" className="text-lg" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#101818] mb-1">Hoàng Nam</h3>
                                <p className="text-sm text-gray-500 mb-4">Silver Contributor</p>
                                <div className="flex justify-center items-center gap-4 bg-gray-50 rounded-xl p-3 mb-2">
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-[#101818]">15</span>
                                        <span className="text-[10px] uppercase text-gray-400 font-bold">Ideas</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-cyan-500">850</span>
                                        <span className="text-[10px] uppercase text-gray-400 font-bold">Points</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 w-full md:w-1/3 max-w-[360px] relative group cursor-pointer z-10 -mt-12 md:-mt-24">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-yellow-400 to-transparent rounded-[2.5rem] opacity-40 blur-md group-hover:opacity-70 transition duration-500"></div>
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl text-center relative overflow-hidden h-full flex flex-col justify-end min-h-[440px] border-2 border-yellow-400/20 hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center text-4xl font-bold text-yellow-500 border-4 border-white shadow-sm">1</div>
                                <div className="mt-12 mb-6 relative mx-auto w-32 h-32">
                                    <div className="absolute inset-0 rounded-full border-4 border-yellow-400 p-1 shadow-lg shadow-yellow-400/20">
                                        <img alt="Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv5nK5yr5s0yzwKxmUZoe9q8BmyX_Hfsa7cbLxHphq2_5p1jvGEIGhE74qmq0w6NqTE0a3WWYGPuZLYK2xROm_ZDAL8Wf24A0DTeEGO8MqbqsSQ_WjbxJoQHrNsyU0Qqr8xLVryGqrdSwFkO4IoMB0kEXcZqwAw_yvQ0qDFmAcHVlFbTox1Qszw3NlFzPjteBqV4np4BWtXiGrSdhRuf9pgWdsdCYB2fCJKxRrAaaVxCXqxOWWxM_NikrJIY7hHyoWTBDMk7tUL_I" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                                        <Icon icon="mdi:trophy" className="text-xl" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#101818] mb-1">Minh Tuấn</h3>
                                <p className="text-sm text-yellow-500 font-bold uppercase tracking-wider mb-6">Legendary Contributor</p>
                                <div className="flex justify-center items-center gap-6 bg-yellow-50/50 rounded-2xl p-4 mb-2 border border-yellow-100">
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-[#101818]">28</span>
                                        <span className="text-xs uppercase text-gray-500 font-bold">Ideas</span>
                                    </div>
                                    <div className="w-px h-10 bg-yellow-200"></div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-cyan-500">1,240</span>
                                        <span className="text-xs uppercase text-gray-500 font-bold">Points</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-3 w-full md:w-1/3 max-w-[320px] relative group cursor-pointer">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-orange-600 to-transparent rounded-[2.5rem] opacity-30 blur-sm group-hover:opacity-60 transition duration-500"></div>
                            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl text-center relative overflow-hidden h-full flex flex-col justify-end min-h-[340px] hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600 border-4 border-white shadow-sm">3</div>
                                <div className="mt-8 mb-4 relative mx-auto w-24 h-24">
                                    <div className="absolute inset-0 rounded-full border-4 border-orange-600 p-1">
                                        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">T</div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-sm">
                                        <Icon icon="mdi:thumb-up" className="text-lg" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#101818] mb-1">Thảo Linh</h3>
                                <p className="text-sm text-gray-500 mb-4">Bronze Contributor</p>
                                <div className="flex justify-center items-center gap-4 bg-gray-50 rounded-xl p-3 mb-2">
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-[#101818]">12</span>
                                        <span className="text-[10px] uppercase text-gray-400 font-bold">Ideas</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-cyan-500">620</span>
                                        <span className="text-[10px] uppercase text-gray-400 font-bold">Points</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1024px] mx-auto px-6 lg:px-10 pb-20">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                            <h3 className="text-2xl font-bold text-[#101818]">Xếp hạng thành viên</h3>
                            <div className="relative">
                                <input className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-cyan-500 focus:ring-0 w-full md:w-64 transition-all" placeholder="Tìm kiếm thành viên..." type="text" />
                                <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                        </div>
                        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            <div className="col-span-1 text-center">Hạng</div>
                            <div className="col-span-5">Thành viên</div>
                            <div className="col-span-2 text-center">Cấp độ</div>
                            <div className="col-span-2 text-center">Đóng góp</div>
                            <div className="col-span-2 text-right pr-4">Điểm số</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            <div className="group hover:bg-cyan-500/5 transition-colors duration-200 p-4 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="flex items-center justify-between md:contents">
                                    <div className="md:col-span-1 text-center font-bold text-gray-400 text-lg md:text-base">04</div>
                                    <div className="md:col-span-5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">D</div>
                                        <div>
                                            <h4 className="font-bold text-[#101818]">Duy Khánh</h4>
                                            <p className="text-xs text-gray-500 md:hidden">Newbie • 5 Đóng góp</p>
                                        </div>
                                    </div>
                                    <div className="md:hidden font-bold text-cyan-500">450 pts</div>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">Newbie</span>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center text-gray-600 font-medium">5</div>
                                <div className="hidden md:block md:col-span-2 text-right pr-4 font-bold text-cyan-500">450</div>
                            </div>
                            <div className="group hover:bg-cyan-500/5 transition-colors duration-200 p-4 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="flex items-center justify-between md:contents">
                                    <div className="md:col-span-1 text-center font-bold text-gray-400 text-lg md:text-base">05</div>
                                    <div className="md:col-span-5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                            <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWFzR_IPjtxkkJIsiYSsSVlNjlGf4asJfBkZ5C9N14PJaDvj05mG5KfLF6iPmXSO0Ecr081dbX_tbZ1rTH7_uiIr492U9cbahnlzAfiKsbucJo6QJEMASFelsy27-9klvto0N3a_zLJn3i_MMytTBCYqlKv-JgtCxwXOytaL9rbOKPjaXJ5zz5T8eY26y0czfTsfCVTjZ9AaGgerBte2cdzMe8A4fCGYKNUsm5ctDoXKU52u0gxeJWWMBIH-lK3ZosGTkpUerdNdQ" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#101818]">Ngọc Mai</h4>
                                            <p className="text-xs text-gray-500 md:hidden">Contributor • 4 Đóng góp</p>
                                        </div>
                                    </div>
                                    <div className="md:hidden font-bold text-cyan-500">380 pts</div>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center">
                                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">Contributor</span>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center text-gray-600 font-medium">4</div>
                                <div className="hidden md:block md:col-span-2 text-right pr-4 font-bold text-cyan-500">380</div>
                            </div>
                            <div className="group hover:bg-cyan-500/5 transition-colors duration-200 p-4 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="flex items-center justify-between md:contents">
                                    <div className="md:col-span-1 text-center font-bold text-gray-400 text-lg md:text-base">06</div>
                                    <div className="md:col-span-5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">H</div>
                                        <div>
                                            <h4 className="font-bold text-[#101818]">Hải Yến</h4>
                                            <p className="text-xs text-gray-500 md:hidden">Newbie • 3 Đóng góp</p>
                                        </div>
                                    </div>
                                    <div className="md:hidden font-bold text-cyan-500">210 pts</div>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">Newbie</span>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center text-gray-600 font-medium">3</div>
                                <div className="hidden md:block md:col-span-2 text-right pr-4 font-bold text-cyan-500">210</div>
                            </div>
                            <div className="group hover:bg-cyan-500/5 transition-colors duration-200 p-4 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="flex items-center justify-between md:contents">
                                    <div className="md:col-span-1 text-center font-bold text-gray-400 text-lg md:text-base">07</div>
                                    <div className="md:col-span-5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">Q</div>
                                        <div>
                                            <h4 className="font-bold text-[#101818]">Quang Huy</h4>
                                            <p className="text-xs text-gray-500 md:hidden">Newbie • 2 Đóng góp</p>
                                        </div>
                                    </div>
                                    <div className="md:hidden font-bold text-cyan-500">150 pts</div>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">Newbie</span>
                                </div>
                                <div className="hidden md:block md:col-span-2 text-center text-gray-600 font-medium">2</div>
                                <div className="hidden md:block md:col-span-2 text-right pr-4 font-bold text-cyan-500">150</div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/50">
                            <button className="px-4 py-2 text-gray-500 hover:text-cyan-500 transition-colors text-sm font-medium">Xem thêm</button>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-20">
                    <div className="bg-[#101818] rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
                        </div>
                        <div className="relative z-10 md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                                <Icon icon="mdi:gift" className="text-sm" />
                                Reward System
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Tích điểm đổi quà</h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-md">
                                Mỗi đóng góp được chấp nhận sẽ mang về cho bạn điểm thưởng. Dùng điểm để đổi voucher giảm giá và quà tặng độc quyền.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                                        <Icon icon="mdi:star-four-points" className="text-xl" />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold">1 idea</span>
                                        <span className="text-xs text-gray-400">+50 points</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Icon icon="mdi:check-circle" className="text-xl" />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold">Accepted</span>
                                        <span className="text-xs text-gray-400">+100 points</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 md:w-5/12 flex justify-center">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 w-full max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-white font-bold text-lg">Phần thưởng tháng</span>
                                    <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded-lg">Mới</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-[#0f2123] p-3 rounded-xl border border-white/5">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
                                            <Icon icon="mdi:ticket-percent" className="text-cyan-500 text-2xl" />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold">Voucher 500k</h5>
                                            <p className="text-xs text-gray-400">Cần 1000 points</p>
                                        </div>
                                        <button className="ml-auto px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-lg text-xs font-bold transition-colors">Đổi</button>
                                    </div>
                                    <div className="flex items-center gap-4 bg-[#0f2123] p-3 rounded-xl border border-white/5">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
                                            <Icon icon="mdi:watch" className="text-cyan-500 text-2xl" />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold">Dây da cao cấp</h5>
                                            <p className="text-xs text-gray-400">Cần 2500 points</p>
                                        </div>
                                        <button className="ml-auto px-3 py-1.5 bg-gray-700 text-gray-400 rounded-lg text-xs font-bold cursor-not-allowed">Đổi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}