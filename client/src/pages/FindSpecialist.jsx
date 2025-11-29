import { useState } from 'react';
import { MapPin, Search, Star, Navigation, Phone, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';

const FindSpecialist = () => {
    const { user } = useAuth();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [symptom, setSymptom] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    // Simple symptom to specialty mapping
    const getSpecialty = (text) => {
        const t = text.toLowerCase();
        if (t.includes('heart') || t.includes('chest')) return 'Cardiologist';
        if (t.includes('skin') || t.includes('rash')) return 'Dermatologist';
        if (t.includes('tooth') || t.includes('dental')) return 'Dentist';
        if (t.includes('bone') || t.includes('joint')) return 'Orthopedist';
        if (t.includes('eye') || t.includes('vision')) return 'Ophthalmologist';
        if (t.includes('stomach') || t.includes('digest')) return 'Gastroenterologist';
        if (t.includes('head') || t.includes('brain')) return 'Neurologist';
        return 'General Physician';
    };

    const handleGetLocation = () => {
        setLoading(true);
        setError('');
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLoading(false);
            },
            (err) => {
                setError('Unable to retrieve your location. Please allow location access.');
                setLoading(false);
            }
        );
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!symptom) return;

        setLoading(true);
        setError('');
        setDoctors([]);

        try {
            const specialty = getSpecialty(symptom);
            const token = localStorage.getItem('token');

            // Construct query params
            const params = new URLSearchParams({
                specialty,
                query: symptom
            });

            if (location) {
                params.append('lat', location.lat);
                params.append('lng', location.lng);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors/search?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setDoctors(data.data);
            } else {
                setError('Failed to fetch doctors');
            }
        } catch (err) {
            setError('An error occurred while searching');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <BackButton className="mb-6" />
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Find a Specialist Near You
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Enter your symptoms or health concern, and we'll connect you with the best authentic specialists in your area.
                </p>
            </div>

            {/* Search Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                What are your symptoms?
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={symptom}
                                    onChange={(e) => setSymptom(e.target.value)}
                                    placeholder="e.g., severe headache, chest pain, skin rash"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Location
                            </label>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${location
                                    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <MapPin className="h-5 w-5" />
                                {location ? 'Location Detected' : 'Use Current Location'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Searching...' : 'Find Doctors'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}
            </div>

            {/* Results Section */}
            {doctors.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {doctor.name}
                                        </h3>
                                        <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                            {doctor.specialty}
                                        </span>
                                    </div>
                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded dark:bg-yellow-900/20">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm font-medium text-yellow-700 dark:text-yellow-400">
                                            {doctor.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-1 shrink-0" />
                                        <span>{doctor.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Navigation className="h-4 w-4 shrink-0" />
                                        <span>{doctor.distance} away</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 shrink-0" />
                                        <span className={doctor.status === 'Open Now' ? 'text-green-600 font-medium' : ''}>
                                            {doctor.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                        Book Appointment
                                    </button>
                                    <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors">
                                        <Phone className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindSpecialist;
