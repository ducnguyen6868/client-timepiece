import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/App.css';
import { UserProvider } from './contexts/UserProvider';

import PageNotFound from './pages/PageNotFound';

import Public from './components/layout/Public';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import WatchPage from './pages/WatchPage';
import BrandPage from './pages/BrandPage';
import PromotionPage from './pages/PromotionPage';
import FlashSalePage from './pages/FlashSalePage';
import CollectionPage from './pages/CollectionPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AddressPage from './pages/AddressPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';
import BrandList from './pages/BandList';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Recruitment from './pages/Recruitment';
import ShowRoom from './pages/ShowRoom';
import FQA from './pages/FQA';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ReturnAndWarranty from './pages/ReturnAndWarranty';
import Feedback from './pages/FeedBack';
import LeaderBoard from './pages/LeaderBoard';
import RecentContributions from './pages/RecentContributions';

import AuthAccount from './middlewares/authAccount';

import User from './components/layout/User';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import PointPage from './pages/PointPage';
import SettingPage from './pages/SettingPage';
import MyPromotion from './pages/MyPromotion';

import Admin from './components/layout/Admin';
import AdminLogin from './pages/admin/AdminLogin';
import OverviewDashboard from './pages/admin/OverviewDashboard';
import WatchManagement from './pages/admin/WatchManagement';
import OrderManagement from './pages/admin/OrderManagement';
import PromotionManagement from './pages/admin/PromotionManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import StaffManagement from './pages/admin/StaffManagement';
import Analytics from './pages/admin/Analytics';
import ChatManagement from './pages/admin/ChatManagement';
import NotificationsActivity from './pages/admin/NotificationsActivity';
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
            <Route path="flash-sale" element={<FlashSalePage />}></Route>
            <Route path="about-us" element={<AboutUs />}></Route>
            <Route path="blog" element={<Blog />}></Route>
            <Route path="recruitment" element={<Recruitment />}></Route>
            <Route path="showroom" element={<ShowRoom />}></Route>
            <Route path="fqa" element={<FQA />}></Route>
            <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="terms-of-use" element={<TermsOfUse />}></Route>
            <Route path="return-and-warranty" element={<ReturnAndWarranty />}></Route>
            <Route path="collection/:slug" element={<CollectionPage />}></Route>
            <Route path="feed-back" element={<Feedback />}></Route>
            <Route path="leader-board" element={<LeaderBoard />}></Route>
            <Route path="recent-contributions" element={<RecentContributions />}></Route>
            <Route path="brands" element={<BrandList />}></Route>
            <Route path="brand/:slug" element={<BrandPage />}></Route>
            <Route path="promotions" element={<PromotionPage />}></Route>
            <Route path="watch/:slug" element={<WatchPage />}></Route>
            <Route path="category/:slug" element={<CategoryPage />}></Route>
            <Route path="search" element={<SearchResultsPage />}></Route>
            <Route path="watch/checkout" element={<CheckoutPage />}></Route>
            <Route path="payment-result" element={<PaymentResultPage />}></Route>
            <Route path='cart' element={<CartPage />}></Route>
            <Route path='order-history' element={<OrderHistoryPage />}></Route>
            <Route path='order-detail/:orderId' element={<OrderDetailPage />}></Route>
          </Route>

          {/* Các route danh cho User */}
          <Route path="/user" element={<User />}>
            <Route index element={<Navigate to='profile' replace />}></Route>
            <Route path='profile' element={<AuthAccount><ProfilePage /></AuthAccount>}></Route>
            <Route path='point' element={<AuthAccount><PointPage /></AuthAccount>}></Route>
            <Route path='wallet' element={<AuthAccount><WalletPage /></AuthAccount>}></Route>
            <Route path='promotions' element={<AuthAccount><MyPromotion /></AuthAccount>}></Route>
            <Route path='orders-history' element={<AuthAccount><OrderHistoryPage /></AuthAccount>}></Route>
            <Route path='order-detail/:orderId' element={<AuthAccount><OrderDetailPage /></AuthAccount>}></Route>
            <Route path='address' element={<AuthAccount><AddressPage /></AuthAccount>}></Route>
            <Route path='wishlist' element={<AuthAccount><WishlistPage /></AuthAccount>}></Route>
            <Route path='settings' element={<AuthAccount><SettingPage /></AuthAccount>}></Route>
          </Route>


          {/* Các route dành cho admin */}
          <Route path='/admin/login' element={<AdminLogin />}></Route>

          <Route path='/admin' element={<Admin />}>
            <Route index element={<Navigate to='overview' replace />}></Route>
            <Route path='overview' element={<AuthAccount><OverviewDashboard /></AuthAccount>}></Route>
            <Route path='watches' element={<AuthAccount><WatchManagement /></AuthAccount>}></Route>
            <Route path='orders' element={<AuthAccount><OrderManagement /></AuthAccount>}></Route>
            <Route path='analytics' element={<AuthAccount><Analytics /></AuthAccount>}></Route>
            <Route path='promotions' element={<AuthAccount><PromotionManagement /></AuthAccount>}></Route>
            <Route path='customers' element={<AuthAccount><CustomerManagement /></AuthAccount>}></Route>
            <Route path='staffs' element={<AuthAccount><StaffManagement /></AuthAccount>}></Route>
            <Route path='chats' element={<ChatManagement />}></Route>
            <Route path='settings' element={<AuthAccount><AdminSettingPage /></AuthAccount>}></Route>
            <Route path='notifications-activity' element={<AuthAccount><NotificationsActivity /></AuthAccount>}></Route>
          </Route>

          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </UserProvider>

    </BrowserRouter>
  );
}

export default App;
