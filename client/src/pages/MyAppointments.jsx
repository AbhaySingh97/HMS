import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';

const MyAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <BackButton />

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Appointments</h1>

                    {appointments.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">No appointments found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div
                                    key={appointment._id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <User className="h-5 w-5 text-blue-600" />
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Dr. {appointment.doctorId?.name}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-3">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    {appointment.timeSlot}
                                                </div>
                                            </div>
                                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Reason:</span> {appointment.reason}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;
