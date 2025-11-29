import { Users, Building2, UserCog, Activity, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Patients', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { label: 'Staff Members', value: '89', icon: UserCog, color: 'bg-green-500' },
        { label: 'Departments', value: '12', icon: Building2, color: 'bg-purple-500' },
        { label: 'Today\'s Appointments', value: '45', icon: Calendar, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}</p>
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
                <QuickActionCard
                    title="Manage Staff"
                    description="Add, edit, or remove staff members"
                    icon={UserCog}
                    link="/staff"
                />
                <QuickActionCard
                    title="Departments"
                    description="Manage hospital departments"
                    icon={Building2}
                    link="/departments"
                />
                <QuickActionCard
                    title="Patient Records"
                    description="View and manage patient data"
                    icon={Users}
                    link="/patients"
                />
                <QuickActionCard
                    title="Reports"
                    description="Generate system reports"
                    icon={TrendingUp}
                    link="/reports"
                />
                <QuickActionCard
                    title="System Settings"
                    description="Configure system preferences"
                    icon={Activity}
                    link="/settings"
                />
            </div>
        </div>
    );
};

const QuickActionCard = ({ title, description, icon: Icon, link }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <Icon className="h-8 w-8 text-blue-600 mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

export default AdminDashboard;
