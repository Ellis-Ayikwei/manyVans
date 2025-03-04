import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
import ContactModal from './ContactModal';

interface NavItemProps {
    item: {
        name: string;
        path?: string;
        action?: () => void;
    };
}

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const mystoryRef = useRef(null);
    const storeRef = useRef(null);
    const servicesRef = useRef(null);
    const productsRef = useRef(null);

    const mainNavItems = [{ name: 'Home', path: '/' }];
    const centerNavItems = [
        { name: 'About', path: '/aboutUs' },
        { name: 'Services', path: '#services' },
        { name: 'Products', path: '#products' },
    ];
    const endNavItems = [
        {
            name: 'Contact',
            action: () => setIsContactModalOpen(true),
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavItem = ({ item }: NavItemProps) => (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {item.action ? (
                <button
                    onClick={item.action}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50`}
                >
                    {item.name}
                </button>
            ) : item.path?.startsWith('#') ? (
                <button
                    onClick={() => scrollToSection(item.path!)}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        location.hash === item.path ? 'text-[#dc711a] font-semibold bg-orange-50' : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50'
                    }`}
                >
                    {item.name}
                </button>
            ) : (
                <Link
                    to={item.path!}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        location.pathname === item.path ? 'text-[#dc711a] font-semibold bg-orange-50' : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50'
                    }`}
                >
                    {item.name}
                </Link>
            )}
        </motion.div>
    );

    const Dot = () => <span className="text-gray-300 text-lg font-bold">•</span>;

    const scrollToSection = (elementId: string) => {
        const element = document.querySelector(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-2xl">
            <div className="max-w-[95%] mx-auto">
                <nav className="px-4 py-3">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex justify-center items-center">
                        <div className={`flex items-center gap-2 p-2 rounded-full bg-white/90 shadow-lg border border-gray-200`}>
                            {/* Home Section */}
                            <div className="flex items-center space-x-2 mr-10">
                                {mainNavItems.map((item) => (
                                    <NavItem key={item.path} item={item} />
                                ))}
                            </div>

                            {/* Separator */}
                            <span className="mx-4 text-gray-300 font-light">|</span>

                            {/* Center Navigation */}
                            <div className="flex items-center space-x-2">
                                {centerNavItems.map((item, index) => (
                                    <React.Fragment key={item.path}>
                                        <NavItem item={item} />
                                        {index < centerNavItems.length - 1 && <Dot />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Separator */}
                            <span className="mx-4 text-gray-300 font-light">|</span>

                            {/* End Section */}
                            <div className="flex items-center space-x-2 ml-10">
                                {endNavItems.map((item) => (
                                    <NavItem key={item.name} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-3 rounded-xl bg-white/90 shadow-md border border-gray-200 hover:bg-orange-50 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>

                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: isMobileMenuOpen ? 1 : 0,
                                y: isMobileMenuOpen ? 0 : -20,
                                display: isMobileMenuOpen ? 'block' : 'none',
                            }}
                            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 mt-2 rounded-2xl mx-4"
                        >
                            <div className="p-4 space-y-2">
                                {[...mainNavItems, ...centerNavItems].map((item) => (
                                    <div key={item.path} className="flex items-center">
                                        {item.path?.startsWith('#') ? (
                                            <button
                                                onClick={() => {
                                                    scrollToSection(item.path!);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className={`flex-1 flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                                    location.hash === item.path ? 'text-[#dc711a] bg-orange-50 font-semibold' : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50'
                                                }`}
                                            >
                                                <span className="text-lg mr-2">•</span>
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path!}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex-1 flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                                    location.pathname === item.path ? 'text-[#dc711a] bg-orange-50 font-semibold' : 'text-gray-600 hover:text-[#dc711a] hover:bg-orange-50/50'
                                                }`}
                                            >
                                                <span className="text-lg mr-2">•</span>
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                {/* Add Contact button to mobile menu */}
                                <button
                                    onClick={() => {
                                        setIsContactModalOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#dc711a] hover:bg-orange-50/50 transition-all duration-300"
                                >
                                    <span className="text-lg mr-2">•</span>
                                    Contact
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </nav>
            </div>

            {/* Add the modal */}
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </header>
    );
};

export default Header;
