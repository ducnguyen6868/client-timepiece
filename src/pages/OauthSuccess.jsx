import { useEffect, useContext } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import userApi from '../api/userApi';

export default function OauthSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    localStorage.setItem('token',token);

    const { setInfoUser } = useContext(UserContext);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await userApi.getUser(token);
                await setInfoUser(prev => ({
                    ...prev,
                    fullName: response.user.fullName,
                    email: response.user.email,
                    avatar: response.user.avatar
                }));
                navigate('/');
            } catch (err) {
                console.log(err.response?.data?.message || err.response);
            }
        }
        getUser();
    }, [token]);
}