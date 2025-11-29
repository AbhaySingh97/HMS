import { Calendar, UserPlus, Users, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReceptionistDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const stats = [
        { label: 'Today\'s Check-ins', value: '23', icon: Users, color: 'bg-blue-500' },
        { label: 'Appointments Booked', value: '15', icon: Calendar, color: 'bg-green-500' },
        { label: 'New Registrations', value: '5', icon: UserPlus, color: 'bg-purple-500' },
        { label: 'Pending Tasks', value: '8', icon: ClipboardList, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reception Dashboard</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickAction
                    title="Register New Patient"
                    icon={UserPlus}
                    color="bg-blue-600"
                    onClick={() => navigate('/register-patient')}
                />
                <QuickAction
                    title="Book Appointment"
                    icon={Calendar}
                    color="bg-green-600"
                    onClick={() => navigate('/book-appointment')}
                />
                <QuickAction
                    title="Check-in Patient"
                    icon={ClipboardList}
                    color="bg-purple-600"
                    onClick={() => navigate('/my-appointments')}
                />
            </div>

            {/* Today's Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Appointments</h2>
                <div className="text-gray-600 dark:text-gray-400">Appointment list will appear here...</div>
            </div>
        </div>
    );
};

const QuickAction = ({ title, icon: Icon, color, onClick }) => (
    <button
        onClick={onClick}
        className={`${color} hover:opacity-90 text-white rounded-lg p-6 flex items-center space-x-3 transition-opacity`}
    >
        <Icon className="h-6 w-6" />
        <span className="font-medium">{title}</span>
    </button>
);

export default ReceptionistDashboard;
