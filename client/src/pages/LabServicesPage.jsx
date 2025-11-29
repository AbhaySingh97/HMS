import React, { useState } from 'react';
import { TestTube, Search, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const LabServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const tests = [
        {
            id: 1,
            name: 'Complete Blood Count (CBC)',
            category: 'Blood Tests',
            price: 500.00,
            turnaround: '2-4 hours',
            description: 'Measures different components of blood including RBC, WBC, platelets',
            preparation: 'No fasting required'
        },
        {
            id: 2,
            name: 'Lipid Panel',
            category: 'Blood Tests',
            price: 800.00,
            turnaround: '4-6 hours',
            description: 'Measures cholesterol and triglyceride levels',
            preparation: '12-hour fasting required'
        },
        {
            id: 3,
            name: 'HbA1c (Diabetes)',
            category: 'Blood Tests',
            price: 600.00,
            turnaround: '1-2 days',
            description: 'Measures average blood sugar levels over 3 months',
            preparation: 'No fasting required'
        },
        {
            id: 4,
            name: 'Thyroid Panel (TSH, T3, T4)',
            category: 'Endocrine Tests',
            price: 1200.00,
            turnaround: '1-2 days',
            description: 'Comprehensive thyroid function assessment',
            preparation: 'No fasting required'
        },
        {
            id: 5,
            name: 'Urinalysis',
            category: 'Urine Tests',
            price: 300.00,
            turnaround: '1-2 hours',
            description: 'Examines urine for various health indicators',
            preparation: 'Clean catch sample'
        },
        {
            id: 6,
            name: 'Chest X-Ray',
            category: 'Imaging',
            price: 1000.00,
            turnaround: '2-4 hours',
            description: 'Imaging of chest cavity, lungs, and heart',
            preparation: 'Remove metal objects'
        },
        {
            id: 7,
            name: 'ECG (Electrocardiogram)',
            category: 'Cardiac Tests',
            price: 700.00,
            turnaround: '30 minutes',
            description: 'Records electrical activity of the heart',
            preparation: 'No special preparation'
        },
        {
            id: 8,
            name: 'Liver Function Test (LFT)',
            category: 'Blood Tests',
            price: 900.00,
            turnaround: '4-6 hours',
            description: 'Measures liver enzymes and function',
            preparation: '8-hour fasting recommended'
        }
    ];

    const recentResults = [
        {
            id: 'LAB001',
            patientName: 'Rahul Sharma',
            testName: 'Complete Blood Count',
            date: '2024-11-27',
            status: 'completed',
            result: 'Normal',
            orderedBy: 'Dr. Anjali Desai'
        },
        {
            id: 'LAB002',
            patientName: 'Priya Patel',
            testName: 'Thyroid Panel',
            date: '2024-11-27',
            status: 'processing',
            result: 'Pending',
            orderedBy: 'Dr. Rajesh Kumar'
        },
        {
            id: 'LAB003',
            patientName: 'Vikram Singh',
            testName: 'HbA1c',
            date: '2024-11-26',
            status: 'completed',
            result: 'Abnormal - Follow-up required',
            orderedBy: 'Dr. Amit Verma'
        },
        {
            id: 'LAB004',
            patientName: 'Sneha Gupta',
            testName: 'Chest X-Ray',
            date: '2024-11-27',
            status: 'processing',
            result: 'Pending',
            orderedBy: 'Dr. Rajesh Kumar'
        }
    ];

    const categories = ['all', 'Blood Tests', 'Urine Tests', 'Imaging', 'Cardiac Tests', 'Endocrine Tests'];

    const filteredTests = tests.filter(test => {
        const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusBadge = (status, result) => {
        if (status === 'completed') {
            const isNormal = result.toLowerCase().includes('normal');
            return (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${isNormal
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                    <CheckCircle className="h-4 w-4" />
                    Completed
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Clock className="h-4 w-4" />
                Processing
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
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <TestTube className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Laboratory Services
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Advanced diagnostic lab with accurate and quick test results
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Test Results */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Test Results</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {recentResults.map(result => (
                                <div key={result.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Test ID: {result.id}</p>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{result.patientName}</h3>
                                        </div>
                                        {getStatusBadge(result.status, result.result)}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Test:</span> {result.testName}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Result:</span> {result.result}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Ordered by:</span> {result.orderedBy}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Date:</span> {result.date}
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
                                placeholder="Search tests..."
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

                    {/* Available Tests */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Tests</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTests.map(test => (
                                <div key={test.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{test.name}</h3>
                                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                                {test.category}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{test.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Price:</span>
                                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">₹{test.price}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Turnaround:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{test.turnaround}</span>
                                        </div>
                                        <div className="flex items-start justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">Preparation:</span>
                                            <span className="font-medium text-gray-900 dark:text-white text-right">{test.preparation}</span>
                                        </div>
                                    </div>

                                    <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium">
                                        Order Test
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabServicesPage;
