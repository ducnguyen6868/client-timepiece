import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
export const UserProvider = ({ children }) => {

    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let wishlist = localStorage.getItem('wishlist');
    wishlist = wishlist ? JSON.parse(wishlist) : [];

    const [locale, setLocale] = useState('en-US');
    const [currency, setCurrency] = useState('USD');
    const [infoUser, setInfoUser] = useState({
        name: '',
        email: '',
        avatar: '',
        wishlist: wishlist?.length || 0,
        cart: cart?.length || 0,
        conversationId:''
    });

    useEffect(() => {
        const getInfoUser = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("profile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setInfoUser({
                        name: response.data.user.name,
                        email: response.data.user.email,
                        avatar: response.data.user.avatar,
                        wishlist: response.data.user.wishlist?.length || 0,
                        cart: response.data.user.carts?.length || 0
                    })
                } catch (err) {
                    toast.error(err.response?.data?.message || err.message);
                    localStorage.removeItem('token');
                }
            }
        }
        getInfoUser();
    }, []);
    return (
        <>
            <UserContext.Provider value={{ infoUser, setInfoUser, locale, setLocale, currency, setCurrency }}>
                {children}
            </UserContext.Provider>
        </>
    )


}