import React, { useState } from 'react';
import {
    Bed,
    Users,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowRight,
    Search,
    Filter,
    UserPlus,
    UserMinus,
    Activity,
    Heart,
    Stethoscope,
    Shield,
    Phone,
    MapPin,
    Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const WardAvailability = () => {
    const navigate = useNavigate();
    const [selectedWard, setSelectedWard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDischargeModal, setShowDischargeModal] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);

    // Mock ward data
    const wards = [
        {
            id: 1,
            name: 'General Ward',
            type: 'general',
            floor: 2,
            totalBeds: 40,
            occupiedBeds: 28,
            availableBeds: 12,
            icon: Bed,
            color: 'blue',
            facilities: ['AC', 'TV', 'Attached Bathroom', 'Nurse Call'],
            pricePerDay: 1500,
            beds: Array.from({ length: 40 }, (_, i) => ({
                bedNumber: `G${i + 1}`,
                status: i < 28 ? 'occupied' : 'available',
                patientName: i < 28 ? `Patient ${i + 1}` : null,
                admissionDate: i < 28 ? '2025-11-25' : null,
                condition: i < 28 ? (i % 3 === 0 ? 'stable' : i % 3 === 1 ? 'critical' : 'recovering') : null
            }))
        },
        {
            id: 2,
            name: 'ICU',
            type: 'icu',
            floor: 3,
            totalBeds: 20,
            occupiedBeds: 18,
            availableBeds: 2,
            icon: Activity,
            color: 'red',
            facilities: ['24/7 Monitoring', 'Ventilator', 'Advanced Equipment', 'Dedicated Staff'],
            pricePerDay: 8000,
            beds: Array.from({ length: 20 }, (_, i) => ({
                bedNumber: `ICU${i + 1}`,
                status: i < 18 ? 'occupied' : 'available',
                patientName: i < 18 ? `Critical Patient ${i + 1}` : null,
                admissionDate: i < 18 ? '2025-11-26' : null,
                condition: i < 18 ? 'critical' : null
            }))
        },
        {
            id: 3,
            name: 'Private Ward',
            type: 'private',
            floor: 4,
            totalBeds: 25,
            occupiedBeds: 15,
            availableBeds: 10,
            icon: Shield,
            color: 'purple',
            facilities: ['Private Room', 'AC', 'TV', 'Sofa', 'Mini Fridge', 'Attached Bathroom'],
            pricePerDay: 3500,
            beds: Array.from({ length: 25 }, (_, i) => ({
                bedNumber: `P${i + 1}`,
                status: i < 15 ? 'occupied' : 'available',
                patientName: i < 15 ? `VIP Patient ${i + 1}` : null,
                admissionDate: i < 15 ? '2025-11-24' : null,
                condition: i < 15 ? 'stable' : null
            }))
        },
        {
            id: 4,
            name: 'Pediatric Ward',
            type: 'pediatric',
            floor: 2,
            totalBeds: 30,
            occupiedBeds: 20,
            availableBeds: 10,
            icon: Heart,
            color: 'pink',
            facilities: ['Child-Friendly', 'Play Area', 'Parent Bed', 'Pediatric Nurse'],
            pricePerDay: 2000,
            beds: Array.from({ length: 30 }, (_, i) => ({
                bedNumber: `PED${i + 1}`,
                status: i < 20 ? 'occupied' : 'available',
                patientName: i < 20 ? `Child Patient ${i + 1}` : null,
                admissionDate: i < 20 ? '2025-11-27' : null,
                condition: i < 20 ? 'recovering' : null
            }))
        },
        {
            id: 5,
            name: 'Maternity Ward',
            type: 'maternity',
            floor: 3,
            totalBeds: 20,
            occupiedBeds: 12,
            availableBeds: 8,
            icon: Users,
            color: 'teal',
            facilities: ['Labor Room', 'Nursery', 'Lactation Support', 'Gynecologist on Call'],
            pricePerDay: 2500,
            beds: Array.from({ length: 20 }, (_, i) => ({
                bedNumber: `MAT${i + 1}`,
                status: i < 12 ? 'occupied' : 'available',
                patientName: i < 12 ? `Mother ${i + 1}` : null,
                admissionDate: i < 12 ? '2025-11-28' : null,
                condition: i < 12 ? 'stable' : null
            }))
        },
        {
            id: 6,
            name: 'Post-Operative Ward',
            type: 'postop',
            floor: 4,
            totalBeds: 15,
            occupiedBeds: 10,
            availableBeds: 5,
            icon: Stethoscope,
            color: 'green',
            facilities: ['Recovery Monitoring', 'Pain Management', 'Physiotherapy', 'Nurse Station'],
            pricePerDay: 3000,
            beds: Array.from({ length: 15 }, (_, i) => ({
                bedNumber: `PO${i + 1}`,
                status: i < 10 ? 'occupied' : 'available',
                patientName: i < 10 ? `Post-Op Patient ${i + 1}` : null,
                admissionDate: i < 10 ? '2025-11-27' : null,
                condition: i < 10 ? 'recovering' : null
            }))
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: 'bg-blue-100 dark:bg-blue-900/30',
                text: 'text-blue-600 dark:text-blue-400',
                gradient: 'from-blue-500 to-cyan-500',
                badge: 'bg-blue-500'
            },
            red: {
                bg: 'bg-red-100 dark:bg-red-900/30',
                text: 'text-red-600 dark:text-red-400',
                gradient: 'from-red-500 to-orange-500',
                badge: 'bg-red-500'
            },
            purple: {
                bg: 'bg-purple-100 dark:bg-purple-900/30',
                text: 'text-purple-600 dark:text-purple-400',
                gradient: 'from-purple-500 to-pink-500',
                badge: 'bg-purple-500'
            },
            pink: {
                bg: 'bg-pink-100 dark:bg-pink-900/30',
                text: 'text-pink-600 dark:text-pink-400',
                gradient: 'from-pink-500 to-rose-500',
                badge: 'bg-pink-500'
            },
            teal: {
                bg: 'bg-teal-100 dark:bg-teal-900/30',
                text: 'text-teal-600 dark:text-teal-400',
                gradient: 'from-teal-500 to-cyan-500',
                badge: 'bg-teal-500'
            },
            green: {
                bg: 'bg-green-100 dark:bg-green-900/30',
                text: 'text-green-600 dark:text-green-400',
                gradient: 'from-green-500 to-emerald-500',
                badge: 'bg-green-500'
            }
        };
        return colors[color] || colors.blue;
    };

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'critical':
                return 'text-red-600 bg-red-100 dark:bg-red-900/30';
            case 'stable':
                return 'text-green-600 bg-green-100 dark:bg-green-900/30';
            case 'recovering':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    const filteredWards = wards.filter(ward => {
        const matchesSearch = ward.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || ward.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleBookBed = (bed) => {
        setSelectedBed(bed);
        setShowBookingModal(true);
    };

    const handleDischarge = (bed) => {
        setSelectedBed(bed);
        setShowDischargeModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <BackButton className="mb-4" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Ward Availability
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Real-time bed availability and ward management
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 md:mt-0 flex space-x-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-green-600">{wards.reduce((sum, w) => sum + w.availableBeds, 0)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Available Beds</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-red-600">{wards.reduce((sum, w) => sum + w.occupiedBeds, 0)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Occupied Beds</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search wards..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="all">All Wards</option>
                        <option value="general">General</option>
                        <option value="icu">ICU</option>
                        <option value="private">Private</option>
                        <option value="pediatric">Pediatric</option>
                        <option value="maternity">Maternity</option>
                        <option value="postop">Post-Operative</option>
                    </select>
                </div>
            </div>

            {/* Ward Cards */}
            {!selectedWard ? (
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWards.map((ward) => {
                        const colorScheme = getColorClasses(ward.color);
                        const occupancyPercentage = (ward.occupiedBeds / ward.totalBeds) * 100;

                        return (
                            <div
                                key={ward.id}
                                onClick={() => setSelectedWard(ward)}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${colorScheme.gradient} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center`}>
                                            <ward.icon className="h-6 w-6" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm opacity-90">Floor {ward.floor}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold">{ward.name}</h3>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Availability */}
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Occupancy</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{occupancyPercentage.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                            <div
                                                className={`bg-gradient-to-r ${colorScheme.gradient} h-3 rounded-full transition-all duration-300`}
                                                style={{ width: `${occupancyPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-2 text-sm">
                                            <span className="text-green-600 dark:text-green-400 font-semibold">
                                                {ward.availableBeds} Available
                                            </span>
                                            <span className="text-red-600 dark:text-red-400 font-semibold">
                                                {ward.occupiedBeds} Occupied
                                            </span>
                                        </div>
                                    </div>

                                    {/* Facilities */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Facilities</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {ward.facilities.slice(0, 3).map((facility, idx) => (
                                                <span key={idx} className={`text-xs px-2 py-1 ${colorScheme.bg} ${colorScheme.text} rounded-full`}>
                                                    {facility}
                                                </span>
                                            ))}
                                            {ward.facilities.length > 3 && (
                                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                                    +{ward.facilities.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Price per day</div>
                                            <div className={`text-2xl font-bold ${colorScheme.text}`}>₹{ward.pricePerDay}</div>
                                        </div>
                                        <button className={`bg-gradient-to-r ${colorScheme.gradient} text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105 flex items-center space-x-2`}>
                                            <span>View Details</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Ward Details View */
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => setSelectedWard(null)}
                        className="mb-6 text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-2"
                    >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        <span>Back to All Wards</span>
                    </button>

                    {/* Ward Header */}
                    <div className={`bg-gradient-to-r ${getColorClasses(selectedWard.color).gradient} rounded-2xl p-8 text-white mb-6 shadow-xl`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">{selectedWard.name}</h2>
                                <p className="text-white/90">Floor {selectedWard.floor} • {selectedWard.totalBeds} Total Beds</p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl font-bold">{selectedWard.availableBeds}</div>
                                <div className="text-white/90">Beds Available</div>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {selectedWard.facilities.map((facility, idx) => (
                                <span key={idx} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold">
                                    {facility}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bed Layout */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bed Layout</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {selectedWard.beds.map((bed) => (
                                <div
                                    key={bed.bedNumber}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${bed.status === 'available'
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 hover:shadow-lg cursor-pointer hover:-translate-y-1'
                                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                        }`}
                                    onClick={() => bed.status === 'available' && handleBookBed(bed)}
                                >
                                    {/* Bed Icon */}
                                    <div className="flex items-center justify-center mb-2">
                                        <Bed className={`h-8 w-8 ${bed.status === 'available' ? 'text-green-600' : 'text-red-600'}`} />
                                    </div>

                                    {/* Bed Number */}
                                    <div className="text-center font-bold text-gray-900 dark:text-white mb-2">
                                        {bed.bedNumber}
                                    </div>

                                    {/* Status */}
                                    {bed.status === 'occupied' ? (
                                        <div className="space-y-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-400 text-center truncate">
                                                {bed.patientName}
                                            </div>
                                            <div className={`text-xs px-2 py-1 rounded-full text-center ${getConditionColor(bed.condition)}`}>
                                                {bed.condition}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDischarge(bed);
                                                }}
                                                className="w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                                            >
                                                Discharge
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                                                Available
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Click to book
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book Bed {selectedBed?.bedNumber}</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Patient Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Enter patient name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Admission Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Condition
                                </label>
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500">
                                    <option value="stable">Stable</option>
                                    <option value="critical">Critical</option>
                                    <option value="recovering">Recovering</option>
                                </select>
                            </div>

                            <div className="flex space-x-4 mt-6">
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Bed booked successfully!');
                                        setShowBookingModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Discharge Modal */}
            {showDischargeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Discharge Patient</h3>

                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="text-sm text-gray-600 dark:text-gray-400">Bed Number</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedBed?.bedNumber}</div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="text-sm text-gray-600 dark:text-gray-400">Patient Name</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedBed?.patientName}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Discharge Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Discharge Summary
                                </label>
                                <textarea
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Enter discharge summary..."
                                ></textarea>
                            </div>

                            <div className="flex space-x-4 mt-6">
                                <button
                                    onClick={() => setShowDischargeModal(false)}
                                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Patient discharged successfully!');
                                        setShowDischargeModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Confirm Discharge
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WardAvailability;
