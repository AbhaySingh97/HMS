import { Activity, Users, Heart, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NurseDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Assigned Patients', value: '18', icon: Users, color: 'bg-blue-500' },
        { label: 'Vitals Recorded', value: '12', icon: Activity, color: 'bg-green-500' },
        { label: 'Medications Given', value: '25', icon: Heart, color: 'bg-red-500' },
        { label: 'Ward Rounds', value: '3', icon: Stethoscope, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nurse Dashboard</h1>
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
                <QuickAction title="Record Vitals" icon={Activity} color="bg-blue-600" />
                <QuickAction title="Patient Care" icon={Users} color="bg-green-600" />
                <QuickAction title="Medication Log" icon={Heart} color="bg-purple-600" />
            </div>

            {/* Patient List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Assigned Patients</h2>
                <div className="text-gray-600 dark:text-gray-400">Patient list will appear here...</div>
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

export default NurseDashboard;
