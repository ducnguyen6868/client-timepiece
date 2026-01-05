import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Blog() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <main className="flex-grow">
                <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="relative overflow-hidden rounded-2xl bg-cover bg-center h-[500px] group" data-alt="Close up of a luxury mechanical chronograph watch face with intricate gears" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqcZVH2qIowWvmlLRJSU_tXfCzEsZ8iK4R6YT_Kv2DUBQhSCcxzdKyQkiEtS-f-PtI3adJ6kDmFUH88Kz_6OD1UMH-PbmR_aeab4jcnTIZ7bgGnoZZVWMMGm5hug_hRMgSEHkQAcpYwsCxalubv9__w7RD5sDQOkszJjC6QcL_raqpuCe0RYmxNz30nz0M9msuI_TtzP07m8-Mn6ujVS2cD0CQaRobgjifIHMjqaCTUPimKobMBMwoPmNfPLXHAH-gkD-N5hUnwHQ')` }}>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 items-start">
                            <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured Story</span>
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                                Top 5 Chronographs Defining 2024
                            </h1>
                            <p className="text-slate-200 text-base md:text-lg leading-relaxed drop-shadow-md line-clamp-2">
                                From precision engineering to avant-garde aesthetics, discover the timepieces that are setting the standard for the year ahead.
                            </p>
                            <button className="mt-4 bg-brand hover:bg-brand/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 group-hover:pl-8">
                                Read the Guide
                                <Icon icon="material-symbols:arrow-right-alt-rounded" width="24" height="24" style={{ color: '#ffffff' }} />                            </button>
                        </div>
                    </div>
                </section>
                <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 dark:border-border-dark pb-4">
                                <h3 className="text-2xl font-bold dark:text-white">Latest Articles</h3>
                                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-brand text-white text-sm font-medium">All</button>
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-surface-dark dark:hover:bg-border-dark dark:text-text-muted text-slate-600 text-sm font-medium transition-colors">Reviews</button>
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-surface-dark dark:hover:bg-border-dark dark:text-text-muted text-slate-600 text-sm font-medium transition-colors">Guides</button>
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-surface-dark dark:hover:bg-border-dark dark:text-text-muted text-slate-600 text-sm font-medium transition-colors">News</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <article className="group flex flex-col gap-4">
                                    <div className="overflow-hidden rounded-xl aspect-[16/9] relative">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                                        <img alt="Person polishing a luxury silver watch" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Close up of watch maintenance tools and polishing cloth" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqq2Hu0lSOeKNX8OmKLldPiYFmjSEXbx3gO8ti4VWOCvTOVGU6FdmbAwzMLqFvdJeii9nmlR4bY1PVFelltVpDloMLcacjegITahHBJqTv42fr7l0bthbGu9506Sx3G9EyAxloXj762WZ-VidOzkquvdDRSCOuPRlGzlpLuMv7dfAD2Zho2OJMuNFt51jn8TZ4w9x9n2-O3pQ6dkMEvS5tk2PAqLMWDZpQCn_BMmYTug4yKolJQoDJge9GJdLm1T0tfCe0B3su8UY" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                                            <span className="text-brand">Maintenance</span>
                                            <span className="text-slate-400 dark:text-text-muted">•</span>
                                            <span className="text-slate-400 dark:text-text-muted">Oct 12, 2023</span>
                                        </div>
                                        <h4 className="text-xl font-bold dark:text-white group-hover:text-brand transition-colors cursor-pointer">
                                            How to Maintain Your Automatic Watch
                                        </h4>
                                        <p className="text-slate-600 dark:text-text-muted text-sm line-clamp-2">
                                            Automatic movements are marvels of engineering, but they require care. Learn the do's and don'ts of daily wear and storage.
                                        </p>
                                    </div>
                                </article>
                                <article className="group flex flex-col gap-4">
                                    <div className="overflow-hidden rounded-xl aspect-[16/9] relative">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                                        <img alt="Collection of vintage leather strap watches" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Flat lay of various vintage watches on a wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWsY2HAJE-RIZeK1SSjwRCwIkcOo5N30W2wNiPl0AAXDKBzcZUSzibxYbRygO03KhfarDFPaXNiQchXoZnG31zwXxNtbeiDjPTx7pu_DfiaC35PqDEWM0hsczxXpjrPPEIbB5VcUDpg53OjZMKyvUJEUe0PST_nSyZVLsurCrnwRqrYdjmbySc5fACwhL3kRzKYup9aIdUgwBG1nER_eaR8KCIUoZwfknRV_vY6DL18LQvxUrnVHH23QYtRKlA9zwgVekF-Pey2Uc" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                                            <span className="text-brand">History</span>
                                            <span className="text-slate-400 dark:text-text-muted">•</span>
                                            <span className="text-slate-400 dark:text-text-muted">Oct 08, 2023</span>
                                        </div>
                                        <h4 className="text-xl font-bold dark:text-white group-hover:text-brand transition-colors cursor-pointer">
                                            The Evolution of Swiss Watchmaking
                                        </h4>
                                        <p className="text-slate-600 dark:text-text-muted text-sm line-clamp-2">
                                            From humble beginnings in the Jura mountains to dominating the luxury world, trace the timeline of Swiss excellence.
                                        </p>
                                    </div>
                                </article>
                                <article className="group flex flex-col gap-4">
                                    <div className="overflow-hidden rounded-xl aspect-[16/9] relative">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                                        <img alt="Modern smartwatch next to a classNameic analog watch" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Contrast shot between a sleek smartwatch and a classNameic mechanical watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgzYpwNNpNy6A0rP7XEXyBDKMb8o_Wlg83kKdVTlg-kcXchJA5nVSbDar-_KPQJAFJrL0dOvshm1-FDQ5V33rJ7h9GIqIplOTT5umumwKYELD14lRspf2IvAfx3QNzBSv14uH3IMzRNAXh8aTnzYGQEM8rdpS9dpzRuWEy2WsJGMSun_BqE0osBtYBaP3Gs7KgzYZktZJVXl6W1MKzYMblisIDo4sqfcIVL1nXMIwLxFD94s1XS1_wdvJp0US_PgwSQOGbFV43cKc" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                                            <span className="text-brand">Comparison</span>
                                            <span className="text-slate-400 dark:text-text-muted">•</span>
                                            <span className="text-slate-400 dark:text-text-muted">Sep 28, 2023</span>
                                        </div>
                                        <h4 className="text-xl font-bold dark:text-white group-hover:text-brand transition-colors cursor-pointer">
                                            Smart vs. Mechanical: Choosing Your Style
                                        </h4>
                                        <p className="text-slate-600 dark:text-text-muted text-sm line-clamp-2">
                                            Is it time to upgrade to connectivity, or stick with tradition? We break down the pros and cons for the modern professional.
                                        </p>
                                    </div>
                                </article>
                                <article className="group flex flex-col gap-4">
                                    <div className="overflow-hidden rounded-xl aspect-[16/9] relative">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                                        <img alt="Diver watch underwater" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Diver watch submerged in water with bubbles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwnlWwEze0mZyzA1pBH6BS6gLlt17R2cNk2bsSIsXPAjp_rsVKgi-S_JJdCezoDCPw4AluOnGp9dV8ssvxGEy5iVLm-_iSwKjrPmK7tK9EzKLUNwabZsTJdrdcivxvUyWADs2PmCPckrtJLFRhSj0pKlhjRms82kyKOzH59gH9dov9OxMH6diEbyMgwz6qeZPQ3LXtBcG3fLNKzSE0WQYUxKpPJIzoGfhLggYlulyFk82rUUestzf8YridtlQtotNW1kbSNhR3G4w" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                                            <span className="text-brand">Reviews</span>
                                            <span className="text-slate-400 dark:text-text-muted">•</span>
                                            <span className="text-slate-400 dark:text-text-muted">Sep 15, 2023</span>
                                        </div>
                                        <h4 className="text-xl font-bold dark:text-white group-hover:text-brand transition-colors cursor-pointer">
                                            Deep Dive: The Best Diver Watches Under $1k
                                        </h4>
                                        <p className="text-slate-600 dark:text-text-muted text-sm line-clamp-2">
                                            You don't need to break the bank to get a reliable tool watch. Here are our top picks for underwater exploration.
                                        </p>
                                    </div>
                                </article>
                            </div>
                            <div className="flex items-center justify-center mt-12 gap-2">
                                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-border-dark text-slate-500 hover:bg-slate-100 dark:hover:bg-border-dark dark:text-text-muted transition-colors">
                                    <Icon icon="material-symbols:chevron-left-rounded" width="24" height="24" style={{ color: '#64748b' }} />
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-lg bg-brand text-white font-bold">1</button>
                                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-border-dark text-slate-500 hover:bg-slate-100 dark:hover:bg-border-dark dark:text-white transition-colors">2</button>
                                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-border-dark text-slate-500 hover:bg-slate-100 dark:hover:bg-border-dark dark:text-white transition-colors">3</button>
                                <span className="text-slate-400 px-2">...</span>
                                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-border-dark text-slate-500 hover:bg-slate-100 dark:hover:bg-border-dark dark:text-text-muted transition-colors">
                                    <Icon icon="material-symbols:chevron-right-rounded" width="24" height="24" style={{ color: '#64748b' }} />
                                </button>
                            </div>
                        </div>
                        <aside className="w-full lg:w-[360px] flex flex-col gap-8 shrink-0">
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                                <h5 className="text-lg font-bold mb-4 dark:text-white">Search Journal</h5>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-text-muted">
                                        <Icon icon="material-symbols:search" width="24" height="24" style={{ color: '#94a3b8' }} />                                    </span>
                                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-background-dark border-none rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-muted focus:ring-1 focus:ring-brand text-sm" placeholder="Search articles..." type="text" />
                                </div>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                                <h5 className="text-lg font-bold mb-4 dark:text-white">Categories</h5>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex justify-between items-center group cursor-pointer">
                                        <span className="text-slate-600 dark:text-text-muted group-hover:text-brand transition-colors text-sm font-medium">Industry News</span>
                                        <span className="text-xs bg-slate-100 dark:bg-border-dark text-slate-500 dark:text-white px-2 py-1 rounded-md">14</span>
                                    </li>
                                    <li className="flex justify-between items-center group cursor-pointer">
                                        <span className="text-slate-600 dark:text-text-muted group-hover:text-brand transition-colors text-sm font-medium">Watch Reviews</span>
                                        <span className="text-xs bg-slate-100 dark:bg-border-dark text-slate-500 dark:text-white px-2 py-1 rounded-md">28</span>
                                    </li>
                                    <li className="flex justify-between items-center group cursor-pointer">
                                        <span className="text-slate-600 dark:text-text-muted group-hover:text-brand transition-colors text-sm font-medium">Guides &amp; Tutorials</span>
                                        <span className="text-xs bg-slate-100 dark:bg-border-dark text-slate-500 dark:text-white px-2 py-1 rounded-md">8</span>
                                    </li>
                                    <li className="flex justify-between items-center group cursor-pointer">
                                        <span className="text-slate-600 dark:text-text-muted group-hover:text-brand transition-colors text-sm font-medium">Lifestyle</span>
                                        <span className="text-xs bg-slate-100 dark:bg-border-dark text-slate-500 dark:text-white px-2 py-1 rounded-md">10</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                                <h5 className="text-lg font-bold mb-4 dark:text-white">Trending Now</h5>
                                <div className="flex flex-col gap-4">
                                    <Link className="flex gap-4 group" to="#">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                            <img alt="Gold watch on a wrist" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" data-alt="Detail of a gold watch on wrist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeD4-mDXdZCpJoMtlTzafirnmckoJpu4gcpflYuTlwaiM43k4qLDSqLjeQdJEUsHwQ7-8ZkmByJwZ3NVwnJcOwb2H0cMUSvVxMw3ptuy-EKCATD4yvqj7mU_I6ACBOsKjMm4KA4n1cL2JpCSVSpgQgcyySnhRNue7nCtsdADy9r6aKgLfPLFR8x653XPofXpcQyngNUPTlxiGuROY70WVM0R_QV9T1kSAjTKuiTl1sCihPtoc17cpIpeZLXeo0r49Qjfxx3XgpwYU" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h6 className="text-sm font-bold dark:text-white group-hover:text-brand transition-colors leading-tight mb-1">
                                                Why Vintage Prices Are Skyrocketing
                                            </h6>
                                            <span className="text-xs text-slate-500 dark:text-text-muted">Oct 02, 2023</span>
                                        </div>
                                    </Link>
                                    <Link className="flex gap-4 group" to="#">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                            <img alt="Minimalist watch face" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" data-alt="Close up of a minimalist white watch face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuS5vBGYHdEfWjiyEkyhvBSXN08nK2B8K43xw1CU7Xas5eDc1qNpS24Gr5RpzbysAQxd66SSiow3QQzRtKikZSRqeN8Clww6j-Ij6ANmG1VdH4tQf-KCes2Wz9HaHwQ9As2HHPTZQs-3mRv6zlCuyeL_TkFdoBl9P5tHSIFZVNS73EPHWhXgQBdVcl1QwEk3ZI2ClpZ8swJdfESqIF8CbUYunMBnyMI7LJOqbHgs7AA_seokfb5g79iXeu8mIudygoIUoyefFgL6Q" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h6 className="text-sm font-bold dark:text-white group-hover:text-brand transition-colors leading-tight mb-1">
                                                Top 5 Minimalist Watches for Daily Wear
                                            </h6>
                                            <span className="text-xs text-slate-500 dark:text-text-muted">Sep 19, 2023</span>
                                        </div>
                                    </Link>
                                    <Link className="flex gap-4 group" to="#">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                            <img alt="Chronograph watch" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" data-alt="Dark chronograph watch with blue light accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJcYqhNeHVJyWNmxVSBmouLT6_7mtKTM8kKN_Xb-0l4uR94YbUUL0CYTUrxaUEOByrZ7CwLOHjj87dc1F5hodcC1OuzwJIIE3xqKrC1K6jesYi6lKyI3miDMdcAm-i5bZVKEQf9E4Ry14nKYgbDG65d3dcMxtWZpD7JGkASZTyr91RSR_tAI3eb9TVFHwV70mkOTjraIKMvFDeBPHh5fH6yjPRLCQWuba5yM-lpLzK2CWpU3Lo1EQ8kUIhAQySKKGnAx86gkyHdd4" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h6 className="text-sm font-bold dark:text-white group-hover:text-brand transition-colors leading-tight mb-1">
                                                Understanding Chronograph Functions
                                            </h6>
                                            <span className="text-xs text-slate-500 dark:text-text-muted">Sep 10, 2023</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-brand/10 border border-brand/20 p-6 rounded-xl flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-brand flex items-center justify-center text-white mb-4">
                                    <Icon icon="material-symbols:mail-outline" width="24" height="24" style={{ color: '#ffffff' }} />
                                </div>
                                <h5 className="text-lg font-bold dark:text-white mb-2">Join the Club</h5>
                                <p className="text-sm text-slate-600 dark:text-text-muted mb-4">
                                    Subscribe to our newsletter and get exclusive content plus <span className="text-brand font-bold">10% off</span> your first order.
                                </p>
                                <input className="w-full mb-3 rounded-lg border-none bg-white dark:bg-background-dark py-2 px-4 text-sm focus:ring-2 focus:ring-brand dark:text-white" placeholder="Your email address" type="email" />
                                <button className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
                <div className="bg-[#1f2937] py-8 border-y border-[#374751] mb-10">
                    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Featured in this Month's Issue</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="group cursor-pointer">
                                <div className="bg-[#111827] rounded-lg p-6 mb-4 relative overflow-hidden">
                                    <img alt="Luxury watch product shot" className="w-full h-40 object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-300" data-alt="Studio shot of a luxury watch with leather strap" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqq7JaHmptuxwv1m4GNFrQRegiTFVpQzw-XZlVNrRanSM_qgwxvw_bfGpycEWzRITaQZI4XM4nBr6b5QTMFkYfC3Euvp7BTOcUi_v3EhGFvAhnwoZYG6nwmgyKdrC6zVM5WlRuIh5yZSL_yegesYmfWp2ccp-MZani0jhg7tNuQjNVhMVqnuJwQ9Ne4aI5Ocaza2neIGPICY8rdI0h7Z7GgfB17oC3yl8JhD_UCoLSDk2Z94k3M0k1sfJtyVjjG4622UXbJedNmcs" />
                                    <div className="absolute top-2 right-2 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-15%</div>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1 group-hover:text-brand transition-colors">Oyster Perpetual</h4>
                                <p className="text-text-muted text-xs">$5,400.00</p>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="bg-[#111827] rounded-lg p-6 mb-4 relative overflow-hidden">
                                    <img alt="Black minimalist watch product shot" className="w-full h-40 object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-300" data-alt="Studio shot of a black minimalist watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBGxfAzx1jdH3r7E17fotd-NmGs3Qck439sSjTFxeypImULgYXHsQ9B7Fnw1V7qUl6Cq0rx1QjWS2vW4prPNxnhPg5mg-VnDgaWSdATkoV1OMwnCZIB8oryITxUijQlhJX6DZH7YpiyIJ3G3ejRImFux22Df8YCdgZ7YFf1Sp2hIjKRvUg57Rt0kHuVDkTcsAMYdAxShRtrI0jR2BfO44ENBAHt3fhZi8HxfNZoGAEC-d4gXRvb1HxO917kDc59Ct5xVLmiRkEis0" />
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1 group-hover:text-brand transition-colors">Speedmaster Pro</h4>
                                <p className="text-text-muted text-xs">$6,250.00</p>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="bg-[#111827] rounded-lg p-6 mb-4 relative overflow-hidden">
                                    <img alt="Silver watch product shot" className="w-full h-40 object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-300" data-alt="Studio shot of a silver steel watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxXO5BCiwv9dtM4UonHgeHiMNA_idsMlU2lgjf23m5SlCSlN1IJzd4dJHbw8C2VhhmKYVmBg-EijDDi0I9Hmlrh3LPYXw0CrwbYLFrfKQydjFs5OEPJ2mhs3RDPZ34uELGFPYQYPNErQ_xHCko33CfhC6UZ-DEeaQfl99vfKdJUQ2209VO_W1ZEiJX53fpjVgM8loqW0pEEG9Pk8_8RAC-6FfssJmvoHtUSU1sY5_gSNrMnxcU9Iz33HzmeIP-1mFeo6KkQUJ57GI" />
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1 group-hover:text-brand transition-colors">Seamaster 300</h4>
                                <p className="text-text-muted text-xs">$4,900.00</p>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="bg-[#111827] rounded-lg p-6 mb-4 relative overflow-hidden">
                                    <img alt="Gold watch product shot" className="w-full h-40 object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-300" data-alt="Studio shot of a classNameic gold watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDiX2Y08n8MlCX5Sy6NNVAUsUicqd0Zasx58dfpeivjGORi8Nb0XiUIeUHuHyP8JHnCfT8NTtF3kabYDLnRsODduF7PU6xEGsLwHTatNsrbRAYulFcg0EYWc7cAxrT7Z-87JWmL6CVhr5qVNEMHS-DQVreH1rLOVEgeUqvVbKtD5sex5Gbt2nM6XVlBjuTPhpHNG-BuolZYfB2AsLaQ2EcUoV2M8CpNb2Q3PHxAtA27QAlYw2EO5Xwb7QbPG5VN72EA_iQ7Mf0xBc" />
                                    <div className="absolute top-2 right-2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">New</div>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1 group-hover:text-brand transition-colors">Heritage Black Bay</h4>
                                <p className="text-text-muted text-xs">$3,800.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};