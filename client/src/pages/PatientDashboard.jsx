import { Calendar, FileText, Heart, Activity, MapPin } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const healthStats = [
        { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Medical Records', value: '12', icon: FileText, color: 'bg-green-500' },
        { label: 'Prescriptions', value: '3', icon: Heart, color: 'bg-red-500' },
        { label: 'Lab Reports', value: '5', icon: Activity, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <BackButton className="mb-4" />
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patient Portal</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome, {user?.name}</p>
            </div>

            {/* Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthStats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</p>
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
                <ActionCard
                    title="Find Specialist"
                    description="Find doctors near you"
                    icon={MapPin}
                    onClick={() => navigate('/find-specialist')}
                />
                <ActionCard
                    title="Book Appointment"
                    description="Schedule a visit with a doctor"
                    icon={Calendar}
                    onClick={() => navigate('/book-appointment')}
                />
                <ActionCard
                    title="View Records"
                    description="Access your medical history"
                    icon={FileText}
                    onClick={() => navigate('/my-appointments')}
                />
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Appointments</h2>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No upcoming appointments</p>
                    <button
                        onClick={() => navigate('/book-appointment')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Book your first appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionCard = ({ title, description, icon: Icon, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
        <Icon className="h-8 w-8 text-blue-600 mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const AppointmentCard = ({ doctor, specialty, date, time }) => (
    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div>
            <p className="font-semibold text-gray-900 dark:text-white">{doctor}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{specialty}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{time}</p>
        </div>
    </div>
);

export default PatientDashboard;
