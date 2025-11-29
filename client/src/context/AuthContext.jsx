import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { auth } from '../components/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    deleteUser
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(data);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const register = async (userData) => {
        let firebaseUser = null;
        try {
            // 1. Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            firebaseUser = userCredential.user;

            // 2. Send verification email
            await sendEmailVerification(firebaseUser);

            // 3. Register in Backend
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);

            // 4. Return data for UI to handle polling
            // We DO NOT sign out here anymore, so the UI can poll user.reload()

            toast.success('Verification email sent! Please check your inbox.');
            return { firebaseUser, backendData: data };
        } catch (error) {
            // Rollback: Delete Firebase user if backend registration fails
            if (firebaseUser) {
                try {
                    await deleteUser(firebaseUser);
                } catch (deleteError) {
                    console.error('Failed to rollback Firebase user:', deleteError);
                }
            }

            console.error('Registration Error:', error);
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            // 1. Login with Firebase
            const userCredential = await signInWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
            );

            // Force refresh to get latest emailVerified status
            await userCredential.user.reload();
            const user = auth.currentUser;

            // 2. Check if email is verified
            if (!user.emailVerified) {
                // Offer to resend verification email
                try {
                    await sendEmailVerification(user);
                    toast.error('Email not verified. A new verification link has been sent to your email.');
                } catch (emailError) {
                    toast.error('Please verify your email before logging in.');
                }

                await signOut(auth);
                throw new Error('Please verify your email before logging in.');
            }

            // 3. Login to Backend
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
            localStorage.setItem('token', data.token);
            setUser(data);
            toast.success('Login successful!');
            return data;
        } catch (error) {
            console.error('Login Error:', error);
            const errorMessage = error.response?.data?.message || error.message;

            // Handle specific Firebase errors
            if (errorMessage.includes('auth/invalid-credential')) {
                toast.error('Invalid email or password');
            } else if (!errorMessage.includes('verification link has been sent')) {
                // Don't show generic error if we already showed the specific resend message
                toast.error(errorMessage);
            }
            throw error;
        }
    };

    const loginWithGoogle = async (role = 'patient') => {
        try {
            const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
            const { googleProvider } = await import('../components/firebase');

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Register/Login in Backend
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google-login`, {
                email: user.email,
                name: user.displayName || user.email.split('@')[0],
                photoURL: user.photoURL,
                role: role
            });

            localStorage.setItem('token', data.token);
            setUser(data);
            toast.success('Login successful!');
            return data;
        } catch (error) {
            console.error('Google Login Error:', error);
            const errorMessage = error.response?.data?.message || 'Google login failed. Please try again.';
            toast.error(errorMessage);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        signOut(auth).catch(console.error);
        toast.success('Logged out successfully');
    };

    const loginAfterVerification = (backendData) => {
        localStorage.setItem('token', backendData.token);
        setUser(backendData);
        toast.success('Email verified! Logging you in...');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, loginAfterVerification, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};
