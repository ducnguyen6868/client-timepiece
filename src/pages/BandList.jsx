import {Link} from 'react-router-dom';
import {Search,SquareArrowOutUpRight} from 'lucide-react';
import {Icon} from '@iconify/react';

export default function BrandList() {
    return (
        <>
            <main class="layout-container flex h-full grow flex-col px-4 sm:px-8 py-8 mx-auto w-full max-w-[1440px] font-sans">
                <section class="relative rounded-3xl overflow-hidden bg-bg-subtle mb-16">
                    <div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-brand/30 to-transparent pointer-events-none"></div>
                    <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/30 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="relative z-10 flex flex-col items-center text-center py-16 px-4 md:py-24">
                        <span class="text-brand font-bold uppercase tracking-widest text-xs mb-4 bg-white px-3 py-1 rounded-full shadow-sm">Authorized Dealer</span>
                        <h1 class="text-4xl md:text-6xl font-black text-text-main mb-6 leading-tight">
                            Thế Giới <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Đồng Hồ</span><br />Chính Hãng
                        </h1>
                        <p class="text-text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Khám phá bộ sưu tập từ hơn 50 thương hiệu đồng hồ danh tiếng toàn cầu. Chúng tôi tự hào là nhà phân phối chính thức, mang đến những kiệt tác thời gian đẳng cấp nhất.
                        </p>
                        <div class="w-full max-w-xl relative group">
                            <input class="w-full h-14 pl-14 pr-6 outline-none rounded-full bg-white shadow-soft border border-transparent focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-base" placeholder="Nhập tên thương hiệu bạn muốn tìm..." type="text" />
                            <Search class="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-text-muted group-focus-within:text-brand transition-colors"/>
                            <button class="absolute right-2 top-2 bottom-2 bg-brand hover:bg-brand-light text-white rounded-full px-6 font-bold transition-colors">Tìm kiếm</button>
                        </div>
                    </div>
                </section>
                <div class="flex flex-col gap-6 mb-12">
                    <div class="flex items-center justify-between border-b border-border-light pb-4">
                        <h3 class="text-xl font-bold text-text-main">Danh mục A-Z</h3>
                        <button class="text-sm font-medium text-brand hover:underline">Xem tất cả</button>
                    </div>
                    <div class="flex flex-wrap gap-2 md:gap-3">
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-brand text-white font-bold shadow-lg shadow-brand/20 cursor-pointer transition-transform hover:scale-110" to="#">All</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">A</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">B</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">C</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">D</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">F</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">G</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">H</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">K</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">L</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">M</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">O</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">P</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">R</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">S</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">T</Link>
                        <Link class="flex items-center justify-center size-10 rounded-lg bg-white border border-border-light text-text-muted hover:border-brand hover:text-brand font-semibold transition-all cursor-pointer hover:shadow-md" to="#">V</Link>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">OMEGA</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Swiss Made</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Omega Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeyKfl7p0fqF7rWf_wa0_FamqTEJCjVs1wT8xu3EvAWTjuah1Ck5-B9hNAOPl2MPndwgFbqRWtL64hvgj_wg6xCqoxWsFQQIcN8LS8ej7ZetN5VMJxbCm6i5DalCKWoTpY-DO__7WlaCki_cufNBSvGVsXzEYMj44WY2Ov-fPl9xetuLUnAujkmEYytL-pcAtf0HarZvcu7O78ZjfDhB0LZtErVslm4Xs5x9Ua3jowYfGUjJnKRNNcxYhgvSy1DLayIM1X1mNHKJo" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">128 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+5</div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">HUBLOT</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Swiss Made</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Hublot Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfurceTpKC5Udzsj2mUzUoOqaa9-OHRwRxywAZ7tuY3aQjv4O2EXubr_-5-fdv5ki2U3-zmNmdBILGqVy2RLyI72Pn4wheMz_OxR5rxvIfIqzVV6UEQQYekSdL5YNkXbTpRxOuDV-sMQObBkB8lfKd4VzK1cR1XrBt2e65hS8V3y-XSWzOnMf8wxo5rH-M3QQJwFdTXQdW35XVajxosm3-ztTD_q_E0elXFXivnE0bnrmKJVMgA6590h0Ldhjz1JJfcH8kHz4x5uw" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">45 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">SEIKO</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Japan</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Seiko Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxXhMKX3ZKNonkDdKCdkfaibVT1hIo2ejfNvaArCul-Rn1iJiGLJxPtoKXKM_2rh9n9Pemj3Ajtjkt1EYmoVyv18fEGfvpPJDQ8XwRj8O5O-08F2oA8irKfByZan6vxrAIjipgZtohcyQm3XjO9jenij4Vy0jwVTbE9i1lfJGstPe1uTGNMF460psoKQqHt-02lXLg6oOJ7HPNzvUK62MZSXImOozI5cnIQV8j6iwP35QErsRg1BUCAkcOD98hC9U-n6FfI7MNt_0" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">210 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+12</div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">TISSOT</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Swiss Made</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Tissot Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHUAoh7ycOw1kiUxLrj1R0W5serdtg_GRGgvXyVnMXGm8xfRZJbG9vjq8xXD4ZvdppsOEYAP8TG7WEPjmdlgg4H7WJH2tfeD7aJfdAp3GdyyuzKlo0LsiF6WlnoGZchQg3qS9hJImrz70oR2X_08t3vMTufqzQ7TjsxaWcz4PlOULCEQNNZAZgFquvirbP5hILi0hnf8GHgV0jPVfLEix7D7Ob_QE_bBxHNvtCDreYQo6-jhyCa3ESwlaD5AWOzXTWX6g6uYV_gSM" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">156 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+8</div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">ORIENT</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Japan</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Orient Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUx7103DJIKSWoaF67zk_BGLf4SBI6Y_4CspfH_6_JZB2sgy0uzr5LTAFU915F4b4aqRoXEIcPvIFQ3GpPwBPD5ivaYm1ahMUsInJmMIxrRY3Vk2iVTiwAd_KLws4kmEaTLJSFzdKsXMsQF0P5MyjatLhZJ0sdCfnEsulHugETsgjklfleZC9GeYbCndXgQB03KAv6T_8o-MdsaQekUlf5hCcxTosMzCtelasMGP_s1OHTLd7XV2YuR3ULZllJhODxqnKCdTIacA4" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">89 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">CITIZEN</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Japan</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Citizen Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3rMmRSF2Ig7-Mv_cWX-_Dc8lUBqDvMEwB6a3CU9LmoFozePOFaCxTIO8Bs-xAh2nl8tHBoeXeLUXzBzFUpLRr7YUMen2hctIFK2XQwtNb7t8a2ui55jcFLNYFWlshdbPGsb6xVtuVYQPotsEdSXHLld0fXhQcTMR7WhVhxEhGd3bby56ttHdkoL0z-D3a07ZXs6Hi_dfa6mChg69I5qdWQ9_H2WRyVsWEXgnfLBNcLzLJDUA5LvwzbyFhGUJ5CX_VV9-b7PDM3p0" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">112 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+4</div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">G-SHOCK</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Japan</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="G-Shock Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFY2BsbnMLxh2SECHSuYFRmItCCksb8Ny_RdHYBwQg-Q-VxYQX1NKHnwe37QjXw6iBCFnvC-9nswuNFJFa-vKJnWa70zaCxdvm4K8eaB1WfZzJk3zLlWhfAr4W4aC8aR-hiQThJ52zhjy85Q9NGdnCHGZnv0hBvD4lJOVTzbJPrZPx8walxXy01DRVh2EQ-tCe3GbHyUdA67m0dos-ruOepL6YR4DRAouCK4QnRFZr7dZBkBQFIm4cYZmHPLRZo9P0VrZ0y7iJvTU" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">320 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+25</div>
                            </div>
                        </div>
                    </Link>
                    <Link class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand hover:shadow-glow transition-all duration-300" to="#">
                        <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <SquareArrowOutUpRight className=" text-brand"/>
                        </div>
                        <div class="p-6 flex flex-col items-center border-b border-gray-100 bg-bg-subtle/30">
                            <h3 class="text-3xl font-black text-text-main tracking-tight group-hover:text-brand transition-colors">FREDERIQUE</h3>
                            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Swiss Made</span>
                        </div>
                        <div class="relative w-full aspect-[4/3] p-6 flex items-center justify-center group-hover:bg-bg-subtle transition-colors duration-500">
                            <img alt="Frederique Constant Watch" class="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1PxWDfaZnZP8FHo3h3Qu60yBJxItvTi-k3pS2O_KdPn5a7iIe3ZnwabphimiH8j0K2gZKnI0i9di7MIjNXlB6aOhOfX3NzjcfYqbJihKSbco4TYbe_1OiaqfsLyUbjbGHzH0e6lOYkuzWpe54dyixFcfFl3xp0_fEQh23LLGVjWKZ4dtyeqQSZEkUCRcKr7YlTagP4MlstBOyGdtsIu7VKH8Xy4_FvS-vP97mIqIto3Q9Baon80KtakjAw0W1s17HaOps1Fq25zo" />
                        </div>
                        <div class="px-6 py-4 flex justify-between items-center bg-white z-10">
                            <span class="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">65 Sản phẩm</span>
                            <div class="flex -space-x-2">
                                <div class="size-6 rounded-full bg-gray-100 border border-white"></div>
                                <div class="size-6 rounded-full bg-gray-200 border border-white"></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="rounded-2xl bg-gradient-to-br from-brand-light to-brand p-10 md:p-16 text-center text-white relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                    <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                        <div className='flex gap-2'>
                            <h2 class="text-3xl md:text-4xl font-black mb-4">Cam Kết Chính Hãng 100%</h2>
                            <Icon icon="material-symbols:verified-outline-rounded" width="40" height="40"  style={{color: '#ffffff'}} />
                        </div>
                        <p class="text-lg opacity-90 mb-8 font-medium">
                            Tại Timepiece, mỗi sản phẩm đều đi kèm giấy chứng nhận bảo hành quốc tế và tem chống hàng giả. Chúng tôi đền bù gấp 10 lần nếu phát hiện hàng giả.
                        </p>
                        <button class="bg-white text-brand hover:bg-gray-50 font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-black/10">
                            Xem Chính Sách Bảo Hành
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}