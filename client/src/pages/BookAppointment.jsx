import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import BackButton from '../components/BackButton';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: '',
        departmentId: '',
        appointmentDate: '',
        timeSlot: '',
        reason: '',
        type: 'new'
    });

    useEffect(() => {
        fetchDoctors();
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (formData.doctorId && formData.appointmentDate) {
            fetchAvailableSlots();
        }
    }, [formData.doctorId, formData.appointmentDate]);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/staff`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Filter only doctors
            const doctorsList = data.filter(staff => staff.userId?.role === 'doctor');
            setDoctors(doctorsList);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/departments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepartments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAvailableSlots = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/appointments/slots/${formData.doctorId}/${formData.appointmentDate}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAvailableSlots(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // First get patient ID
            const { data: patients } = await axios.get(`${import.meta.env.VITE_API_URL}/patients`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const myPatient = patients.find(p => p.userId._id === JSON.parse(atob(token.split('.')[1])).id);

            if (!myPatient) {
                toast.error('Please complete your patient registration first');
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/appointments`, {
                ...formData,
                patientId: myPatient._id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Appointment booked successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <BackButton />

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Book Appointment</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <User className="inline mr-2" size={16} />
                                Select Doctor
                            </label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.doctorId}
                                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                            >
                                <option value="">Choose a doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor._id} value={doctor.userId._id}>
                                        Dr. {doctor.userId.name} - {doctor.specialization || 'General'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <Calendar className="inline mr-2" size={16} />
                                Appointment Date
                            </label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.appointmentDate}
                                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                            />
                        </div>

                        {availableSlots.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <Clock className="inline mr-2" size={16} />
                                    Available Time Slots
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                            className={`px-4 py-2 rounded-lg border ${formData.timeSlot === slot
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Appointment Type
                            </label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="new">New Consultation</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="emergency">Emergency</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Reason for Visit
                            </label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Describe your symptoms or reason for visit..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
