import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import wishlist404 from '../assets/wishlist404.png';
import ProductCard from '../components/common/ProductCard';
import productApi from '../api/productApi';
import userApi from '../api/userApi';

export default function WishlistPage() {
    const [products, setProducts] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getProducts = async () => {
            try {
                let wishlist = localStorage.getItem('wishlist');
                wishlist = JSON.parse(wishlist);
                const response = await productApi.wishlist(wishlist);
                setProducts(response.products);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }

        }
        const getWishlist = async () => {
            try {
                const response = await userApi.wishlist();
                setProducts(response.products);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    localStorage.removeItem('token');
                }
                toast.error(err.response?.data?.message || err.message)
            }
        }
        if (!token) {
            getProducts();
        } else {
            getWishlist();
        }
    }, [change]);
    return (
        <>
            {products.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4
                py-2 md:py-3 xl:py-4 
                gap-4 md:gap-6 xl:gap-8 '>
                    {products.map((product, index) => 
                        (
                            <ProductCard key={index} product={product} onChange={()=>setChange(!change)} />
                        )
                    )}
                </div>
            ) : (
                <div className='empty-container'>
                    <img className='empty-image' src={wishlist404} alt='Wishlit Emty' title='Wishlist Emty' />
                    <Link to='/' className='shopping-btn'>Shopping now</Link>
                </div>
            )}
        </>
    )
}