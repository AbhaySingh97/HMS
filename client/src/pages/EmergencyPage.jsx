import React from 'react';
import { Ambulance, Phone, MapPin, Clock, AlertTriangle, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const EmergencyPage = () => {
    const emergencyContacts = [
        { type: 'Emergency Hotline', number: '911', available: '24/7', icon: Phone },
        { type: 'Ambulance Service', number: '+1 (555) 123-4567', available: '24/7', icon: Ambulance },
        { type: 'Poison Control', number: '+1 (800) 222-1222', available: '24/7', icon: AlertTriangle }
    ];

    const currentCases = [
        { id: 'ER001', severity: 'Critical', condition: 'Cardiac Arrest', status: 'In Treatment', time: '10 mins ago' },
        { id: 'ER002', severity: 'Urgent', condition: 'Severe Trauma', status: 'Stabilized', time: '25 mins ago' },
        { id: 'ER003', severity: 'Moderate', condition: 'Fracture', status: 'Waiting', time: '45 mins ago' },
        { id: 'ER004', severity: 'Minor', condition: 'Laceration', status: 'In Treatment', time: '1 hour ago' }
    ];

    const emergencyServices = [
        {
            title: 'Trauma Care',
            description: 'Advanced trauma life support with experienced emergency physicians',
            icon: Activity
        },
        {
            title: 'Rapid Response',
            description: 'Immediate triage and treatment for all emergency cases',
            icon: Clock
        },
        {
            title: 'Ambulance Service',
            description: 'Fleet of advanced life support ambulances available 24/7',
            icon: Ambulance
        },
        {
            title: 'Critical Care',
            description: 'State-of-the-art ICU facilities for critical patients',
            icon: AlertTriangle
        }
    ];

    const triageCategories = [
        { level: 'Level 1 - Critical', color: 'bg-red-600', description: 'Life-threatening, immediate attention', waitTime: '0 min' },
        { level: 'Level 2 - Urgent', color: 'bg-orange-500', description: 'Serious conditions requiring prompt care', waitTime: '< 15 min' },
        { level: 'Level 3 - Moderate', color: 'bg-yellow-500', description: 'Stable but needs medical attention', waitTime: '< 30 min' },
        { level: 'Level 4 - Minor', color: 'bg-green-500', description: 'Non-urgent conditions', waitTime: '< 60 min' }
    ];

    const getSeverityBadge = (severity) => {
        const badges = {
            'Critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'Urgent': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Minor': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        };
        return badges[severity] || 'bg-gray-100 text-gray-800';
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
                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                                <Ambulance className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Emergency Care
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    24/7 emergency services with rapid response team
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Alert */}
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-lg mb-8">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                                    In Case of Life-Threatening Emergency
                                </h3>
                                <p className="text-red-800 dark:text-red-300 mb-3">
                                    Call 911 immediately or come directly to our Emergency Department located at Building A, Ground Floor
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a href="tel:911" className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        Call 911
                                    </a>
                                    <button className="px-6 py-3 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Emergency Contacts</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {emergencyContacts.map((contact, index) => {
                                const Icon = contact.icon;
                                return (
                                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                                                <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{contact.type}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.available}</p>
                                            </div>
                                        </div>
                                        <a href={`tel:${contact.number}`} className="text-2xl font-bold text-red-600 dark:text-red-400 hover:underline">
                                            {contact.number}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Current ER Status */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Current Emergency Room Status</h2>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Case ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Severity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Condition</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentCases.map((case_, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{case_.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(case_.severity)}`}>
                                                        {case_.severity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{case_.condition}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{case_.status}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{case_.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Services */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Emergency Services</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {emergencyServices.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth text-center">
                                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-8 w-8 text-red-600 dark:text-red-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Triage Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Triage System</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Our emergency department uses a triage system to prioritize patients based on the severity of their condition.
                                This ensures that the most critical cases receive immediate attention.
                            </p>
                            <div className="space-y-4">
                                {triageCategories.map((category, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{category.level}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Wait: {category.waitTime}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
