import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PharmacistDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Medicines', value: '450', icon: Package, color: 'bg-blue-500' },
        { label: 'Today\'s Sales', value: '₹12,450', icon: ShoppingCart, color: 'bg-green-500' },
        { label: 'Low Stock Items', value: '8', icon: AlertTriangle, color: 'bg-red-500' },
        { label: 'Monthly Revenue', value: '₹3.2L', icon: TrendingUp, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pharmacy Dashboard</h1>
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
                <QuickAction title="New Sale" icon={ShoppingCart} color="bg-green-600" />
                <QuickAction title="Manage Inventory" icon={Package} color="bg-blue-600" />
                <QuickAction title="Stock Alerts" icon={AlertTriangle} color="bg-red-600" />
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Low Stock Alerts</h2>
                <div className="text-gray-600 dark:text-gray-400">Stock alerts will appear here...</div>
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

export default PharmacistDashboard;
