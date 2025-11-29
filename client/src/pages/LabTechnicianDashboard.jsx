import { TestTube, FileCheck, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LabTechnicianDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Pending Tests', value: '15', icon: Clock, color: 'bg-yellow-500' },
        { label: 'Completed Today', value: '28', icon: FileCheck, color: 'bg-green-500' },
        { label: 'Total Tests', value: '156', icon: TestTube, color: 'bg-blue-500' },
        { label: 'Urgent Tests', value: '3', icon: AlertCircle, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Laboratory Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome, {user?.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickAction title="Pending Tests" icon={Clock} color="bg-yellow-600" />
                <QuickAction title="Upload Results" icon={FileCheck} color="bg-green-600" />
                <QuickAction title="Test Catalog" icon={TestTube} color="bg-blue-600" />
            </div>

            {/* Urgent Tests */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Urgent Tests</h2>
                <div className="text-gray-600 dark:text-gray-400">Urgent test requests will appear here...</div>
            </div>
        </div>
    );
};

const QuickAction = ({ title, icon: Icon, color }) => (
    <button className={`${color} hover:opacity-90 text-white rounded-lg p-6 flex items-center space-x-3 transition-opacity`}>
        <Icon className="h-6 w-6" />
        <span className="font-medium">{title}</span>
    </button>
);

export default LabTechnicianDashboard;
