import { Route, Routes, BrowserRouter ,Navigate } from 'react-router-dom';
//Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/App.css';
import { UserProvider } from './contexts/UserProvider';

import Public from './components/layout/Public';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import BrandPage from './pages/BrandPage';
import CollectionPage from './pages/CollectionPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AddressPage from './pages/AddressPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrderPage from './pages/OrderPage';

import User from './components/layout/User';
import UserAuth from './hooks/userAuth';
import ProfilePage from './pages/ProfilePage';
import PointPage from './pages/PointPage';
import PromotionPage from './pages/PromotionPage';
import SettingPage from './pages/SettingPage';


import Admin from './components/layout/Admin';
import OverviewDashboard from './pages/OverviewDashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import PromotionManagement from './pages/PromotionManagement';
import UserManagement from './pages/UserManagement';
import ChatManagement from './pages/ChatManagement';
import AdminSettingPage from './pages/AdminSettingPage';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          {/* Các route chính */}
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path='/' element={<Public />}>
            <Route index element={<HomePage />}></Route>
            <Route path="collection/:slug" element={<CollectionPage />}></Route>
            <Route path="brand/:slug" element={<BrandPage />}></Route>
            <Route path="product/:slug" element={<ProductPage />}></Route>
            <Route path="search" element={<SearchResultsPage />}></Route>
            <Route path="product/checkout" element={<CheckoutPage />}></Route>
            <Route path="payment-result" element={<PaymentResultPage />}></Route>
            <Route path='cart' element={<CartPage />}></Route>
            <Route path='wishlist' element={<WishlistPage />}></Route>
            <Route path='order' element={<OrderPage />}></Route>
          </Route>

          {/* Các route danh cho User */}
          <Route path="/user" element={<User />}>
            <Route index path='profile' element={<UserAuth><ProfilePage /></UserAuth>}></Route>
            <Route path='point' element={<UserAuth><PointPage /></UserAuth>}></Route>
            <Route path='promotions' element={<UserAuth><PromotionPage /></UserAuth>}></Route>
            <Route path='orders' element={<UserAuth><OrderPage /></UserAuth>}></Route>
            <Route path='address' element={<UserAuth><AddressPage /></UserAuth>}></Route>
            <Route path='wishlist' element={<UserAuth><WishlistPage /></UserAuth>}></Route>
            <Route path='settings' element={<UserAuth><SettingPage /></UserAuth>}></Route>
          </Route>


          {/* Các route dành cho admin */}
          <Route path='/admin' element={<Admin />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path='overview' element={<OverviewDashboard />}></Route>
            <Route path='products' element={<ProductManagement />}></Route>
            <Route path='orders' element={<OrderManagement />}></Route>
            <Route path='promotions' element={<PromotionManagement />}></Route>
            <Route path='users' element={<UserManagement />}></Route>
            <Route path='chats' element={<ChatManagement />}></Route>
            <Route path='settings' element={<AdminSettingPage />}></Route>
          </Route>
        </Routes>

      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
