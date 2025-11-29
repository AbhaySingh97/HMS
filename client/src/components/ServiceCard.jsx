import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = LucideIcons[service.icon] || LucideIcons.Activity;
    const CheckCircle = LucideIcons.CheckCircle;
    const ArrowRight = LucideIcons.ArrowRight;
    const Clock = LucideIcons.Clock;

    const getColorClasses = (color) => {
        const colors = {
            red: {
                bg: 'bg-red-100 dark:bg-red-900/30',
                text: 'text-red-600 dark:text-red-400',
                gradient: 'from-red-500 to-orange-500',
                badge: 'bg-red-500'
            },
            blue: {
                bg: 'bg-blue-100 dark:bg-blue-900/30',
                text: 'text-blue-600 dark:text-blue-400',
                gradient: 'from-blue-500 to-cyan-500',
                badge: 'bg-blue-500'
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
            green: {
                bg: 'bg-green-100 dark:bg-green-900/30',
                text: 'text-green-600 dark:text-green-400',
                gradient: 'from-green-500 to-emerald-500',
                badge: 'bg-green-500'
            },
            teal: {
                bg: 'bg-teal-100 dark:bg-teal-900/30',
                text: 'text-teal-600 dark:text-teal-400',
                gradient: 'from-teal-500 to-cyan-500',
                badge: 'bg-teal-500'
            },
            orange: {
                bg: 'bg-orange-100 dark:bg-orange-900/30',
                text: 'text-orange-600 dark:text-orange-400',
                gradient: 'from-orange-500 to-amber-500',
                badge: 'bg-orange-500'
            },
            indigo: {
                bg: 'bg-indigo-100 dark:bg-indigo-900/30',
                text: 'text-indigo-600 dark:text-indigo-400',
                gradient: 'from-indigo-500 to-purple-500',
                badge: 'bg-indigo-500'
            },
            cyan: {
                bg: 'bg-cyan-100 dark:bg-cyan-900/30',
                text: 'text-cyan-600 dark:text-cyan-400',
                gradient: 'from-cyan-500 to-blue-500',
                badge: 'bg-cyan-500'
            }
        };
        return colors[color] || colors.cyan;
    };

    const handleClick = () => {
        if (service.actionType === 'link') {
            if (service.link.startsWith('http')) {
                window.open(service.link, '_blank');
            } else {
                navigate(service.link);
            }
        } else if (service.actionType === 'modal') {
            console.log('Open modal:', service.actionValue);
        } else if (service.actionType === 'call') {
            window.location.href = `tel:${service.actionValue}`;
        }
    };

    const colorScheme = getColorClasses(service.color);

    // Default key features if not provided
    const keyFeatures = service.keyFeatures || [
        'Expert medical professionals',
        'State-of-the-art equipment',
        'Quick and efficient service'
    ];

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
        >
            {/* Availability Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className={`flex items-center space-x-1 ${colorScheme.badge} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                    <Clock className="h-3 w-3" />
                    <span>{service.availability || '24/7 Available'}</span>
                </div>
            </div>

            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 ${colorScheme.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComponent className={`h-8 w-8 ${colorScheme.text}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gradient transition-colors">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Key Features
                    </h4>
                    {keyFeatures.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2 group/item">
                            <div className={`flex-shrink-0 w-5 h-5 ${colorScheme.bg} rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform`}>
                                <CheckCircle className={`h-3 w-3 ${colorScheme.text}`} />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Stats Row (if provided) */}
                {service.stats && (
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        {service.stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className={`text-lg font-bold ${colorScheme.text}`}>{stat.value}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Button */}
                <button
                    onClick={handleClick}
                    className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${colorScheme.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                    <span>{service.ctaText || 'Learn More'}</span>
                    <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </button>
            </div>

            {/* Decorative Element */}
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colorScheme.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
        </div>
    );
};

export default ServiceCard;
