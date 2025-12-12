import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import WatchCard from '../components/common/WatchCard';
import LoadingAnimations from '../components/common/LoadingAnimations';
import EmptyWishlist from '../components/common/EmptyWishlist';
import watchApi from '../api/watchApi';
import userApi from '../api/userApi';

export default function WishlistPage() {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getWatches = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 200));

                let wishlist = localStorage.getItem('wishlist');
                wishlist = JSON.parse(wishlist);
                const response = await watchApi.wishlist(wishlist);
                setWatches(response.watches);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }

        }
        const getWishlist = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 200));
                const response = await userApi.getWishlist();
                setWatches(response.watches);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    localStorage.removeItem('token');
                }
                toast.error(err.response?.data?.message || err.message)
            } finally {
                setLoading(false);
            }
        }
        if (!token) {
            getWatches();
        } else {
            getWishlist();
        }
    }, []);

    if (loading) {
        return (
            <LoadingAnimations option="dots_circle" />
        );
    };

    if (watches?.length === 0) {
        return (
            <EmptyWishlist />
        )
    }

    return (
        <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
            {watches.map((watch, index) =>
            (
                <WatchCard key={index} watch={watch} />
            )
            )}
        </div>
    )
}