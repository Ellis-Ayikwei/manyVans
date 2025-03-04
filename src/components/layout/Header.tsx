import { faBars, faBell, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'provider' | 'admin';
}

interface HeaderProps {
    onMenuClick: () => void;
    isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Check if user is logged in
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm fixed w-full top-0 z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left side */}
                    <div className="flex items-center">
                        <button
                            onClick={onMenuClick}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <Link to="/" className="text-xl font-bold text-blue-600 ml-2">
                            Logo
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                        
                        <div className="relative group">
                            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </button>
                            
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </Link>
                                <hr className="my-1" />
                                <button
                                    onClick={() => {/* Add logout logic */}}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
