import {
    Edit, Search, CheckCheck, Smile, Paperclip, SendHorizontal, Mail, Plus,Phone
} from 'lucide-react';


export default function ChatManagement() {
    return (
        <div className='flex'>
            {/* 2. Chat List Sidebar */}
            <aside class="w-96 bg-white border-r border-[#e5dcdc] flex flex-col shrink-0">
                {/* Header */}
                <div class="p-5 pb-2">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold text-[#181111]">Messages</h1>
                        <button class="p-2 hover:bg-[#f4f0f0] rounded-full text-[#181111] transition-colors">
                            <Edit />
                        </button>
                    </div>
                    {/* Search */}
                    <div class="relative group">
                        <input class="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f8f6f6] border-none focus:ring-1 focus:ring-brand placeholder-[#886364] text-sm transition-all focus:bg-white border border-transparent focus:border-[#e5dcdc]" placeholder="Search chats..." type="text" />
                        <span class="material-symbols-outlined absolute left-3 top-3 text-[#886364]">
                            <Search />
                        </span>
                    </div>
                </div>
                {/* Filter Chips */}
                <div class="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar pb-4">
                    <button class="px-4 py-1.5 rounded-full bg-[#181111] text-white text-sm font-medium whitespace-nowrap hover:bg-black transition-colors">All</button>
                    <button class="px-4 py-1.5 rounded-full bg-[#f4f0f0] text-[#181111] hover:bg-[#e5dcdc] text-sm font-medium whitespace-nowrap transition-colors">Unread</button>
                    <button class="px-4 py-1.5 rounded-full bg-[#f4f0f0] text-[#181111] hover:bg-[#e5dcdc] text-sm font-medium whitespace-nowrap transition-colors">Assigned to me</button>
                </div>
                {/* List */}
                <div class="flex-1 overflow-y-auto">
                    {/* Active Item (using brand color) */}
                    <div class="flex items-center gap-3 p-4 bg-brand/5 border-l-4 border-brand cursor-pointer hover:bg-brand/10 transition-colors">
                        <div class="relative shrink-0">
                            <img class="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of customer James Bond"
                                src='https://lh3.googleusercontent.com/aida-public/AB6AXuAkqV1cw_61ZcK-C_ciaEQDnCMUQg4FPqLvCoAYI4gQvMo59bVR3PG6-6vGa0WmWUmv9nCqbVngFYxizMwaHIrPJ39sWjF8p61kBvDzPyhrgejpm90Rr8W1lykfkpN7U9xf_McMqs1Cg2yzpMWMgTdV8ly4zD3NeF8WMqfYjFmUi_AxZbFjCf0EOJdjaFjBdOWwxSlNc5zJATaKiTCSDvBf-2NysS-oyewvaMa2_cQUckDK9_pQj6tn7-sPIJT3SMUMP7k3xg-r2yRe'></img>
                            <div class="absolute bottom-0 right-0 size-3 bg-brand border-2 border-white rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-baseline mb-0.5">
                                <p class="font-bold text-[#181111] truncate">James Bond</p>
                                <span class="text-xs text-brand font-medium">Now</span>
                            </div>
                            <p class="text-sm text-[#181111] truncate font-medium">Do you have the Omega Speedmaster?</p>
                        </div>
                    </div>
                    {/* Normal Item */}
                    <div class="flex items-center gap-3 p-4 hover:bg-[#f8f6f6] cursor-pointer border-l-4 border-transparent transition-colors group">
                        <div class="relative shrink-0">
                            <img class="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of customer Vesper Lynd"
                                src='https://lh3.googleusercontent.com/aida-public/AB6AXuDSjWHuFNW22_LpIZOKnmfq8ZtU6-sy6NZzKmqQMhTMZtGAKX3MoXAttxEDgNyKRo3z0ET8qncsK2066EKpuJh6_ZSD2pDQ7GB3dARwlYn6NzpUbVgCkGHnF0kJWDY6ZwanbtNsntTg141mlID-3e8x4McctXz626N5plKg0xNMcgSqgJYQ7_aiHvl8CFjIBhx9Fr-rtJqCDUcihHHOAEwJx0qITP1DsApk2aFtaq9S9EUWGt3XQmexPyg8rc6RF8ktGadsA812JAxS'></img>
                            {/* Offline/Away status can be gray or yellow */}
                            <div class="absolute bottom-0 right-0 size-3 bg-gray-300 border-2 border-white rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-baseline mb-0.5">
                                <p class="font-medium text-[#181111] truncate group-hover:text-brand transition-colors">Vesper Lynd</p>
                                <span class="text-xs text-[#886364]">10m</span>
                            </div>
                            <p class="text-sm text-[#886364] truncate group-hover:text-[#181111]">Delivery status for my order #4492</p>
                        </div>
                        {/* Unread Badge */}
                        <div class="size-5 bg-brand rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm">2</div>
                    </div>
                    {/* Another Item */}
                    <div class="flex items-center gap-3 p-4 hover:bg-[#f8f6f6] cursor-pointer border-l-4 border-transparent transition-colors group">
                        <div class="relative shrink-0">
                            <img class="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of customer Le Chiffre"
                                src='https://lh3.googleusercontent.com/aida-public/AB6AXuAkqV1cw_61ZcK-C_ciaEQDnCMUQg4FPqLvCoAYI4gQvMo59bVR3PG6-6vGa0WmWUmv9nCqbVngFYxizMwaHIrPJ39sWjF8p61kBvDzPyhrgejpm90Rr8W1lykfkpN7U9xf_McMqs1Cg2yzpMWMgTdV8ly4zD3NeF8WMqfYjFmUi_AxZbFjCf0EOJdjaFjBdOWwxSlNc5zJATaKiTCSDvBf-2NysS-oyewvaMa2_cQUckDK9_pQj6tn7-sPIJT3SMUMP7k3xg-r2yRe'></img>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-baseline mb-0.5">
                                <p class="font-medium text-[#181111] truncate group-hover:text-brand transition-colors">Le Chiffre</p>
                                <span class="text-xs text-[#886364]">1h</span>
                            </div>
                            <p class="text-sm text-[#886364] truncate group-hover:text-[#181111]">I need to process a return request.</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-4 hover:bg-[#f8f6f6] cursor-pointer border-l-4 border-transparent transition-colors group opacity-60">
                        <div class="relative shrink-0">
                            <div class="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of customer Felix Leiter" src='https://lh3.googleusercontent.com/aida-public/AB6AXuDSjWHuFNW22_LpIZOKnmfq8ZtU6-sy6NZzKmqQMhTMZtGAKX3MoXAttxEDgNyKRo3z0ET8qncsK2066EKpuJh6_ZSD2pDQ7GB3dARwlYn6NzpUbVgCkGHnF0kJWDY6ZwanbtNsntTg141mlID-3e8x4McctXz626N5plKg0xNMcgSqgJYQ7_aiHvl8CFjIBhx9Fr-rtJqCDUcihHHOAEwJx0qITP1DsApk2aFtaq9S9EUWGt3XQmexPyg8rc6RF8ktGadsA812JAxS'></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-baseline mb-0.5">
                                <p class="font-medium text-[#181111] truncate">Felix Leiter</p>
                                <span class="text-xs text-[#886364]">3h</span>
                            </div>
                            <p class="text-sm text-[#886364] truncate">Thanks for the update.</p>
                        </div>
                    </div>
                </div>
            </aside>
            {/* 3. Main Chat Area */}
            <main class="flex-1 flex flex-col bg-[#f8f6f6] min-w-0 relative">
                {/* Chat Header */}
                <header class="bg-white border-b border-[#e5dcdc] px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-10">
                    <div class="flex items-center gap-3">
                        <img class="size-10 rounded-full bg-cover bg-center" data-alt="Header avatar of James Bond" src='https://lh3.googleusercontent.com/aida-public/AB6AXuCobjkUQwxAhOp8E7aCWvWZEaYvHKoOtBxxLCEWpGG1fVtHVFtqQwFL2uWhwuPE5wtgu9A4ip-LzsSBUFxQslQEh6jFTyt2095vfJEAO5KD8kMl4asVk3YYPQtAThIHEBkHLtQTL8RWBOefzAxpHI4BEzSEdqgtyoSieRFivVR_-aCcjPxSBwIiQw2Qa_mteQVSna-veh0H0HSSY7FpUNnXzmN-jgh7OERbwQQKg5oY1wynOLvPxKemrzRcTzAjISAliYnghm-_rbzh'></img>
                        <div>
                            <h2 class="text-lg font-bold text-[#181111]">James Bond</h2>
                            <div class="flex items-center gap-1.5">
                                <span class="size-2 rounded-full bg-brand animate-pulse"></span>
                                <span class="text-xs text-[#886364]">Online | Local time: 3:42 PM</span>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Messages Stream */}
                <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    {/* Date Separator */}
                    <div class="flex justify-center">
                        <span class="bg-[#e5dcdc]/50 text-[#886364] text-xs py-1 px-3 rounded-full font-medium">Today, October 24</span>
                    </div>
                    {/* System Message */}
                    <div class="flex justify-center text-xs text-[#886364] italic">
                        Chat started by Customer via Web Widget
                    </div>
                    {/* Customer Message */}
                    <div class="flex gap-3 max-w-[80%]">
                        <img class="size-8 rounded-full bg-cover bg-center shrink-0 mt-1" data-alt="Customer avatar small" src='https://lh3.googleusercontent.com/aida-public/AB6AXuAab-8FepBeGhV8-FVjiLJ943yUcuFk_FETwNJkvtSKQdVhU22JGilS1I_K4HukvSGlV5cQ5708QBmttMMy_3TEwMUPYB12ZG5orMUpys4_rHbZkCpm4VqPGX32cKWZPgrUGXfEiGq8yJ2vChxVq5LCXJ7kv0uKxtFiZmwJ5wZNPON-mI_guLcNgdfaLtdrULfHcwrOaVy-Wli16-1aenDVw23IO1hk2KtSGK-tp9ryqjpooNOmQDBTBR2cjWsF1GuFBtrpOgRxJceu'></img>
                        <div class="flex flex-col gap-1">
                            <div class="bg-white border border-[#e5dcdc] p-4 rounded-2xl rounded-tl-none text-[#181111] shadow-sm">
                                <p class="leading-relaxed font-body">Hi, I was looking at the Omega Speedmaster Professional. Do you have the Sapphire Sandwich version in stock?</p>
                            </div>
                            <span class="text-xs text-[#886364] ml-1">10:42 AM</span>
                        </div>
                    </div>
                    {/* Agent Message */}
                    <div class="flex gap-3 max-w-[80%] self-end flex-row-reverse">
                        <img class="size-8 rounded-full bg-cover bg-center shrink-0 mt-1" data-alt="Agent avatar small" src='https://lh3.googleusercontent.com/aida-public/AB6AXuDZGZdPuUqgBQC5p8FLjAfc3IFLVtv4uqe9OlGrofJfTFzDSHr2tGm1JyYAkVy2fULN4vtLM14IDeRZK88-SX3Vjd2CUF9r--cAf7Yee_opghvna_-aLUJXAAqtmT0avn5hnVAR_n7lRUjbV1nPWLVvsNZw2HCIgH9nPxvXQ_WDilgdeWBQ9KYyHdigXrP686kVwpmnErTXY8Hu-zUHl8-B1dEZQ3DSqWwwsoq9qBgVIwCx-QwYbP9MGmXJkwGRr6msgjFbnkGyLvKW'></img>
                        <div class="flex flex-col gap-1 items-end">
                            <div class="bg-brand p-4 rounded-2xl rounded-tr-none text-white shadow-sm">
                                <p class="leading-relaxed font-body">Hello James! Excellent choice. Let me check our real-time inventory for you immediately.</p>
                            </div>
                            <div class="flex items-center gap-1 mr-1">
                                <span class="text-xs text-[#886364]">10:43 AM</span>
                                <span class="material-symbols-outlined text-xs text-brand font-bold">
                                    <CheckCheck />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Customer Message */}
                    <div class="flex gap-3 max-w-[80%]">
                        <img class="size-8 rounded-full bg-cover bg-center shrink-0 mt-1" data-alt="Customer avatar small" src='https://lh3.googleusercontent.com/aida-public/AB6AXuBVkjMChMCqXoUEFF3s8meBtUmq6bIQjeh0kK702rWyLmqM4xKS3uSW234FBAFCNKg0yjrktxPfVJqn1VaUbogWrECg1_B3F7zahX507p97qy4XvEp01a_XqbU_GAp02Gh7IrfU9jcTokUnhOhu9y5ZXk4C2DFbp-EKAD6E0Oh5UWT90armWgd4dHSobQW88iUZR0bY6pIk0vgyTdbB9utmvqIg1dFqMubDZCJAMXYk16eEkF_OatYbPhjiNWOP0uXC-hRRafISTUIf'></img>
                        <div class="flex flex-col gap-1">
                            <div class="bg-white border border-[#e5dcdc] p-4 rounded-2xl rounded-tl-none text-[#181111] shadow-sm">
                                <p class="leading-relaxed font-body">Thanks, please let me know. I also need it shipped to London by Friday.</p>
                            </div>
                            <span class="text-xs text-[#886364] ml-1">10:44 AM</span>
                        </div>
                    </div>
                    {/* Typing Indicator */}
                    <div class="flex gap-3 max-w-[80%]">
                        <img class="size-8 rounded-full bg-cover bg-center shrink-0 mt-1 opacity-50" data-alt="Customer avatar small faint" src='https://lh3.googleusercontent.com/aida-public/AB6AXuCZ0-O1AKTyGrQo3hOqM3fJE79HGK2AiffGDqoDrHRZr--dob_JYgcvNqOX5bvJi7akQTmRf2gfW7rWIDLfL9VuKyCs22eQfDfE4gWQPpDO85sV3RjL-pg8mrncM3jwBMuteslTHwiR1E667e2tyq3z_IRCjRWg0WqXTnvMsp6FFIfMO2lrLKHB03NGVINk6rF8iUOpi0vykOtCwEKG6JwESxNQD2hgjWKDjoM8Ji_N3tgBVo8_fXhL2DPzznJKZb3f7jznm73T7xbh'></img>
                        <div class="bg-white border border-[#e5dcdc] px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                            <span class="block size-2 bg-gray-400 rounded-full animate-pulse"></span>
                            <span class="block size-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                            <span class="block size-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        </div>
                    </div>
                </div>
                {/* Input Area */}
                <div class="bg-white p-4 border-t border-[#e5dcdc]">
                    {/* Quick Replies Chips */}
                    <div class="flex gap-2 mb-3 overflow-x-auto">
                        <button class="px-3 py-1 rounded-lg bg-[#f8f6f6] hover:bg-[#e5dcdc] text-xs font-medium text-[#181111] border border-[#e5dcdc] transition-colors whitespace-nowrap">in_stock_response</button>
                        <button class="px-3 py-1 rounded-lg bg-[#f8f6f6] hover:bg-[#e5dcdc] text-xs font-medium text-[#181111] border border-[#e5dcdc] transition-colors whitespace-nowrap">shipping_policy</button>
                        <button class="px-3 py-1 rounded-lg bg-[#f8f6f6] hover:bg-[#e5dcdc] text-xs font-medium text-[#181111] border border-[#e5dcdc] transition-colors whitespace-nowrap">ask_for_details</button>
                    </div>
                    <div class="relative flex items-end gap-2 bg-white rounded-xl border border-[#e5dcdc] shadow-sm focus-within:ring-1 focus-within:ring-brand focus-within:border-brand p-2 transition-all">
                        <button class="p-2 text-[#886364] hover:text-brand rounded-lg transition-colors shrink-0">
                            <span class="material-symbols-outlined">
                                <Paperclip />
                            </span>
                        </button>
                        <textarea class="w-full bg-transparent outline-0border-none focus:ring-0 resize-none max-h-32 py-2.5 text-[#181111] placeholder-[#886364] text-base" placeholder="Type a message..." rows="1"></textarea>
                        <div class="flex gap-1 shrink-0 pb-0.5">
                            <button class="p-2 text-[#886364] hover:text-brand rounded-lg transition-colors">
                                <span class="material-symbols-outlined">
                                    <Smile />
                                </span>
                            </button>
                            <button class="p-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-md flex items-center justify-center">
                                <span class="material-symbols-outlined">
                                    <SendHorizontal />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-2 px-1">
                        <span class="text-xs text-[#886364]">Enter to send, Shift + Enter for new line</span>
                        <span class="text-xs text-[#886364]">Press <kbd class="bg-gray-100 px-1 rounded font-bold">/</kbd> for quick replies</span>
                    </div>
                </div>
            </main>
            {/* 4. Context Panel */}
            <aside class="w-80 md:hidden xl:block bg-white border-l border-[#e5dcdc] flex flex-col overflow-y-auto shrink-0">
                {/* Profile */}
                <div class="p-6 border-b border-[#e5dcdc] flex flex-col items-center text-center">
                    <img class="size-24 rounded-full bg-cover bg-center mb-4 ring-4 ring-[#f8f6f6]" data-alt="Customer James Bond large avatar" src='https://lh3.googleusercontent.com/aida-public/AB6AXuAV63N-AWzjeHJx6bG4WlXltenn-yalWY3359OdoHIsSx8L_SmO0Nq_POW0FXVk1rxXo-SbRZzzVlKTkINddDwgWs01NpOsYzpELiRcM61u6qJfDIx5wCI0VZQurk7u6qd9bk6nCk6NUZMevwvfXjxHHIB35ZEJX87w5j2xzo-P8VYVaw001DZ7U0mxLIbf9NbhVD5aB0hACvek86dTpWPv7UJL_5E-VTa7jgM7w_BkV_deY7AxkRbELkIafmMC-L8g0r6Cvmp-gt46'></img>
                    <h3 class="text-xl font-bold text-[#181111]">James Bond</h3>
                    <p class="text-sm text-[#886364] mb-3">james.bond@mi6.gov.uk</p>
                    <div class="flex gap-2 justify-center">
                        <span class="px-2.5 py-1 rounded-md bg-[#fff8e1] text-[#b45309] text-xs font-bold uppercase tracking-wide border border-[#fde68a]">VIP</span>
                        <span class="px-2.5 py-1 rounded-md bg-[#f0f9ff] text-[#0369a1] text-xs font-bold uppercase tracking-wide border border-[#e0f2fe]">UK</span>
                    </div>
                    <div class="grid grid-cols-2 gap-3 w-full mt-6">
                        <button class="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f8f6f6] hover:bg-[#e5dcdc] transition-colors gap-2 group">
                            <span class="material-symbols-outlined text-[#181111] group-hover:scale-110 transition-transform">
                                <Mail />
                            </span>
                            <span class="text-xs font-medium text-[#181111]">Email</span>
                        </button>
                        <button class="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f8f6f6] hover:bg-[#e5dcdc] transition-colors gap-2 group">
                            <span class="material-symbols-outlined text-[#181111] group-hover:scale-110 transition-transform">
                                <Phone />
                            </span>
                            <span class="text-xs font-medium text-[#181111]">Call</span>
                        </button>
                    </div>
                </div>
                {/* Orders */}
                <div class="p-6 border-b border-[#e5dcdc]">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-sm font-bold text-[#181111] uppercase tracking-wider">Recent Orders</h4>
                        <a class="text-xs text-brand font-medium hover:underline" href="#">View all</a>
                    </div>
                    <div class="flex flex-col gap-4">
                        {/* Order Item */}
                        <div class="flex gap-3 group cursor-pointer">
                            <div class="size-12 rounded-lg bg-[#f8f6f6] flex items-center justify-center shrink-0 group-hover:bg-[#e5dcdc] transition-colors">
                                <span class="material-symbols-outlined text-[#886364]">watch</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <p class="text-sm font-medium text-[#181111] line-clamp-1 group-hover:text-brand transition-colors">Rolex Submariner</p>
                                </div>
                                <p class="text-xs text-[#886364]">#ORD-9921 • $12,500</p>
                                <div class="mt-1 flex items-center gap-1.5">
                                    <div class="size-1.5 rounded-full bg-green-500"></div>
                                    <span class="text-xs text-green-700 font-medium">Delivered</span>
                                </div>
                            </div>
                        </div>
                        {/* Order Item */}
                        <div class="flex gap-3 group cursor-pointer">
                            <div class="size-12 rounded-lg bg-[#f8f6f6] flex items-center justify-center shrink-0 group-hover:bg-[#e5dcdc] transition-colors">
                                <span class="material-symbols-outlined text-[#886364]">watch</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <p class="text-sm font-medium text-[#181111] line-clamp-1 group-hover:text-brand transition-colors">Omega Seamaster</p>
                                </div>
                                <p class="text-xs text-[#886364]">#ORD-8820 • $5,400</p>
                                <div class="mt-1 flex items-center gap-1.5">
                                    <div class="size-1.5 rounded-full bg-blue-500"></div>
                                    <span class="text-xs text-blue-700 font-medium">Shipped</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Notes */}
                <div class="p-6 flex-1 bg-[#fcfcfc]">
                    <h4 class="text-sm font-bold text-[#181111] uppercase tracking-wider mb-4">Staff Notes</h4>
                    <div class="bg-[#fffeeb] border border-[#fde68a] p-4 rounded-lg shadow-sm mb-4">
                        <p class="text-sm text-[#78350f] leading-relaxed">Customer prefers discreet packaging. Do not mention "Luxury" on the shipping label.</p>
                        <div class="mt-2 flex items-center gap-2">
                            <img class="size-5 rounded-full bg-cover bg-center" data-alt="Staff member Sarah avatar" src='https://lh3.googleusercontent.com/aida-public/AB6AXuDeXsmT_rNnx01imDoMZV81DdTchpFoUCnZOVe6lXdN0ELY64Ifkc43M_r_vGr6GbrL8K2cFsW-tnWS1UoevipjHehJXXiGJhK5FkphrhsGfWINaOTBk7CvdeedEa59lgR8jldY7T_gPJexwaysaD9DkU7o50F31XU0CMuKEB31pF1vCvu_SxubbKHkaZ1l6Q-4lZFoS1Eqc1_z3jJ3ku7huGiVmDXA6vObcTn5GEAZIf720YXEpzYqmSLpty5Tl2SCLh1UJxvWs9DX'></img>
                            <span class="text-xs text-[#b45309]">Added by Sarah • 2mo ago</span>
                        </div>
                    </div>
                    <button class="w-full py-2 rounded-lg border border-dashed border-[#e5dcdc] text-[#886364] hover:bg-white hover:border-brand hover:text-brand transition-all text-sm font-medium flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined text-lg">
                            <Plus />
                        </span>
                        Add Note
                    </button>
                </div>
            </aside>
        </div>
    );
};