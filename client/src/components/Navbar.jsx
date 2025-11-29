import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onLoginClick, onSignupClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-hero p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                            Enterprise HMS
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!user ? (
                            <>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                >
                                    Features
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                >
                                    Contact
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/dashboard"
                                className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        {!user ? (
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="px-4 py-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={onSignupClick}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all shadow-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="font-medium">Logout</span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            {!user ? (
                                <>
                                    <button
                                        onClick={() => scrollToSection('home')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-left"
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('services')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-left"
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('features')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-left"
                                    >
                                        Features
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('about')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-left"
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('contact')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-left"
                                    >
                                        Contact
                                    </button>
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                        <button
                                            onClick={() => {
                                                onLoginClick();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-cyan-600 dark:text-cyan-400 border border-cyan-600 dark:border-cyan-400 rounded-lg font-medium hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => {
                                                onSignupClick();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all shadow-md"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
