import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Homepage from './pages/Homepage';
import HowItWorks from './pages/HowItWorks';
import NotFound from './pages/NotFound';
import JobBoard from './pages/provider/JobBoard';
import JobDetail from './pages/provider/JobDetail';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProviderOnboarding from './pages/provider/ProviderOnboarding';
import ServiceDetail from './pages/service/ServiceDetail';
import ServiceRequestForm from './pages/ServiceRequestForm';
import BookingConfirmation from './pages/user/BookingConfirmation';
import BookingTracking from './pages/user/BookingTracking';
import ProviderListings from './pages/user/ProviderListings';
import UserDashboard from './pages/user/UserDashboard';
import UserDetail from './pages/user/UserDetail';
import UserSettings from './pages/user/UserSettings';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/service-request" element={<ServiceRequestForm />} />

                    {/* User Routes */}
                    <Route path="/providers/:requestId" element={<ProviderListings />} />
                    <Route path="/booking-confirmation/:requestId/:providerId" element={<BookingConfirmation />} />
                    <Route path="/tracking/:id" element={<BookingTracking />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/user/:userId" element={<UserDetail />} />
                    <Route path="/service/:serviceId" element={<ServiceDetail />} />
                    <Route path="settings" element={<UserSettings />} />

                    {/* Provider Routes */}
                    <Route path="/provider/onboarding" element={<ProviderOnboarding />} />
                    <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                    <Route path="/provider/jobs" element={<JobBoard />} />
                    <Route path="/provider/jobs/:id" element={<JobDetail />} />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users/:id" element={<UserDetail />} />

                    {/* How It Works Route */}
                    <Route path="/how-it-works" element={<HowItWorks />} />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
