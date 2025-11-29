import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Calendar, Phone, MapPin, Heart } from 'lucide-react';
import BackButton from '../components/BackButton';

const RegisterPatient = () => {
    const navigate = useNavigate();
    const { register, user } = useAuth();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: 'patient123',
        phone: '',
        role: 'patient'
    });
    const [patientData, setPatientData] = useState({
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India'
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        },
        allergies: [],
        chronicConditions: []
    });

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
            setStep(2);
            toast.success('User account created!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create user');
        }
    };

    const handlePatientSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (!user || !user._id) {
                toast.error('User session not found. Please try again.');
                return;
            }

            // Create patient profile linked to the user
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/patients`, {
                userId: user._id,
                ...patientData
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`Patient registered successfully! UHID: ${response.data.uhid}`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to register patient');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <BackButton />

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Register New Patient</h1>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                        <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                1
                            </div>
                            <span className="ml-2 font-medium">User Account</span>
                        </div>
                        <div className={`w-24 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                2
                            </div>
                            <span className="ml-2 font-medium">Patient Details</span>
                        </div>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleUserSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <User className="inline mr-2" size={16} />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Phone className="inline mr-2" size={16} />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Continue to Patient Details
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePatientSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Calendar className="inline mr-2" size={16} />
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.dateOfBirth}
                                        onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Gender *
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.gender}
                                        onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Heart className="inline mr-2" size={16} />
                                        Blood Group
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.bloodGroup}
                                        onChange={(e) => setPatientData({ ...patientData, bloodGroup: e.target.value })}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <MapPin className="inline mr-2" size={16} />
                                    Address
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.address.street}
                                        onChange={(e) => setPatientData({ ...patientData, address: { ...patientData.address, street: e.target.value } })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.address.city}
                                        onChange={(e) => setPatientData({ ...patientData, address: { ...patientData.address, city: e.target.value } })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.address.state}
                                        onChange={(e) => setPatientData({ ...patientData, address: { ...patientData.address, state: e.target.value } })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ZIP Code"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.address.zipCode}
                                        onChange={(e) => setPatientData({ ...patientData, address: { ...patientData.address, zipCode: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.emergencyContact.name}
                                        onChange={(e) => setPatientData({ ...patientData, emergencyContact: { ...patientData.emergencyContact, name: e.target.value } })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Relationship"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.emergencyContact.relationship}
                                        onChange={(e) => setPatientData({ ...patientData, emergencyContact: { ...patientData.emergencyContact, relationship: e.target.value } })}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        value={patientData.emergencyContact.phone}
                                        onChange={(e) => setPatientData({ ...patientData, emergencyContact: { ...patientData.emergencyContact, phone: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Register Patient
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPatient;
