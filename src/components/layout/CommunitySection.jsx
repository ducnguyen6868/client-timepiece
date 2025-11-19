import { useState, useEffect } from "react";
import { Heart } from 'lucide-react';
import communityApi from '../../api/communityApi';

export default function CommunitySection() {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const getCommunites = async () => {
            try {
                const page = 1;
                const limit = 4;
                const response = await communityApi.getCommunities(page, limit);
                setCommunities(response.communities);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        getCommunites();
    }, []);
    return (
        <>
            {/* Community */}
            <section className="bg-bg-primary py-4 px-8 transition-colors duration-500">
                <div className="mx-auto">
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8">
                        {communities?.map((post, idx) => (
                            <div
                                key={idx}
                                className={`bg-bg-secondary rounded-lg overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp visible`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-bg-tertiary">
                                    <img
                                        src={`${REACT_APP_API_URL}`+`/${post.image}`}
                                        alt={post.name}
                                        className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-2 sm:p-3 md:p-4">
                                    {/* Author Info */}
                                    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 mb-2">
                                        <img
                                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 object-cover"
                                            src={`${REACT_APP_API_URL}`+`/${post.avatar}`}
                                            alt={post.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/400x300/94a3b8/ffffff?text=Author';
                                            }}
                                        />
                                        <span className="font-semibold text-[10px] sm:text-xs md:text-sm text-text-primary truncate">
                                            {post.name}
                                        </span>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
                                        {post.comment}
                                    </p>

                                    {/* Like Button */}
                                    <button
                                        className="text-text-muted hover:text-error transition-colors transform hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-bg-tertiary"
                                        aria-label="Like post"
                                    >
                                        <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}