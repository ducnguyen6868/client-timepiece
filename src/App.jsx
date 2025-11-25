import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
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

import AuthAccount from './middlewares/authAccount';

import User from './components/layout/User';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import PointPage from './pages/PointPage';
import PromotionPage from './pages/PromotionPage';
import SettingPage from './pages/SettingPage';


import Admin from './components/layout/Admin';
import AdminLogin from './pages/admin/AdminLogin';
import OverviewDashboard from './pages/admin/OverviewDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import PromotionManagement from './pages/admin/PromotionManagement';
import UserManagement from './pages/admin/UserManagement';
import ChatManagement from './pages/admin/ChatManagement';
import AdminSettingPage from './pages/admin/AdminSettingPage';

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
            <Route index element={<Navigate to='profile' replace />}></Route>
            <Route path='profile' element={<AuthAccount><ProfilePage /></AuthAccount>}></Route>
            <Route path='point' element={<AuthAccount><PointPage /></AuthAccount>}></Route>
            <Route path='wallet' element={<AuthAccount><WalletPage /></AuthAccount>}></Route>
            <Route path='promotions' element={<AuthAccount><PromotionPage /></AuthAccount>}></Route>
            <Route path='orders' element={<AuthAccount><OrderPage /></AuthAccount>}></Route>
            <Route path='address' element={<AuthAccount><AddressPage /></AuthAccount>}></Route>
            <Route path='wishlist' element={<AuthAccount><WishlistPage /></AuthAccount>}></Route>
            <Route path='settings' element={<AuthAccount><SettingPage /></AuthAccount>}></Route>
          </Route>


          {/* Các route dành cho admin */}
          <Route path='/admin/login' element={<AdminLogin />}></Route>

          <Route path='/admin' element={<Admin />}>
            <Route index element={<Navigate to='overview' replace />}></Route>
            <Route path='overview' element={<AuthAccount><OverviewDashboard /></AuthAccount>}></Route>
            <Route path='products' element={<AuthAccount><ProductManagement /></AuthAccount>}></Route>
            <Route path='orders' element={<AuthAccount><OrderManagement /></AuthAccount>}></Route>
            <Route path='promotions' element={<AuthAccount><PromotionManagement /></AuthAccount>}></Route>
            <Route path='users' element={<AuthAccount><UserManagement /></AuthAccount>}></Route>
            <Route path='chats' element={<AuthAccount><ChatManagement /></AuthAccount>}></Route>
            <Route path='settings' element={<AuthAccount><AdminSettingPage /></AuthAccount>}></Route>
          </Route>
        </Routes>
      </UserProvider>

    </BrowserRouter>
  );
}

export default App;
