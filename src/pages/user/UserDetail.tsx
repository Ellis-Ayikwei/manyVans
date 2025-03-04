import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'provider' | 'admin';
    status: 'active' | 'inactive' | 'pending';
    joinDate: string;
}

const UserDetail: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock data
            const mockUser: User = {
                id: userId || 'U-1001',
                name: 'John Smith',
                email: 'john.smith@example.com',
                role: 'user',
                status: 'active',
                joinDate: '2023-01-15T10:30:00',
            };

            setUser(mockUser);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user details:', err);
            setError('Failed to load user details. Please try again.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Status:</strong> {user?.status}</p>
                <p><strong>Join Date:</strong> {new Date(user?.joinDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default UserDetail; 