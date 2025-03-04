import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../components/Layouts/AboutUs';
import BlankLayout from '../components/Layouts/BlankLayout';
import MainLayout from '../components/Layouts/MainLayout';
import ForgotPassword from '../pages/auth/forgot-password';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Cart from '../pages/cart';
import Deals from '../pages/deals';
import Faq from '../pages/faq';
import Home from '../pages/Index';
import ProductDetail from '../pages/products/[id]';
import UserDashboard from '../pages/profile/settings';
import Returns from '../pages/returns';
import SellerDashboard from '../pages/sell';
import ShippingInfo from '../pages/shipping-info';
import Wishlist from '../pages/wishlist';

const Index = lazy(() => import('../pages/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'blank',
    },
    {
        path: '/aboutUs',
        element: <AboutUs />,
        layout: 'blank',
    },
];

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/sell', element: <SellerDashboard /> },
            { path: '/profile', element: <UserDashboard /> },
            { path: '/profile/settings', element: <UserDashboard activeTab="profile" /> },
            { path: '/profile/orders', element: <UserDashboard activeTab="orders" /> },
            { path: '/wishlist', element: <Wishlist /> },
            { path: '/cart', element: <Cart /> },
            { path: '/deals', element: <Deals /> },
            {
                path: 'products/:id',
                element: <ProductDetail />,
            },
            { path: 'faq', element: <Faq /> },
            { path: 'shipping-info', element: <ShippingInfo /> },
            { path: '/return-policy', element: <Returns /> },
        ],
    },
    {
        element: <BlankLayout />,
        children: [
            { path: '/auth/login', element: <Login /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/forgot-password', element: <ForgotPassword /> },
        ],
    },
]);
