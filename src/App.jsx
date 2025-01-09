import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import ShopCategory from './pages/ShopCategory';
import SellerManagement from './pages/SellerManagement';
import BuyerManagement from './pages/BuyerManagement';
import VoucherManagement from './pages/VoucherManagement';
import BlogManagement from './pages/BlogManagement';
import NotificationManagement from './pages/NotificationManagement';
import AdminProfile from './pages/AdminProfile';
import Registration from './pages/Registration';
import BannerManagement from './pages/BannerManagement';
import LoginPage from './pages/Login';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/category" element={<ShopCategory />} />
        <Route path="/seller" element={<SellerManagement />} />
        <Route path="/buyer" element={<BuyerManagement />} />
        <Route path="/voucher" element={<VoucherManagement />} />
        <Route path="/blog" element={<BlogManagement />} />
        <Route path="/notification" element={<NotificationManagement />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/register/:type" element={<Registration />} />
        <Route path="/banner" element={<BannerManagement />} />
      </Routes>
    </>
  );
}

export default App;
