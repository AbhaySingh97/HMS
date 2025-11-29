import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import NurseDashboard from './NurseDashboard';
import ReceptionistDashboard from './ReceptionistDashboard';
import PharmacistDashboard from './PharmacistDashboard';
import LabTechnicianDashboard from './LabTechnicianDashboard';

const Dashboard = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const getDashboardComponent = () => {
        switch (user.role) {
            case 'admin':
                return <AdminDashboard />;
            case 'doctor':
                return <DoctorDashboard />;
            case 'patient':
                return <PatientDashboard />;
            case 'nurse':
                return <NurseDashboard />;
            case 'receptionist':
                return <ReceptionistDashboard />;
            case 'pharmacist':
                return <PharmacistDashboard />;
            case 'lab_technician':
                return <LabTechnicianDashboard />;
            default:
                return <div>Unknown role</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <LayoutDashboard className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                Enterprise HMS
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {getDashboardComponent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
