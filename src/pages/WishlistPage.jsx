import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductCard from '../components/common/ProductCard';
import LoadingAnimations from '../components/common/LoadingAnimations';
import EmptyWishlist from '../components/common/EmptyWishlist';
import productApi from '../api/productApi';
import userApi from '../api/userApi';

export default function WishlistPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                let wishlist = localStorage.getItem('wishlist');
                wishlist = JSON.parse(wishlist);
                const response = await productApi.wishlist(wishlist);
                setProducts(response.products);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }

        }
        const getWishlist = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await userApi.wishlist();
                setProducts(response.products);
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
            getProducts();
        } else {
            getWishlist();
        }
    }, []);

    if (loading) {
        return (
            <LoadingAnimations option="dots_circle" />
        );
    };

    if (products?.length === 0) {
        return (
            <EmptyWishlist />
        )
    }

    return (
        <div
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5
                py-2 md:py-3 xl:py-4 gap-4 md:gap-6 xl:gap-8 p-4 md:p-6 xl:p-8'>
            {products.map((product, index) =>
            (
                <ProductCard key={index} product={product} />
            )
            )}
        </div>
    )
}