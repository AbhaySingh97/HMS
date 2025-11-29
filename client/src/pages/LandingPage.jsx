import { useState } from 'react';
import {
    Activity,
    Calendar,
    FileText,
    Clock,
    Shield,
    Users,
    Stethoscope,
    Heart,
    Pill,
    TestTube,
    Ambulance,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import ServiceCard from '../components/ServiceCard';
import { useEffect } from 'react';

// Feature Tabs Component
const FeatureTabs = () => {
    const [activeTab, setActiveTab] = useState('patient');

    const tabCategories = [
        { id: 'patient', label: 'Patient Features', icon: Users },
        { id: 'doctor', label: 'Doctor Tools', icon: Stethoscope },
        { id: 'technology', label: 'Technology', icon: Activity },
        { id: 'security', label: 'Security & Support', icon: Shield }
    ];

    const featuresByCategory = {
        patient: [
            {
                icon: Calendar,
                title: 'Smart Appointment Booking',
                description: 'Book appointments with your preferred doctors anytime, anywhere through our intuitive platform.',
                benefits: [
                    'Real-time doctor availability',
                    'Instant confirmation notifications',
                    'Easy rescheduling options',
                    'Appointment reminders via SMS/Email'
                ]
            },
            {
                icon: FileText,
                title: 'Digital Health Records',
                description: 'Access your complete medical history, test results, and prescriptions securely from any device.',
                benefits: [
                    'Lifetime medical history storage',
                    'Download reports anytime',
                    'Share records with doctors instantly',
                    'Track health trends over time'
                ]
            },
            {
                icon: Phone,
                title: 'Telemedicine Consultations',
                description: 'Connect with healthcare professionals through video calls without leaving your home.',
                benefits: [
                    'HD video consultations',
                    'Chat with doctors in real-time',
                    'Digital prescriptions',
                    'Follow-up appointments made easy'
                ]
            },
            {
                icon: Pill,
                title: 'Medication Management',
                description: 'Keep track of your medications, dosages, and refill schedules all in one place.',
                benefits: [
                    'Medication reminders',
                    'Drug interaction alerts',
                    'Refill notifications',
                    'Pharmacy integration'
                ]
            }
        ],
        doctor: [
            {
                icon: Users,
                title: 'Patient Management Dashboard',
                description: 'Comprehensive dashboard to manage all your patients efficiently with detailed insights.',
                benefits: [
                    'Complete patient profiles',
                    'Appointment scheduling',
                    'Medical history at a glance',
                    'Treatment tracking'
                ]
            },
            {
                icon: FileText,
                title: 'Digital Prescription System',
                description: 'Create, manage, and send digital prescriptions directly to patients and pharmacies.',
                benefits: [
                    'Pre-saved medication templates',
                    'Drug database integration',
                    'E-signature support',
                    'Automatic pharmacy routing'
                ]
            },
            {
                icon: TestTube,
                title: 'Lab Integration',
                description: 'Order tests, track results, and share findings seamlessly with your patients.',
                benefits: [
                    'Direct lab ordering',
                    'Real-time result notifications',
                    'Trend analysis tools',
                    'Automated patient sharing'
                ]
            },
            {
                icon: Calendar,
                title: 'Schedule Optimization',
                description: 'AI-powered scheduling that maximizes your time and minimizes patient wait times.',
                benefits: [
                    'Smart slot allocation',
                    'Buffer time management',
                    'Emergency slot reservations',
                    'Multi-location support'
                ]
            }
        ],
        technology: [
            {
                icon: Activity,
                title: 'AI-Powered Diagnostics',
                description: 'Advanced AI algorithms assist in diagnosis and treatment recommendations.',
                benefits: [
                    'Pattern recognition in medical data',
                    'Predictive health analytics',
                    'Risk assessment tools',
                    'Evidence-based suggestions'
                ]
            },
            {
                icon: TestTube,
                title: 'Advanced Lab Systems',
                description: 'State-of-the-art laboratory equipment for accurate and rapid test results.',
                benefits: [
                    'Automated testing processes',
                    'Quality control systems',
                    'Digital result delivery',
                    'Integration with EMR'
                ]
            },
            {
                icon: Heart,
                title: 'Remote Patient Monitoring',
                description: 'Monitor patient vitals and health metrics remotely through connected devices.',
                benefits: [
                    'Real-time vital tracking',
                    'Automated alert systems',
                    'Wearable device integration',
                    'Trend visualization'
                ]
            },
            {
                icon: Ambulance,
                title: 'Emergency Response System',
                description: 'Rapid response coordination with GPS tracking and real-time communication.',
                benefits: [
                    'GPS-enabled ambulance tracking',
                    'Instant hospital alerts',
                    'Patient data pre-loading',
                    'Resource optimization'
                ]
            }
        ],
        security: [
            {
                icon: Shield,
                title: 'HIPAA Compliant Security',
                description: 'Bank-level encryption and security measures to protect your sensitive health data.',
                benefits: [
                    'End-to-end encryption',
                    'HIPAA compliance certified',
                    'Regular security audits',
                    'Secure data centers'
                ]
            },
            {
                icon: Clock,
                title: '24/7 Customer Support',
                description: 'Round-the-clock support team ready to assist with any questions or concerns.',
                benefits: [
                    'Live chat support',
                    'Phone support available',
                    'Email ticket system',
                    'Multilingual assistance'
                ]
            },
            {
                icon: CheckCircle,
                title: 'Data Backup & Recovery',
                description: 'Automatic backups ensure your data is never lost and always recoverable.',
                benefits: [
                    'Automated daily backups',
                    'Disaster recovery plans',
                    'Multiple data centers',
                    'Point-in-time recovery'
                ]
            },
            {
                icon: Users,
                title: 'Role-Based Access Control',
                description: 'Granular permissions ensure only authorized personnel access sensitive information.',
                benefits: [
                    'Customizable user roles',
                    'Audit trail logging',
                    'Two-factor authentication',
                    'Session management'
                ]
            }
        ]
    };

    return (
        <div className="animate-fade-in">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tabCategories.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-gradient-hero text-white shadow-lg scale-105'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md hover-lift'
                            }`}
                    >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8">
                {featuresByCategory[activeTab].map((feature, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 hover-lift transition-smooth animate-fade-in stagger-${(index % 2) + 1}`}
                    >
                        <div className="flex items-start space-x-4 mb-6">
                            <div className="flex-shrink-0 w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center shadow-md hover-rotate transition-smooth">
                                <feature.icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-3 pl-2">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wide mb-3">
                                Key Benefits
                            </h4>
                            {feature.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start space-x-3 group">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                        <CheckCircle className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LandingPage = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalRole, setAuthModalRole] = useState(null);
    const [authModalView, setAuthModalView] = useState('role');

    const openLoginModal = () => {
        setAuthModalView('login');
        setAuthModalRole(null);
        setIsAuthModalOpen(true);
    };

    const openSignupModal = () => {
        setAuthModalView('signup');
        setAuthModalRole(null);
        setIsAuthModalOpen(true);
    };

    const openBookAppointment = () => {
        setAuthModalView('signup');
        setAuthModalRole('patient');
        setIsAuthModalOpen(true);
    };

    const [services, setServices] = useState([]);
    //             console.error('Error fetching services:', error);
    //         }
    //     };
    //     fetchServices();
    // }, []);


    // Fallback services if API fails or returns empty
    const defaultServices = [
        {
            icon: 'Ambulance',
            title: 'Emergency Care',
            description: '24/7 emergency services with rapid response team and state-of-the-art facilities for critical care.',
            color: 'red',
            actionType: 'link',
            link: '/emergency',
            availability: '24/7 Available',
            ctaText: 'Emergency Services',
            keyFeatures: [
                'Immediate medical attention',
                'Advanced life support systems',
                'Trauma care specialists',
                'Rapid ambulance dispatch'
            ],
            stats: [
                { value: '<10 min', label: 'Response Time' },
                { value: '100+', label: 'Lives Saved/Month' }
            ]
        },
        {
            icon: 'Stethoscope',
            title: 'Specialist Consultations',
            description: 'Expert doctors across all specializations available for in-person and virtual consultations.',
            color: 'blue',
            actionType: 'link',
            link: '/specialists',
            availability: 'Book Anytime',
            ctaText: 'Find Specialists',
            keyFeatures: [
                '200+ specialist doctors',
                'Video consultation available',
                'Same-day appointments',
                'Multi-specialty expertise'
            ],
            stats: [
                { value: '200+', label: 'Specialists' },
                { value: '15+', label: 'Departments' }
            ]
        },
        {
            icon: 'TestTube',
            title: 'Laboratory Services',
            description: 'Advanced diagnostic lab with accurate and quick test results using cutting-edge technology.',
            color: 'purple',
            actionType: 'link',
            link: '/lab-results',
            availability: 'Open Daily',
            ctaText: 'View Lab Services',
            keyFeatures: [
                'NABL accredited laboratory',
                'Same-day results available',
                'Home sample collection',
                '500+ test parameters'
            ],
            stats: [
                { value: '2-4 hrs', label: 'Avg. Report Time' },
                { value: '99.9%', label: 'Accuracy Rate' }
            ]
        },
        {
            icon: 'Heart',
            title: 'Cardiology',
            description: 'Comprehensive heart care with cutting-edge cardiac technology and experienced cardiologists.',
            color: 'pink',
            actionType: 'link',
            link: '/cardiology',
            availability: '24/7 Available',
            ctaText: 'Heart Care Services',
            keyFeatures: [
                'Advanced cardiac imaging',
                'Interventional cardiology',
                '24/7 cardiac emergency',
                'Preventive heart checkups'
            ],
            stats: [
                { value: '5000+', label: 'Procedures/Year' },
                { value: '98%', label: 'Success Rate' }
            ]
        },
        {
            icon: 'Pill',
            title: 'Pharmacy',
            description: 'In-house pharmacy with all medications, health products, and expert pharmacist consultation.',
            color: 'green',
            actionType: 'link',
            link: '/pharmacy',
            availability: '24/7 Open',
            ctaText: 'Visit Pharmacy',
            keyFeatures: [
                'Genuine medications only',
                'Expert pharmacist guidance',
                'Home delivery available',
                'Digital prescription support'
            ],
            stats: [
                { value: '10K+', label: 'Medicines' },
                { value: '30 min', label: 'Delivery Time' }
            ]
        },
        {
            icon: 'Users',
            title: 'Patient Care',
            description: 'Dedicated nursing staff providing compassionate, personalized patient care and support.',
            color: 'teal',
            actionType: 'link',
            link: '/patient-care',
            availability: 'Round the Clock',
            ctaText: 'Learn More',
            keyFeatures: [
                'Trained nursing professionals',
                'Personalized care plans',
                'Post-operative care',
                'Patient education programs'
            ]
        },
        {
            icon: 'Bed',
            title: 'Ward Availability',
            description: 'Real-time bed availability across all wards with easy booking and discharge management.',
            color: 'indigo',
            actionType: 'link',
            link: '/wards',
            availability: 'Real-time Updates',
            ctaText: 'View Wards',
            keyFeatures: [
                '6 specialized ward types',
                'Real-time bed availability',
                'Online booking system',
                'Patient discharge management'
            ],
            stats: [
                { value: '150', label: 'Total Beds' },
                { value: '70%', label: 'Occupancy Rate' }
            ]
        },
        {
            icon: 'Activity',
            title: 'Radiology & Imaging',
            description: 'Advanced imaging services including MRI, CT scans, X-rays, and ultrasound with expert radiologists.',
            color: 'orange',
            actionType: 'link',
            link: '/radiology',
            availability: '24/7 Available',
            ctaText: 'Imaging Services',
            keyFeatures: [
                'State-of-the-art MRI & CT scanners',
                'Digital X-ray systems',
                'Expert radiologist reports',
                'Same-day imaging appointments'
            ],
            stats: [
                { value: '1000+', label: 'Scans/Month' },
                { value: '2 hrs', label: 'Report Time' }
            ]
        },
        {
            icon: 'Scissors',
            title: 'Surgery & OT',
            description: 'Modern operation theaters equipped with advanced surgical technology and experienced surgical teams.',
            color: 'violet',
            actionType: 'link',
            link: '/surgery',
            availability: 'Scheduled & Emergency',
            ctaText: 'Surgical Services',
            keyFeatures: [
                'Minimally invasive procedures',
                'Advanced laparoscopic surgery',
                'Experienced surgical teams',
                'Post-operative ICU care'
            ],
            stats: [
                { value: '500+', label: 'Surgeries/Month' },
                { value: '99%', label: 'Success Rate' }
            ]
        }
    ];

    const features = [
        {
            icon: Calendar,
            title: 'Online Appointments',
            description: 'Book appointments with your preferred doctors anytime, anywhere.'
        },
        {
            icon: FileText,
            title: 'Digital Records',
            description: 'Access your medical history and reports securely online.'
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round-the-clock customer support for all your queries.'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your health data is encrypted and completely confidential.'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Patients Served' },
        { number: '200+', label: 'Expert Doctors' },
        { number: '15+', label: 'Departments' },
        { number: '24/7', label: 'Emergency Care' }
    ];

    const displayServices = defaultServices; // Always use defaultServices with all 9 services

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar onLoginClick={openLoginModal} onSignupClick={openSignupModal} />
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authModalView}
                defaultRole={authModalRole}
            />

            {/* Hero Section */}
            <section id="home" className="pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop')` }}>
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-blue-900/75 z-0"></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-6 animate-slide-up">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                                Your Health, <span className="inline-block hover-scale">Our Priority</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/90">
                                Experience world-class healthcare with cutting-edge technology and compassionate care.
                                Book appointments, access records, and manage your health journey seamlessly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={openBookAppointment}
                                    className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 hover-lift glow transition-all shadow-lg"
                                >
                                    Book Appointment
                                </button>
                                <button
                                    onClick={openLoginModal}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-strong text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 hover-scale transition-smooth"
                                >
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="hidden md:block animate-fade-in stagger-2">
                            <div className="glass-card p-8 rounded-2xl hover-lift">
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, index) => (
                                        <div key={index} className={`text-center p-4 hover-scale transition-smooth stagger-${index + 1}`}>
                                            <div className="text-3xl font-bold text-gradient mb-2 animate-pulse-slow">{stat.number}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2071&auto=format&fit=crop')` }}>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Services
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Comprehensive healthcare services tailored to meet all your medical needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayServices.map((service, index) => (
                            <ServiceCard key={index} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop')` }}>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/85 to-teal-50/85 dark:from-gray-800/85 dark:to-gray-900/85 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our comprehensive features designed to revolutionize your healthcare experience
                        </p>
                    </div>

                    {/* Tabbed Feature Categories */}
                    <FeatureTabs />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop')` }}>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Main About Content */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="relative animate-slide-up">
                            <div className="absolute inset-0 bg-gradient-hero rounded-2xl transform rotate-3 opacity-20 animate-pulse-slow"></div>
                            <img
                                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
                                alt="Modern Hospital"
                                className="relative rounded-2xl shadow-2xl hover-scale transition-smooth"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                        <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 animate-fade-in stagger-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                Leading the Way in <span className="text-gradient">Medical Excellence</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                With over two decades of experience, we have established ourselves as a trusted name in healthcare.
                                Our commitment to patient care and medical innovation sets us apart.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Expert Medical Team',
                                    'Advanced Technology',
                                    'Patient-Centered Care'
                                ].map((item, index) => (
                                    <div key={index} className={`flex items-center space-x-3 hover-lift transition-smooth stagger-${index + 1}`}>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg hover-lift transition-smooth animate-fade-in">
                            <div className="w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center mb-4 shadow-md">
                                <Heart className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To provide accessible, compassionate, and innovative healthcare services that improve the quality of life
                                for every patient we serve. We strive to set the standard for medical excellence through continuous
                                improvement and dedication to patient outcomes.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg hover-lift transition-smooth animate-fade-in stagger-2">
                            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To be the most trusted healthcare provider, recognized for transforming lives through exceptional care,
                                cutting-edge technology, and a patient-first approach. We envision a healthier community where everyone
                                has access to world-class medical services.
                            </p>
                        </div>
                    </div>

                    {/* Accreditations & Certifications */}
                    <div className="mb-20">
                        <div className="text-center mb-12 animate-slide-up">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                Accredited & Certified Excellence
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Our commitment to quality is validated by prestigious certifications and accreditations
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { icon: Shield, title: 'JCI Accredited', desc: 'International Standards' },
                                { icon: CheckCircle, title: 'ISO Certified', desc: 'Quality Management' },
                                { icon: Activity, title: 'NABH Approved', desc: 'Healthcare Excellence' },
                                { icon: Heart, title: 'Patient Safety', desc: 'Award Winner 2024' }
                            ].map((cert, index) => (
                                <div key={index} className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover-lift hover-scale transition-smooth text-center animate-fade-in stagger-${(index % 4) + 1}`}>
                                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-3">
                                        <cert.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{cert.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Success Stories & Stats */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 md:p-12 mb-20 shadow-xl animate-scale-in">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                Trusted by Thousands
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Real results from real patients who chose us for their healthcare journey
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { number: '98%', label: 'Patient Satisfaction', icon: Heart },
                                { number: '50K+', label: 'Successful Treatments', icon: CheckCircle },
                                { number: '4.9/5', label: 'Average Rating', icon: Activity },
                                { number: '95%', label: 'Would Recommend', icon: Users }
                            ].map((stat, index) => (
                                <div key={index} className={`text-center animate-fade-in stagger-${index + 1}`}>
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <stat.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                    <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                                    <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* State-of-the-Art Facilities */}
                    <div>
                        <div className="text-center mb-12 animate-slide-up">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                State-of-the-Art Facilities
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Equipped with the latest medical technology and modern infrastructure for superior patient care
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: TestTube,
                                    title: 'Advanced Diagnostics',
                                    desc: 'Latest imaging technology including MRI, CT, and digital X-ray systems',
                                    color: 'from-blue-500 to-cyan-500'
                                },
                                {
                                    icon: Stethoscope,
                                    title: 'Modern Operation Theaters',
                                    desc: 'Fully equipped surgical suites with cutting-edge equipment and monitoring systems',
                                    color: 'from-purple-500 to-pink-500'
                                },
                                {
                                    icon: Ambulance,
                                    title: 'Emergency Response',
                                    desc: 'Dedicated emergency department with rapid response team and ICU facilities',
                                    color: 'from-red-500 to-orange-500'
                                }
                            ].map((facility, index) => (
                                <div key={index} className={`bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover-lift transition-smooth animate-fade-in stagger-${index + 1}`}>
                                    <div className={`w-16 h-16 bg-gradient-to-r ${facility.color} rounded-xl flex items-center justify-center mb-5 shadow-md hover-rotate transition-smooth`}>
                                        <facility.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{facility.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{facility.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop')` }}>
                {/* Dark Overlay for CTA */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/90 z-0"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-scale-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Prioritize Your Health?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of satisfied patients who trust us with their healthcare needs.
                    </p>
                    <button
                        onClick={openSignupModal}
                        className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-bold text-lg hover:bg-gray-100 hover-lift glow transition-all shadow-xl animate-bounce-slow"
                    >
                        Create Your Account
                    </button>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')` }}>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gray-50/85 dark:bg-gray-900/85 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We're here to help. Reach out to us anytime.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", sub: "24/7 Emergency Support" },
                            { icon: Mail, title: "Email", info: "contact@hms.com", sub: "We reply within 24 hours" },
                            { icon: MapPin, title: "Location", info: "123 Healthcare Ave", sub: "Medical District, NY" }
                        ].map((item, index) => (
                            <div key={index} className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover-lift hover-scale transition-smooth stagger-${index + 1} animate-fade-in`}>
                                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                                    <item.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-lg font-medium text-cyan-600 dark:text-cyan-400 mb-1">{item.info}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="bg-gradient-hero p-2 rounded-lg">
                                    <Activity className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold">HealthCare Plus</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Providing exceptional healthcare services with compassion and excellence.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Emergency Care</li>
                                <li>Consultations</li>
                                <li>Laboratory</li>
                                <li>Pharmacy</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2025 HealthCare Plus. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
