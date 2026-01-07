import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Feedback() {
  const [formData, setFormData] = useState({
    topic: '',
    details: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã đóng góp ý kiến!');
  };

  const recentContributions = [
    {
      id: 1,
      title: 'Thêm bộ lọc theo kích thước',
      description: 'Giúp người dùng dễ dàng tìm kiếm sản phẩm phù hợp với cổ tay hơn.',
      author: 'Minh Tuấn',
      avatar: 'M',
      time: '2 ngày trước',
      status: 'completed',
      icon: 'mdi:check-circle',
      color: 'green'
    },
    {
      id: 2,
      title: 'Cải thiện tốc độ tải trang',
      description: 'Tối ưu hóa hình ảnh để trải nghiệm mượt mà hơn trên mobile.',
      author: 'Khoa Anh',
      avatar: 'K',
      time: '1 tuần trước',
      status: 'completed',
      icon: 'mdi:speedometer',
      color: 'green'
    },
    {
      id: 3,
      title: 'Dark Mode cho giao diện',
      description: 'Đang phát triển chế độ tối để bảo vệ mắt người dùng ban đêm.',
      author: 'Cộng đồng',
      time: null,
      status: 'in-progress',
      icon: 'mdi:sync',
      color: 'blue',
      progress: 67
    }
  ];

  return (

    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative w-full bg-[#0f2123] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2123] via-[#0f2123]/90 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f2123] z-10"></div>
          <img alt="Background" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCybG3bYPsdLhz8Q9xco4PRv0TlV3rM1uGKJScQDWu32FU5fR7aDtRX9WkWZZrv8wUIvPgzGQ1WqsRj6scFm2s9d0SOilTVlOkspsj6ROjn7Ova7o5n6RbcbbYsRjOX1JsiKlf0guxGi9RlYipFF8S-Hx481S_eRz08GnI66VUO2vJyXVNTMKlh6EomLsGARzJWomM7eoAkypbA-nuPRRQGQwIsR7s5p2qIyC8SUmGz6WSiDUv_VjtytqNYMb9HP80uQnIZE1sFbj0" />
        </div>

        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00bcd4]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen z-0"></div>

        <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 pb-32 lg:pb-48 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col lg:flex-row w-full justify-between items-end gap-12">
            <div className="lg:w-7/12">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Cùng xây dựng <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bcd4] to-[#b2ebf2]">
                  Website tốt hơn!
                </span>
              </h1>
              <p className="text-gray-300 text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8">
                Ý kiến của bạn là mảnh ghép quan trọng giúp chúng tôi hoàn thiện trải nghiệm mua sắm đẳng cấp. Mỗi đóng góp đều được trân trọng.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00bcd4]/20 flex items-center justify-center text-[#00bcd4]">
                    <Icon icon="mdi:star-four-points" className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/60">Features</span>
                    <span className="text-sm text-white font-medium">Đề xuất tính năng</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                    <Icon icon="mdi:bug" className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/60">Fixes</span>
                    <span className="text-sm text-white font-medium">Báo lỗi kỹ thuật</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:w-4/12 relative">
              <div className="relative z-10 w-full aspect-square max-w-[300px] ml-auto">
                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#00bcd4] to-blue-600 rounded-3xl rotate-12 shadow-[0_0_50px_rgba(0,188,212,0.4)] flex items-center justify-center">
                  <Icon icon="mdi:bullhorn" className="text-white text-6xl" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl rotate-[-12deg] flex items-center justify-center border border-white/20">
                  <Icon icon="mdi:lightbulb-on" className="text-[#00bcd4] text-3xl" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <Icon icon="mdi:check" className="text-green-400 text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path className="fill-[#f5f8f8]" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path className="fill-[#f5f8f8]" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path className="fill-[#f5f8f8]" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <div className="relative z-30 max-w-[1440px] mx-auto px-6 lg:px-10 -mt-20 lg:-mt-32">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form */}
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full -z-0 opacity-50"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-[#101818] mb-2">Gửi ý kiến đóng góp</h3>
                <p className="text-gray-500 mb-10">Chia sẻ ý tưởng của bạn để cùng chúng tôi xây dựng cộng đồng tốt hơn.</p>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-bold text-[#101818] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]"></span>
                        Chủ đề đóng góp
                      </label>
                      <div className="relative group/select">
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full h-14 pl-5 pr-12 rounded-2xl border-2 border-gray-100 bg-gray-50 text-base focus:border-[#00bcd4] focus:bg-white focus:ring-0 outline-none appearance-none transition-all cursor-pointer font-medium hover:border-gray-300"
                        >
                          <option value="" disabled>Chọn chủ đề phù hợp...</option>
                          <option value="ux">Trải nghiệm người dùng (UX/UI)</option>
                          <option value="content">Nội dung & Hình ảnh</option>
                          <option value="bug">Báo lỗi kỹ thuật</option>
                          <option value="other">Ý kiến khác</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover/select:text-[#00bcd4] transition-colors">
                          <Icon icon="mdi:chevron-down" className="text-xl" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-bold text-[#101818] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]"></span>
                        Chi tiết ý tưởng
                      </label>
                      <textarea
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full min-h-[180px] p-5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-base placeholder:text-gray-400 focus:border-[#00bcd4] focus:bg-white focus:ring-0 outline-none resize-y transition-all hover:border-gray-300"
                        placeholder="Hãy mô tả chi tiết ý tưởng của bạn..."
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-bold text-[#101818] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        Email liên hệ <span className="normal-case font-normal text-gray-400 ml-auto">(Không bắt buộc)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-base focus:border-[#00bcd4] focus:bg-white focus:ring-0 outline-none transition-all hover:border-gray-300"
                          placeholder="name@example.com"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon icon="mdi:at" className="text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSubmit}
                      className="w-full md:w-auto px-10 h-14 bg-brand hover:bg-brand-hover text-white text-lg font-bold rounded-2xl shadow-xl shadow-gray-200 hover:shadow-[#00bcd4]/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 group/btn"
                    >
                      <span>Gửi đóng góp</span>
                      <Icon icon="mdi:send" className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-5/12 order-1 lg:order-2 lg:pt-16 space-y-8">
            {/* Leaderboard Card */}
            <Link to="/leader-board" className="block group">
              <div className="bg-gradient-to-r from-white to-[#f5f8f8] rounded-3xl p-6 shadow-lg border border-gray-100 hover:border-[#00bcd4]/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -z-0 group-hover:bg-yellow-400/20 transition-colors"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Icon icon="mdi:trophy" className="text-3xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-[#101818] group-hover:text-[#00bcd4] transition-colors">Bảng xếp hạng đóng góp</h4>
                    <p className="text-sm text-gray-500 mt-1">Vinh danh những thành viên tích cực nhất cộng đồng</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#00bcd4] group-hover:translate-x-1 transition-all">
                    <Icon icon="mdi:arrow-right" />
                  </div>
                </div>
              </div>
            </Link>


            {/* Recent Contributions List */}
            {1 === 2 && (
              <>
                {/* Recent Contributions Header */}
                <div className="flex items-center justify-between px-2 pt-2">
                  <div>
                    <h4 className="text-xl font-bold text-[#101818]">Đóng góp gần đây</h4>
                    <p className="text-sm text-gray-500">Cộng đồng đã cùng thực hiện</p>
                  </div>
                  <Link to='/recent-contributions' className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#00bcd4] hover:text-white text-gray-600 flex items-center justify-center transition-all">
                    <Icon icon="mdi:arrow-right" />
                  </Link>
                </div>
                <div className="space-y-5">
                  {recentContributions.map((item) => (
                    <div key={item.id} className="bg-white rounded-[1.5rem] p-5 shadow-lg border border-transparent hover:border-[#00bcd4]/20 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full bg-${item.color}-500 rounded-l-full`}></div>

                      <div className="flex gap-4">
                        <div className={`min-w-[48px] h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon icon={item.icon} className={item.status === 'in-progress' ? 'animate-spin text-xl' : 'text-xl'} />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold text-base text-[#101818] group-hover:text-[#00bcd4] transition-colors mb-1">
                              {item.title}
                            </h5>
                            {item.status === 'in-progress' && (
                              <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide">
                                Dev
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 leading-snug">{item.description}</p>

                          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-2">
                              {item.avatar ? (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                    {item.avatar}
                                  </div>
                                  <span className="text-xs text-gray-500 font-medium">{item.author}</span>
                                </>
                              ) : (
                                <>
                                  <Icon icon="mdi:account-group" className="text-sm text-blue-500" />
                                  <span className="text-xs text-gray-500 font-medium">{item.author}</span>
                                </>
                              )}
                            </div>
                            {item.time ? (
                              <span className="text-xs text-gray-400">{item.time}</span>
                            ) : (
                              <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-blue-500 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>

            )}
            {/* Empty State Card */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[420px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-400/5 to-transparent rounded-tr-full"></div>

              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white rounded-full shadow-sm flex items-center justify-center z-10">
                  <Icon icon="mdi:file-document-plus" className="text-cyan-500 text-5xl" />
                </div>
                <div className="absolute -top-2 right-0 w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-100 shadow-sm z-20">
                  <Icon icon="mdi:lightbulb-on" className="text-yellow-500 text-xl" />
                </div>
                <div className="absolute bottom-0 -left-2 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm z-20">
                  <Icon icon="mdi:lightbulb-outline" className="text-green-500 text-xl" />
                </div>
              </div>

              <h4 className="text-2xl font-bold text-gray-900 mb-3">Chưa có đóng góp nào</h4>
              <p className="text-gray-500 mb-8 max-w-[280px] mx-auto leading-relaxed">
                Hãy là người đầu tiên chia sẻ ý tưởng của bạn! Ý kiến của bạn là động lực để chúng tôi phát triển.
              </p>
              <div className="flex items-center gap-3 text-sm font-bold text-cyan-500 bg-cyan-500/5 px-5 py-2.5 rounded-full border border-cyan-500/10 hover:bg-cyan-500/10 transition-colors cursor-default">
                <Icon icon="mdi:arrow-left" className="hidden lg:block" />
                <Icon icon="mdi:arrow-down" className="block lg:hidden" />
                <span>Điền form để đóng góp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}
