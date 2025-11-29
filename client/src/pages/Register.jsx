import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowLeft } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'patient'
    });
    const { register, loginAfterVerification } = useAuth();
    const navigate = useNavigate();
    const [view, setView] = useState('register'); // 'register' or 'verify_email'
    const [verificationData, setVerificationData] = useState(null);

    // Polling for email verification
    useEffect(() => {
        let interval;
        if (view === 'verify_email' && verificationData) {
            interval = setInterval(async () => {
                try {
                    const { auth } = await import('../components/firebase');
                    if (auth.currentUser) {
                        await auth.currentUser.reload();
                        if (auth.currentUser.emailVerified) {
                            clearInterval(interval);
                            loginAfterVerification(verificationData);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { backendData } = await register(formData);
            setVerificationData(backendData);
            setView('verify_email');
        } catch (error) {
            // Error handled in context
        }
    };

    if (view === 'verify_email') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
                <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center">
                    <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <UserPlus className="h-10 w-10 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify your email</h2>

                    <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                        We've sent a verification link to <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span>
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300 max-w-sm mx-auto">
                        <p>Please check your inbox and click the link to verify your account. This page will automatically update once verified.</p>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            Waiting for verification...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                <div className="text-center">
                    <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Register for Enterprise HMS
                    </p>
                </div>

                <div className="absolute top-4 left-4">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-1" />
                        Back to Home
                    </Link>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone
                            </label>
                            <input
                                type="tel"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Role
                            </label>
                            <select
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="nurse">Nurse</option>
                                <option value="receptionist">Receptionist</option>
                                <option value="pharmacist">Pharmacist</option>
                                <option value="lab_technician">Lab Technician</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
