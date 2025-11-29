import React from 'react';
import { Users, Clock, Bed, Heart, Shield, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const PatientCarePage = () => {
    const nursingStaff = [
        { name: 'Sunita Rao', role: 'Head Nurse', shift: 'Day Shift (7AM-3PM)', ward: 'General Ward' },
        { name: 'Anjali Singh', role: 'Senior Nurse', shift: 'Evening Shift (3PM-11PM)', ward: 'ICU' },
        { name: 'Priya Patel', role: 'Nurse', shift: 'Night Shift (11PM-7AM)', ward: 'Pediatrics' },
        { name: 'Meera Iyer', role: 'Nurse', shift: 'Day Shift (7AM-3PM)', ward: 'Cardiology' }
    ];

    const wards = [
        { name: 'General Ward', beds: 50, available: 12, type: 'Multi-bed' },
        { name: 'Private Rooms', beds: 20, available: 5, type: 'Single-bed' },
        { name: 'ICU', beds: 15, available: 2, type: 'Critical Care' },
        { name: 'Pediatrics', beds: 25, available: 8, type: 'Children' },
        { name: 'Maternity', beds: 18, available: 6, type: 'Maternity Care' }
    ];

    const careServices = [
        {
            icon: Heart,
            title: 'Compassionate Care',
            description: 'Our nurses provide personalized, empathetic care to every patient'
        },
        {
            icon: Shield,
            title: 'Safety First',
            description: 'Strict protocols ensure patient safety and infection control'
        },
        {
            icon: Activity,
            title: '24/7 Monitoring',
            description: 'Round-the-clock monitoring and immediate response to patient needs'
        },
        {
            icon: Users,
            title: 'Family Support',
            description: 'We involve families in care plans and provide emotional support'
        }
    ];

    const careGuidelines = [
        'Visiting hours: 10 AM - 8 PM daily',
        'Maximum 2 visitors per patient at a time',
        'Children under 12 must be accompanied by adults',
        'Mobile phones on silent mode in patient areas',
        'Hand sanitization mandatory before entering wards',
        'Follow nurse instructions for patient care'
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BackButton className="mb-6" />
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                                <Users className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Patient Care Services
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Dedicated nursing staff providing compassionate patient care
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Care Services */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Care Philosophy</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {careServices.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth text-center">
                                        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nursing Staff Schedule */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nursing Staff Schedule</h2>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shift</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ward</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {nursingStaff.map((staff, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{staff.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{staff.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {staff.shift}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{staff.ward}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Care Guidelines */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visitor Guidelines</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <ul className="space-y-3">
                                {careGuidelines.map((guideline, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </span>
                                        <span>{guideline}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientCarePage;
