import React, { useState } from 'react';
import { Pill, Search, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const PharmacyPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const medications = [
        {
            id: 1,
            name: 'Amoxicillin',
            category: 'Antibiotics',
            dosage: '500mg',
            stock: 245,
            price: 150.00,
            status: 'in-stock',
            manufacturer: 'Sun Pharma',
            expiryDate: '2025-12-31'
        },
        {
            id: 2,
            name: 'Lisinopril',
            category: 'Cardiovascular',
            dosage: '10mg',
            stock: 120,
            price: 220.00,
            status: 'in-stock',
            manufacturer: 'Cipla',
            expiryDate: '2025-10-15'
        },
        {
            id: 3,
            name: 'Metformin',
            category: 'Diabetes',
            dosage: '500mg',
            stock: 45,
            price: 85.00,
            status: 'low-stock',
            manufacturer: 'Dr. Reddy\'s',
            expiryDate: '2025-08-20'
        },
        {
            id: 4,
            name: 'Atorvastatin',
            category: 'Cardiovascular',
            dosage: '20mg',
            stock: 0,
            price: 350.00,
            status: 'out-of-stock',
            manufacturer: 'Lupin',
            expiryDate: '2025-11-30'
        },
        {
            id: 5,
            name: 'Omeprazole',
            category: 'Gastrointestinal',
            dosage: '20mg',
            stock: 300,
            price: 120.00,
            status: 'in-stock',
            manufacturer: 'Zydus Cadila',
            expiryDate: '2026-01-15'
        },
        {
            id: 6,
            name: 'Albuterol Inhaler',
            category: 'Respiratory',
            dosage: '90mcg',
            stock: 85,
            price: 450.00,
            status: 'in-stock',
            manufacturer: 'Glenmark',
            expiryDate: '2025-09-10'
        },
        {
            id: 7,
            name: 'Ibuprofen',
            category: 'Pain Relief',
            dosage: '400mg',
            stock: 500,
            price: 40.00,
            status: 'in-stock',
            manufacturer: 'Torrent Pharma',
            expiryDate: '2026-03-20'
        },
        {
            id: 8,
            name: 'Cetirizine',
            category: 'Allergy',
            dosage: '10mg',
            stock: 200,
            price: 60.00,
            status: 'in-stock',
            manufacturer: 'Alkem',
            expiryDate: '2025-07-25'
        }
    ];

    const prescriptions = [
        {
            id: 'RX001',
            patientName: 'Rahul Sharma',
            medication: 'Amoxicillin 500mg',
            quantity: 30,
            status: 'ready',
            prescribedBy: 'Dr. Anjali Desai',
            date: '2024-11-27'
        },
        {
            id: 'RX002',
            patientName: 'Priya Patel',
            medication: 'Lisinopril 10mg',
            quantity: 90,
            status: 'processing',
            prescribedBy: 'Dr. Rajesh Kumar',
            date: '2024-11-27'
        },
        {
            id: 'RX003',
            patientName: 'Vikram Singh',
            medication: 'Metformin 500mg',
            quantity: 60,
            status: 'pending',
            prescribedBy: 'Dr. Anjali Desai',
            date: '2024-11-26'
        }
    ];

    const categories = ['all', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Gastrointestinal', 'Respiratory', 'Pain Relief', 'Allergy'];

    const filteredMedications = medications.filter(med => {
        const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusBadge = (status) => {
        const badges = {
            'in-stock': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle, text: 'In Stock' },
            'low-stock': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: AlertCircle, text: 'Low Stock' },
            'out-of-stock': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: AlertCircle, text: 'Out of Stock' }
        };
        const badge = badges[status];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                <Icon className="h-4 w-4" />
                {badge.text}
            </span>
        );
    };

    const getPrescriptionStatusBadge = (status) => {
        const badges = {
            'ready': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle, text: 'Ready' },
            'processing': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: Clock, text: 'Processing' },
            'pending': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock, text: 'Pending' }
        };
        const badge = badges[status] || badges['processing'];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                <Icon className="h-4 w-4" />
                {badge.text}
            </span>
        );
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
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <Pill className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Pharmacy
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    In-house pharmacy with all medications and health products
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Prescriptions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pending Prescriptions</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {prescriptions.map(prescription => (
                                <div key={prescription.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Prescription #{prescription.id}</p>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{prescription.patientName}</h3>
                                        </div>
                                        {getPrescriptionStatusBadge(prescription.status)}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Medication:</span> {prescription.medication}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Quantity:</span> {prescription.quantity}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Prescribed by:</span> {prescription.prescribedBy}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Date:</span> {prescription.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-6 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search medications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {category === 'all' ? 'All Categories' : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Medication Inventory */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medication Inventory</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMedications.map(med => (
                                <div key={med.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                                <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{med.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{med.dosage}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Category:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{med.category}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Stock:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{med.stock} units</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Price:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">₹{med.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Manufacturer:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{med.manufacturer}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Expiry:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{med.expiryDate}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        {getStatusBadge(med.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyPage;
