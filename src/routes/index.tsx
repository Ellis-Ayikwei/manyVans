import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import ForgotPassword from '../pages/auth/forgot-password';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Cart from '../pages/cart';
import Categories from '../pages/categories';
import Deals from '../pages/deals';
import ProductDetail from '../pages/products/[id]';
import Profile from '../pages/profile';
import Sell from '../pages/sell';
import Settings from '../pages/settings';
import Wishlist from '../pages/wishlist';
import Index from '../pages/Index';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: 'products/:id',
                element: <ProductDetail />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'categories',
                element: <Categories />,
            },
            {
                path: 'wishlist',
                element: <Wishlist />,
            },
            {
                path: 'profile',
                element: <Profile />,
                children: [
                    {
                        path: 'settings',
                        element: <Settings />,
                    },
                ],
            },
            {
                path: 'sell',
                element: <Sell />,
            },
            {
                path: 'deals',
                element: <Deals />,
            },
            {
                path: 'auth/login',
                element: <Login />,
            },
            {
                path: 'auth/register',
                element: <Register />,
            },
            {
                path: 'auth/forgot-password',
                element: <ForgotPassword />,
            },
        ],
    },
]);
