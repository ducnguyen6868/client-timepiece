import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function UserAuth({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")||sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
