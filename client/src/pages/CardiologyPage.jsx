import React from 'react';
import { Heart, User, Calendar, Award, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const CardiologyPage = () => {
    const cardiologists = [
        {
            name: 'Dr. Anjali Desai',
            specialization: 'Interventional Cardiology',
            experience: '15 years',
            availability: 'Mon, Wed, Fri',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Dr. Rajesh Kumar',
            specialization: 'Electrophysiology',
            experience: '12 years',
            availability: 'Tue, Thu, Sat',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
        }
    ];

    const procedures = [
        { name: 'Echocardiogram', duration: '30-60 min', description: 'Ultrasound imaging of the heart' },
        { name: 'Stress Test', duration: '45-60 min', description: 'Heart performance under physical stress' },
        { name: 'Angiography', duration: '1-2 hours', description: 'X-ray imaging of blood vessels' },
        { name: 'Cardiac Catheterization', duration: '2-3 hours', description: 'Diagnostic procedure for heart conditions' },
        { name: 'Pacemaker Implantation', duration: '2-4 hours', description: 'Device to regulate heart rhythm' },
        { name: 'Holter Monitoring', duration: '24-48 hours', description: 'Continuous heart rhythm monitoring' }
    ];

    const testimonials = [
        {
            patient: 'Rahul Sharma',
            comment: 'Dr. Desai saved my life with her expertise in cardiac care. The team is exceptional!',
            rating: 5,
            date: '2024-11-15'
        },
        {
            patient: 'Sunita Patil',
            comment: 'Outstanding care and attention. The cardiology department is world-class.',
            rating: 5,
            date: '2024-11-10'
        }
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
                            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg">
                                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Cardiology Department
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Comprehensive heart care with cutting-edge cardiac technology
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Department Info */}
                    <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 p-8 rounded-xl mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Our Department</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Our Cardiology Department is equipped with state-of-the-art technology and staffed by board-certified cardiologists
                            with extensive experience in treating all types of heart conditions. We offer comprehensive cardiac care from
                            prevention to advanced interventional procedures.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">24/7</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Emergency Care</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">5000+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Procedures Annually</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">98%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Our Cardiologists */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Cardiologists</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {cardiologists.map((doctor, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <div className="flex items-start gap-4">
                                        <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                                            <p className="text-cyan-600 dark:text-cyan-400 mb-2">{doctor.specialization}</p>
                                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                <p><span className="font-medium">Experience:</span> {doctor.experience}</p>
                                                <p><span className="font-medium">Available:</span> {doctor.availability}</p>
                                            </div>
                                            <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium">
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Procedures */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Procedures</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {procedures.map((procedure, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover-lift transition-smooth">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{procedure.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{procedure.description}</p>
                                    <p className="text-sm text-pink-600 dark:text-pink-400 font-medium">Duration: {procedure.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Testimonials */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Patient Testimonials</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">{testimonial.patient}</span>
                                        <span className="text-gray-500 dark:text-gray-400">{testimonial.date}</span>
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

export default CardiologyPage;
