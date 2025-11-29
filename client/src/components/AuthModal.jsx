import { useState, useEffect } from 'react';
import { X, User, Stethoscope, Mail, Lock, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose, initialView = 'role', defaultRole = null }) => {
    const [view, setView] = useState(initialView); // 'role', 'login', 'signup'
    const [role, setRole] = useState(defaultRole || ''); // 'patient' or 'doctor'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        specialization: ''
    });
    const [loading, setLoading] = useState(false);

    const { login, register, loginAfterVerification, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [verificationData, setVerificationData] = useState(null);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    useEffect(() => {
        if (defaultRole) {
            setRole(defaultRole);
        }
    }, [defaultRole]);

    // Polling for email verification
    useEffect(() => {
        let interval;
        if (view === 'verify_email' && verificationData) {
            interval = setInterval(async () => {
                try {
                    const { auth } = await import('./firebase');
                    if (auth.currentUser) {
                        await auth.currentUser.reload();
                        if (auth.currentUser.emailVerified) {
                            clearInterval(interval);
                            loginAfterVerification(verificationData);
                            handleClose();
                            navigate('/dashboard');
                        }
                    }
                } catch (error) {
                    console.error('Verification check failed:', error);
                }
            }, 3000); // Check every 3 seconds
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [view, verificationData, navigate, loginAfterVerification]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setView('role');
        setRole(defaultRole || '');
        setFormData({
            email: '',
            password: '',
            name: '',
            phone: '',
            specialization: ''
        });
        setVerificationData(null);
        onClose();
    };

    const handleRoleSelect = (selectedRole, action) => {
        setRole(selectedRole);
        setView(action);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData);
            // Toast handled in context
            handleClose();
            navigate('/dashboard');
        } catch (error) {
            // Error handled in context
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle(role);
            handleClose();
            navigate('/dashboard');
        } catch (error) {
            // Error handled in context
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const signupData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone,
                role: role
            };

            if (role === 'doctor') {
                signupData.specialization = formData.specialization;
            }

            const { backendData } = await register(signupData);
            setVerificationData(backendData);
            setView('verify_email');
        } catch (error) {
            // Error handled in context
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={view === 'verify_email' ? undefined : handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
                {/* Close Button */}
                {view !== 'verify_email' && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                )}

                {/* Content */}
                <div className="p-8">
                    {/* Role Selection View */}
                    {view === 'role' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
                                <p className="text-gray-600">Choose your role to continue</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleRoleSelect('patient', initialView === 'login' ? 'login' : 'signup')}
                                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
                                            <User className="h-8 w-8 text-cyan-600" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-gray-900">Patient</h3>
                                            <p className="text-sm text-gray-600">Book appointments & manage health records</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleRoleSelect('doctor', initialView === 'login' ? 'login' : 'signup')}
                                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                                            <Stethoscope className="h-8 w-8 text-teal-600" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-gray-900">Doctor</h3>
                                            <p className="text-sm text-gray-600">Manage patients & appointments</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Login View */}
                    {view === 'login' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                                <p className="text-gray-600">Login as {role === 'patient' ? 'Patient' : 'Doctor'}</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-cyan-600 bg-gradient-hero text-white rounded-lg font-semibold hover:shadow-lg hover-glow transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign in with Google
                            </button>

                            <div className="text-center">
                                {!defaultRole && (
                                    <button
                                        onClick={() => setView('role')}
                                        className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                                    >
                                        ← Back to role selection
                                    </button>
                                )}
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setView('signup')}
                                        className="text-cyan-600 font-semibold hover:text-cyan-700"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Signup View */}
                    {view === 'signup' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-600">Sign up as {role === 'patient' ? 'Patient' : 'Doctor'}</p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                        placeholder="+1 234 567 8900"
                                        required
                                    />
                                </div>

                                {role === 'doctor' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Specialization
                                        </label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="e.g., Cardiology"
                                            required
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-cyan-600 bg-gradient-hero text-white rounded-lg font-semibold hover:shadow-lg hover-glow transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Creating account...' : 'Sign Up'}
                                </button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign up with Google
                            </button>

                            <div className="text-center">
                                <button
                                    onClick={() => setView('role')}
                                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                                >
                                    ← Back to role selection
                                </button>
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setView('login')}
                                        className="text-cyan-600 font-semibold hover:text-cyan-700"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Verify Email View */}
                    {view === 'verify_email' && (
                        <div className="space-y-6 text-center py-8">
                            <div className="mx-auto w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <Mail className="h-10 w-10 text-cyan-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

                            <p className="text-gray-600 max-w-sm mx-auto">
                                We've sent a verification link to <span className="font-semibold text-gray-900">{formData.email}</span>
                            </p>

                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 max-w-sm mx-auto">
                                <p>Please check your inbox and click the link to verify your account. This page will automatically update once verified.</p>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                    Waiting for verification...
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
