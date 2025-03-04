'use client';

import { Outlet } from 'react-router-dom';
import { ShoppingProvider } from '../../context/ShoppingContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from '../Navigation/Navbar';

export default function BlankLayout() {
    return (
        <ThemeProvider>
            <ShoppingProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                    <Navbar />
                    <Outlet />
                </div>
            </ShoppingProvider>
        </ThemeProvider>
    );
}
