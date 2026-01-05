import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
export const UserProvider = ({ children }) => {

    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let wishlist = localStorage.getItem('wishlist');
    wishlist = wishlist ? JSON.parse(wishlist) : [];

    const [locale, setLocale] = useState('en-US');
    const [currency, setCurrency] = useState('USD');
    const [infoUser, setInfoUser] = useState({
        code:'',
        fullName: '',
        email: '',
        avatar: '',
        role:'',
        wishlist: wishlist?.length || 0,
        cart: cart?.length || 0,
        conversationId:''
    });

    useEffect(() => {
        const getInfoUser = async () => {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token') || sessionStorage.getItem("token");
            if (!token ) return;
            try {
                const response = await axios.get(`${API_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInfoUser({
                    code: response.data.user.code,
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                    avatar: response.data.user.avatar,
                    role:response.data.user.role,
                    wishlist: response.data.user.wishlist?.length || 0,
                    cart: response.data.user.carts?.length || 0
                })
            } catch (err) {
                console.log(err);
            };
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