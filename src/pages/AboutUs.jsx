import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AboutUs() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <main>
                <div className="relative flex w-full flex-col bg-[#ffffff] font-sans">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div className="@container">
                                    <div className="@[480px]:p-4">
                                        <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-8 shadow-xl" data-alt="Close up of internal mechanical watch movement in dark lighting" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwtGo0N8gE5pTKu4dFER6yQULgMMxapqDdTLBYzQm__E06r0T0ceqPMmhhUgb91kBR_FAUwt2PsmXp9KTeIMulcHvOAJEoMeIp0a4P0xzzDehTmUOgTx6oGn5d0t4R0CMP3e5XfqCv5Xm0L2ksentXVtjEO2vp39vJWupEnOJPBmWG5PiL5YUYzPkYrs-m4BXok4cliwDNU6FExdVWtMa9-gx7fSv6FpceRPYTtd0iZ8EuNLHbCHoJYKLZpqiU42_nfFLCigN75ro")' }}>
                                            <div className="flex flex-col gap-3 text-center max-w-[700px]">
                                                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl drop-shadow-lg">
                                                    Câu chuyện của chúng tôi
                                                </h1>
                                                <h2 className="text-white text-base font-medium leading-relaxed @[480px]:text-xl mt-2 drop-shadow-md">
                                                    Định nghĩa lại thời gian và phong cách qua từng chuyển động tinh xảo.
                                                </h2>
                                            </div>
                                            <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-brand hover:bg-brand-dark transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg mt-4 border border-white/20">
                                                <span className="truncate">Khám phá ngay</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col bg-[#ffffff]">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div className="flex flex-col gap-10 px-4 py-10 @container">
                                    <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
                                        <div className="flex flex-col gap-4 flex-1">
                                            <h1 className="text-text-main tracking-light text-[32px] font-bold leading-tight md:text-4xl">
                                                Sứ mệnh &amp; Tầm nhìn
                                            </h1>
                                            <p className="text-text-muted text-base font-normal leading-relaxed max-w-[600px]">
                                                Tại WatchStore, chúng tôi tin rằng đồng hồ không chỉ là công cụ đo thời gian mà còn là biểu tượng của cá tính và di sản. Sứ mệnh của chúng tôi là mang đến những kiệt tác cơ khí kết hợp giữa nghệ thuật truyền thống và công nghệ hiện đại.
                                            </p>
                                            <div className="flex items-center gap-2 text-brand font-bold mt-2 cursor-pointer group">
                                                <span>Tìm hiểu thêm về triết lý</span>
                                                <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                        <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-brand shadow-sm hover:shadow-md transition-all">
                                            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-2">
                                                <Icon icon="material-symbols:precision-manufacturing-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />                                            </div>
                                            <div>
                                                <p className="text-text-main text-xl font-bold leading-normal mb-2">Sự chính xác</p>
                                                <p className="text-text-muted text-sm font-normal leading-relaxed">Mỗi chiếc đồng hồ đều trải qua quy trình kiểm định nghiêm ngặt 500 giờ để đảm bảo độ chính xác tuyệt đối.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-brand shadow-sm hover:shadow-md transition-all">
                                            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-2">
                                                <Icon icon="material-symbols:history-edu-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />                                            </div>
                                            <div>
                                                <p className="text-text-main text-xl font-bold leading-normal mb-2">Di sản</p>
                                                <p className="text-text-muted text-sm font-normal leading-relaxed">Kế thừa tinh hoa chế tác đồng hồ Thụy Sĩ hàng trăm năm, kết hợp với thẩm mỹ đương đại.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-brand shadow-sm hover:shadow-md transition-all">
                                            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-2">
                                                <Icon icon="material-symbols:lightbulb" width="24" height="24" style={{ color: '#00bcd4' }} />                                            </div>
                                            <div>
                                                <p className="text-text-main text-xl font-bold leading-normal mb-2">Đổi mới</p>
                                                <p className="text-text-muted text-sm font-normal leading-relaxed">Không ngừng sáng tạo về vật liệu và bộ máy để luôn dẫn đầu xu hướng thời gian.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col bg-[#f3f4f6]">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <h2 className="text-text-main text-3xl font-bold mb-10 text-center px-4">Hành trình phát triển</h2>
                                <div className="grid grid-cols-[60px_1fr] gap-x-4 px-4 md:px-20">
                                    <div className="flex flex-col items-center gap-1 pt-3">
                                        <div className="p-2 flex items-center justify-center text-white  border-2 border-brand rounded-full shadow-[0_0_10px_rgba(0,188,212,0.4)]">
                                            <Icon icon="material-symbols:flag-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />                                        </div>
                                        <div className="w-[2px] bg-brand h-full grow min-h-[80px]"></div>
                                    </div>
                                    <div className="flex flex-1 flex-col pt-3 pb-10">
                                        <span className="text-brand font-bold text-sm">2018</span>
                                        <h3 className="text-text-main text-xl font-bold leading-normal mb-2">Khởi đầu khiêm tốn</h3>
                                        <p className="text-text-muted text-sm">Cửa hàng đầu tiên được mở tại Hà Nội với niềm đam mê cháy bỏng về những cỗ máy thời gian.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-[2px] bg-brand h-4"></div>
                                        <div className="p-2 flex items-center justify-center bg-white border-2 border-brand text-brand rounded-full">
                                            <Icon icon="material-symbols:aod-watch" width="24" height="24" style={{ color: '#00bcd4' }} />
                                        </div>
                                        <div className="w-[2px] bg-brand h-full grow min-h-[80px]"></div>
                                    </div>
                                    <div className="flex flex-1 flex-col pt-3 pb-10">
                                        <span className="text-brand font-bold text-sm">2019</span>
                                        <h3 className="text-text-main text-xl font-bold leading-normal mb-2">Bộ sưu tập Signature</h3>
                                        <p className="text-text-muted text-sm">Ra mắt dòng sản phẩm thiết kế độc quyền đầu tiên, nhận được sự đón nhận nồng nhiệt từ cộng đồng.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-[2px] bg-brand h-4"></div>
                                        <div className="p-2 flex items-center justify-center bg-white border-2 border-brand text-brand rounded-full">
                                            <Icon icon="material-symbols:public" width="24" height="24" style={{ color: '#00bcd4' }} />
                                        </div>
                                        <div className="w-[2px] bg-brand h-full grow min-h-[80px]"></div>
                                    </div>
                                    <div className="flex flex-1 flex-col pt-3 pb-10">
                                        <span className="text-brand font-bold text-sm">2021</span>
                                        <h3 className="text-text-main text-xl font-bold leading-normal mb-2">Vươn ra thế giới</h3>
                                        <p className="text-text-muted text-sm">Mở rộng thị trường sang Đông Nam Á, khẳng định vị thế thương hiệu quốc tế.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 pb-3">
                                        <div className="w-[2px] bg-brand h-4"></div>
                                        <div className="p-2 flex items-center justify-center text-white border-2 border-brand rounded-full shadow-[0_0_10px_rgba(0,188,212,0.4)]">
                                            <Icon icon="material-symbols:award-star-rounded" width="24" height="24" style={{ color: '#00bcd4' }} />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col pt-3 pb-5">
                                        <span className="text-brand font-bold text-sm">2023 - Nay</span>
                                        <h3 className="text-text-main text-xl font-bold leading-normal mb-2">Kỷ nguyên công nghệ</h3>
                                        <p className="text-text-muted text-sm">Tích hợp công nghệ thông minh vào thiết kế cổ điển, mở ra chương mới cho WatchStore.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col bg-[#ffffff]">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div className="flex flex-col gap-8 px-4">
                                    <div className="text-center mb-4">
                                        <h2 className="text-text-main text-3xl font-bold mb-3">Đội ngũ chuyên gia</h2>
                                        <p className="text-text-muted">Những nghệ nhân đằng sau sự hoàn hảo.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-background-off transition-all">
                                            <div className="size-32 rounded-full bg-cover bg-center border-4 border-brand" data-alt="Portrait of man in suit looking professional" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrolwyWX6_xiyoIyHDfjFK_JS0DwnnzY3lS92LFSYRQJveCv7O8y3GoLKqnSD2c6ZbSOzeNfvGMaR4Orx6uU_nl4EiHph3qOHOPO7vEq9D6-zFDfv1wdnPz3s9PoHAOr9yycISg3XmBtViOZRD9dfhNj7bwGOZA9B9YXDks7Qy8XaQaZUmivv4B6LStbJH7h0DaueospZuv0O54HBcgn31ReQKscpE2xpYAADKtdHRIs4SCk6LPgulT87hb-K3stUlajjNwNNVxlM")' }}></div>
                                            <div>
                                                <h3 className="text-text-main font-bold text-lg">Nguyễn Văn A</h3>
                                                <p className="text-brand text-sm font-medium">CEO &amp; Founder</p>
                                                <p className="text-text-muted text-xs mt-2">15 năm kinh nghiệm trong ngành đồng hồ cao cấp.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-background-off transition-all">
                                            <div className="size-32 rounded-full bg-cover bg-center border-4 border-brand" data-alt="Portrait of woman creative director" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4x3IhDznBrqd1z6WyBr-QREQ3SukV3O9NuzyeLyUw_6jnao2-1RAiUdDaTw70XhG6ZZKvqAQHW5S8LEDUCgR2gca1PlA_RonCEEW2jJGIecHztqU1Iz5vx8qZMgOtWwpQlPrjRJp1O4FMsZe7MlI48QRrKwkSRB1b4zMLoieLF-G5HkFmTttyl2YeARPE_XPLF8L5nqWh4I8gKf6-i5M4FXLX9GvTh8j9bK-3Oaay7b0UY5EqfOdKcz3V0NprBxs9tK497UMtDFs")' }}></div>
                                            <div>
                                                <h3 className="text-text-main font-bold text-lg">Trần Thị B</h3>
                                                <p className="text-brand text-sm font-medium">Giám đốc Sáng tạo</p>
                                                <p className="text-text-muted text-xs mt-2">Người thổi hồn vào từng thiết kế của WatchStore.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-background-off transition-all">
                                            <div className="size-32 rounded-full bg-cover bg-center border-4 border-brand" data-alt="Portrait of senior watchmaker with glasses" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuX44S_ZmXEsRVKFsXZEShhibovZBdrQfqcAnpQFGadngDcN0ItcGHZNGucgu3Ikfxu7HyW5NxD7foljsLbOX7-VP5aXTPcbWyWJXfQ5UCQwK70VzPPY1QhjNk-OxqE2Zl2TwkLEiuTQSxBQ0Y0Setn67RzsbHrOoPmoUuDDUD88LFx66IjXCSoVbsUZlgtuG88H0BaRPVgIBlXH9DUb3iS7ZzGP3dr5dqbiTs5JqZFoqx4zZ81AQAPfA_X1NdTbE0sZR6juXZ_kI")' }}></div>
                                            <div>
                                                <h3 className="text-text-main font-bold text-lg">Lê Văn C</h3>
                                                <p className="text-brand text-sm font-medium">Nghệ nhân Chính</p>
                                                <p className="text-text-muted text-xs mt-2">Bàn tay vàng với độ chính xác đến từng micromet.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-background-off transition-all">
                                            <div className="size-32 rounded-full bg-cover bg-center border-4 border-brand" data-alt="Portrait of marketing manager smiling" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbT2oddgUNOO8xkJMJjqzFDg1Or6Dc_o7JsO3z1RXp-T-arJ0TRnqwpIcrzhxHTNUsbURMK7Eb9C9oUEB_Y2J0VFwpEA-fJj9YRKFxqMmpMceq9nn95WD75EA641A1GQbzYAhIce2bdq7J_jvJGDa6sizDGPWzWUTm__eaLBTydl8QUJZFMqHC38DuXkSkjGK2lWJnR_AllKjeqpw3qF42lhTrPBQqx3TJpVowqxgLdA7EjjxVVmQnOKWYGD_RjtcCgg2jBPIrzbE")' }}></div>
                                            <div>
                                                <h3 className="text-text-main font-bold text-lg">Phạm Thị D</h3>
                                                <p className="text-brand text-sm font-medium">Giám đốc Vận hành</p>
                                                <p className="text-text-muted text-xs mt-2">Đảm bảo trải nghiệm khách hàng luôn hoàn hảo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col bg-[#ffffff] mb-10">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div className="px-4 mb-6 flex justify-between items-end">
                                    <h2 className="text-text-main text-3xl font-bold">Thư viện ảnh</h2>
                                    <Link className="text-brand text-sm font-bold hover:underline" to="#">Xem tất cả</Link>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-[400px]">
                                    <div className="col-span-2 row-span-2 rounded-xl bg-cover bg-center hover:opacity-90 transition-opacity shadow-md" data-alt="Close up of watch on wrist lifestyle" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALqZBT5Sbzx2lRsf0EQ5qhoWlUB63tgKu9z3FHD3_vu9QjIzfH0l7rccQT3_Btv6DBiFWtvo7fDGMTw7HtGWrt6xTGnSq9aq3ExTW3TZnyTx7OTwGu4a0-dYXdil5dHRxNMGyeNL-xQlrmXeBdQRuVKquJekYng1aPeQlr8Kk3Rj1L8lAjMnlT0QOUC4XWwJFnK2t_y-1dG3og311_lCiVlQzCLDEbgRHE4FEf8aRQPfoyq8q6yZyVLELAhLJ5qrGI8X_wODBbmtI")' }}>
                                    </div>
                                    <div className="col-span-1 row-span-1 rounded-xl bg-cover bg-center hover:opacity-90 transition-opacity shadow-md" data-alt="Watch parts on table" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzlvS7G9pANWYcDV4uNmaeSpe-xeFztnGB3tgLf8SUukpm67RK6EPnlmaQDtOnDlROZzNGj_i1oPOM-OVC3k2WjRCPnWLZlLZNbQ_RmrHiiDFbxhFw6Sf5F1nH1fV4WPsMyYZO_i9na87T4EvR-MlA1hXUiBxLwVGQxAOGvtZVgwq8H2Suw_xog1yvK5xkd2ZznOkGxJOwI2Uuis2ipB73z6jVMRK-ksuYsZmDRQah9XPjqWhXPbiZMVX1K4QfuY-6iKPsikr7De4")' }}>
                                    </div>
                                    <div className="col-span-1 row-span-1 rounded-xl bg-cover bg-center hover:opacity-90 transition-opacity shadow-md" data-alt="Luxury watch boutique interior" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2dB7tcXMU2VzhXUu6HmRj2Pep70TQer7WG39IcL2BQSZlUc7Ju6OCaIHDE1DAp4fineIwKWnbAaeDAfSUtHX2Tug95RuVE9ptHeRocBF27rixl7RgC35OcG0A1D0AyevGYGMyWRmEEpM0T6Dk4PbhVwXAo9wdn0i6mZo_Si5dX3CwPjfdGi5QJGwvJHZLm8Hf16NzpitFTB1UnPw7jW6ayyLmSiSosCz5xbSj7cqYHgkulv5xQRdJil74x4GYEgYjBUxKez9NyDU")' }}>
                                    </div>
                                    <div className="col-span-2 row-span-1 rounded-xl bg-cover bg-center hover:opacity-90 transition-opacity shadow-md" data-alt="Watchmaker working with tools" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDslaCm2IOk7AlIlb1EZ_EZJevRJPNpZxRyu9zaefKdNcm0QOFUq7oiQFIkJ99QJM0EsBjWMhfbx-pmrYOpXDRFBh_rQlDt4T1zRylQiJRrStn-_MqTQ88oJBy0CFpMljo1pOVLf7jAQVKfihH1MPRusLKtQpf9dRBnkwkpo3f78N1w5hz3yJWH_0sxKQCs-Fl2TQIJ1k1AWHHvcpBuvsXu-YW8dg9v8MOLwIq8yxxwhasBN5a4fr3eH6STjcBOvloJZxpUrYkU3Qg")' }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col bg-[#f3f4f6]">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-16">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 items-center text-center">
                                <h2 className="font-sans text-3xl md:text-4xl font-black mb-4">Sẵn sàng sở hữu kiệt tác thời gian?</h2>
                                <p className="text-text-muted mb-8 max-w-[600px]">Khám phá bộ sưu tập mới nhất của chúng tôi và tìm chiếc đồng hồ hoàn hảo dành riêng cho bạn.</p>
                                <div className="flex gap-4">
                                    <button className="flex min-w-[150px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-brand hover:bg-brand-dark transition-colors text-white text-base font-bold shadow-lg">
                                        Mua ngay
                                    </button>
                                    <button className="flex min-w-[150px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-text-muted/20 hover:bg-gray-100 transition-colors text-text-main text-base font-bold">
                                        Liên hệ tư vấn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}