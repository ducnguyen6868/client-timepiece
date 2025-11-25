import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingAnimations from '../components/common/LoadingAnimations';

export default function AuthAccount({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    const pathName = location.pathname.split('/');

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <LoadingAnimations option='dots_circle' />
        );
    }
    return isAuthenticated ? children : pathName.includes('admin') ? <Navigate to='/admin/login' replace /> : <Navigate to="/login" replace />;
}
