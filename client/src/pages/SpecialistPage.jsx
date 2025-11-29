import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Filter, Stethoscope, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const SpecialistPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalRole, setAuthModalRole] = useState('patient');

    const specialists = [
        {
            id: 1,
            name: 'Dr. Anjali Desai',
            specialty: 'Cardiology',
            qualification: 'MD, DM (Cardiology)',
            experience: '15 years',
            rating: 4.9,
            reviews: 124,
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
            location: 'Building A, Floor 3',
            languages: ['English', 'Hindi', 'Gujarati']
        },
        {
            id: 2,
            name: 'Dr. Rajesh Kumar',
            specialty: 'Neurology',
            qualification: 'MD, DM (Neurology)',
            experience: '12 years',
            rating: 4.8,
            reviews: 98,
            availability: 'Next Available: Tomorrow',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
            location: 'Building B, Floor 2',
            languages: ['English', 'Hindi']
        },
        {
            id: 3,
            name: 'Dr. Sneha Patil',
            specialty: 'Pediatrics',
            qualification: 'MD (Pediatrics)',
            experience: '10 years',
            rating: 4.9,
            reviews: 156,
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
            location: 'Building C, Floor 1',
            languages: ['English', 'Marathi', 'Hindi']
        },
        {
            id: 4,
            name: 'Dr. Vikram Singh',
            specialty: 'Orthopedics',
            qualification: 'MS (Orthopedics)',
            experience: '18 years',
            rating: 4.7,
            reviews: 89,
            availability: 'Next Available: Wed',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
            location: 'Building A, Floor 1',
            languages: ['English', 'Punjabi', 'Hindi']
        },
        {
            id: 5,
            name: 'Dr. Priya Sharma',
            specialty: 'Dermatology',
            qualification: 'MD (Dermatology)',
            experience: '8 years',
            rating: 4.9,
            reviews: 210,
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=200',
            location: 'Building B, Floor 4',
            languages: ['English', 'Hindi']
        },
        {
            id: 6,
            name: 'Dr. Amit Verma',
            specialty: 'General Medicine',
            qualification: 'MD (General Medicine)',
            experience: '20 years',
            rating: 4.8,
            reviews: 340,
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
            location: 'Building A, Floor 2',
            languages: ['English', 'Hindi', 'Bengali']
        }
    ];

    const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];

    const filteredSpecialists = specialists.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const handleBookAppointment = () => {
        if (user) {
            navigate('/book-appointment');
        } else {
            setAuthModalRole('patient');
            setIsAuthModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BackButton className="mb-6" />
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Specialist Consultations
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Book appointments with top specialists across various departments
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search doctors, specialties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                {specialties.map(specialty => (
                                    <button
                                        key={specialty}
                                        onClick={() => setSelectedSpecialty(specialty)}
                                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedSpecialty === specialty
                                            ? 'bg-cyan-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {specialty === 'all' ? 'All Specialties' : specialty}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Specialists Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSpecialists.map(doctor => (
                            <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover-lift transition-smooth overflow-hidden flex flex-col">
                                <div className="p-6 flex-1">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                                            <p className="text-cyan-600 dark:text-cyan-400 font-medium">{doctor.specialty}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.qualification}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                                            <span>({doctor.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <User className="h-4 w-4" />
                                            <span>{doctor.experience} experience</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <MapPin className="h-4 w-4" />
                                            <span>{doctor.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar className="h-4 w-4" />
                                            <span className={doctor.availability.includes('Today') ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                                                {doctor.availability}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {doctor.languages.map((lang, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        onClick={handleBookAppointment}
                                        className="w-full py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultRole={authModalRole}
            />
        </div>
    );
};

export default SpecialistPage;
