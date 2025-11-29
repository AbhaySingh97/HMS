import React, { useState } from 'react';
import { Calendar, Users, FileText, Clock, Activity, ChevronRight, AlertCircle, X } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('appointments');
    const [activeModal, setActiveModal] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);

    const todayStats = [
        { label: 'Today\'s Appointments', value: '12', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Patients Seen', value: '8', icon: Users, color: 'bg-green-500' },
        { label: 'Pending Reports', value: '5', icon: FileText, color: 'bg-yellow-500' },
        { label: 'Next Appointment', value: '2:30 PM', icon: Clock, color: 'bg-purple-500' },
    ];

    const upcomingAppointments = [
        {
            id: 1,
            patient: 'Rahul Sharma',
            age: 45,
            gender: 'Male',
            time: '10:00 AM',
            type: 'Follow-up',
            reason: 'Hypertension Review',
            status: 'Confirmed'
        },
        {
            id: 2,
            patient: 'Priya Patel',
            age: 28,
            gender: 'Female',
            time: '11:30 AM',
            type: 'New Consultation',
            reason: 'Migraine Symptoms',
            status: 'Confirmed'
        },
        {
            id: 3,
            patient: 'Amit Kumar',
            age: 52,
            gender: 'Male',
            time: '2:30 PM',
            type: 'Check-up',
            reason: 'Diabetes Management',
            status: 'Pending'
        },
        {
            id: 4,
            patient: 'Sneha Gupta',
            age: 34,
            gender: 'Female',
            time: '4:00 PM',
            type: 'Follow-up',
            reason: 'Post-surgery Review',
            status: 'Confirmed'
        }
    ];

    const pendingReviews = [
        {
            id: 1,
            patient: 'Vikram Singh',
            uhid: 'HMS2024003',
            age: 62,
            gender: 'Male',
            bloodGroup: 'B+',
            reportType: 'Blood Test (CBC)',
            date: '2024-11-26',
            priority: 'High',
            orderedBy: 'Dr. Anjali Desai',
            testResults: {
                hemoglobin: { value: '11.2', unit: 'g/dL', normal: '13.5-17.5', status: 'Low' },
                wbc: { value: '12,500', unit: '/μL', normal: '4,000-11,000', status: 'High' },
                platelets: { value: '180,000', unit: '/μL', normal: '150,000-450,000', status: 'Normal' },
                rbc: { value: '4.2', unit: 'million/μL', normal: '4.5-5.5', status: 'Low' }
            },
            symptoms: ['Fatigue', 'Weakness', 'Pale skin'],
            medicalHistory: ['Diabetes Type 2', 'Hypertension'],
            notes: 'Patient reports persistent fatigue for the past 2 weeks. Recommend iron supplementation and follow-up in 4 weeks.'
        },
        {
            id: 2,
            patient: 'Anjali Desai',
            uhid: 'HMS2024006',
            age: 29,
            gender: 'Female',
            bloodGroup: 'A-',
            reportType: 'Thyroid Profile',
            date: '2024-11-27',
            priority: 'Normal',
            orderedBy: 'Dr. Rajesh Kumar',
            testResults: {
                tsh: { value: '8.5', unit: 'mIU/L', normal: '0.4-4.0', status: 'High' },
                t3: { value: '85', unit: 'ng/dL', normal: '80-200', status: 'Normal' },
                t4: { value: '6.2', unit: 'μg/dL', normal: '5.0-12.0', status: 'Normal' }
            },
            symptoms: ['Weight gain', 'Cold intolerance', 'Fatigue'],
            medicalHistory: ['None'],
            notes: 'Elevated TSH indicates hypothyroidism. Start levothyroxine 50mcg daily. Recheck thyroid function in 6 weeks.'
        },
        {
            id: 3,
            patient: 'Rohan Mehta',
            uhid: 'HMS2024007',
            age: 41,
            gender: 'Male',
            bloodGroup: 'B-',
            reportType: 'Lipid Profile',
            date: '2024-11-27',
            priority: 'Normal',
            orderedBy: 'Dr. Anjali Desai',
            testResults: {
                totalCholesterol: { value: '245', unit: 'mg/dL', normal: '<200', status: 'High' },
                ldl: { value: '165', unit: 'mg/dL', normal: '<100', status: 'High' },
                hdl: { value: '38', unit: 'mg/dL', normal: '>40', status: 'Low' },
                triglycerides: { value: '210', unit: 'mg/dL', normal: '<150', status: 'High' }
            },
            symptoms: ['None reported'],
            medicalHistory: ['Family history of heart disease'],
            notes: 'Lipid panel shows dyslipidemia. Recommend lifestyle modifications and statin therapy. Schedule follow-up in 3 months.'
        },
        {
            id: 4,
            patient: 'Kavita Reddy',
            uhid: 'HMS2024008',
            age: 55,
            gender: 'Female',
            bloodGroup: 'O+',
            reportType: 'X-Ray Chest',
            date: '2024-11-26',
            priority: 'High',
            orderedBy: 'Dr. Priya Sharma',
            testResults: {
                findings: 'Mild infiltrates in right lower lobe. No pleural effusion. Heart size normal.',
                impression: 'Possible pneumonia or bronchitis'
            },
            symptoms: ['Persistent cough', 'Shortness of breath', 'Fever'],
            medicalHistory: ['Asthma', 'COPD'],
            notes: 'X-ray findings suggest lower respiratory tract infection. Start antibiotics (Azithromycin 500mg). Consider CT scan if symptoms persist.'
        },
        {
            id: 5,
            patient: 'Suresh Nair',
            uhid: 'HMS2024009',
            age: 70,
            gender: 'Male',
            bloodGroup: 'A+',
            reportType: 'ECG',
            date: '2024-11-27',
            priority: 'Urgent',
            orderedBy: 'Dr. Anjali Desai',
            testResults: {
                heartRate: { value: '92', unit: 'bpm', normal: '60-100', status: 'Normal' },
                rhythm: 'Atrial Fibrillation',
                findings: 'Irregular rhythm, no ST elevation, T-wave abnormalities in leads V4-V6'
            },
            symptoms: ['Palpitations', 'Dizziness', 'Chest discomfort'],
            medicalHistory: ['Hypertension', 'Previous MI (2019)'],
            notes: 'ECG shows new-onset atrial fibrillation. URGENT: Start anticoagulation therapy. Refer to cardiology for further evaluation and possible cardioversion.'
        }
    ];

    // Quick Actions Data
    const allPatientsData = [
        { id: 'HMS2024001', name: 'Rahul Sharma', age: 45, gender: 'Male', condition: 'Hypertension', lastVisit: '2024-11-20', bloodGroup: 'O+' },
        { id: 'HMS2024002', name: 'Priya Patel', age: 28, gender: 'Female', condition: 'Migraine', lastVisit: '2024-11-22', bloodGroup: 'A+' },
        { id: 'HMS2024003', name: 'Vikram Singh', age: 62, gender: 'Male', condition: 'Diabetes Type 2', lastVisit: '2024-11-18', bloodGroup: 'B+' },
        { id: 'HMS2024004', name: 'Sneha Gupta', age: 34, gender: 'Female', condition: 'Post-surgery Care', lastVisit: '2024-11-25', bloodGroup: 'AB+' },
        { id: 'HMS2024005', name: 'Amit Kumar', age: 52, gender: 'Male', condition: 'Diabetes Management', lastVisit: '2024-11-24', bloodGroup: 'O-' },
        { id: 'HMS2024006', name: 'Anjali Desai', age: 29, gender: 'Female', condition: 'Thyroid Disorder', lastVisit: '2024-11-21', bloodGroup: 'A-' },
        { id: 'HMS2024007', name: 'Rohan Mehta', age: 41, gender: 'Male', condition: 'High Cholesterol', lastVisit: '2024-11-19', bloodGroup: 'B-' },
        { id: 'HMS2024008', name: 'Kavita Reddy', age: 55, gender: 'Female', condition: 'Respiratory Issues', lastVisit: '2024-11-23', bloodGroup: 'O+' },
        { id: 'HMS2024009', name: 'Suresh Nair', age: 70, gender: 'Male', condition: 'Cardiac Monitoring', lastVisit: '2024-11-26', bloodGroup: 'A+' },
        { id: 'HMS2024010', name: 'Sunita Rao', age: 38, gender: 'Female', condition: 'Asthma', lastVisit: '2024-11-17', bloodGroup: 'B+' },
    ];

    const medicalRecordsData = [
        { id: 'REC001', patient: 'Rahul Sharma', type: 'Blood Test (CBC)', date: '2024-11-20', status: 'Completed', result: 'Normal' },
        { id: 'REC002', patient: 'Priya Patel', type: 'MRI Scan', date: '2024-11-22', status: 'Completed', result: 'Under Review' },
        { id: 'REC003', patient: 'Vikram Singh', type: 'Blood Sugar Test', date: '2024-11-18', status: 'Completed', result: 'Elevated' },
        { id: 'REC004', patient: 'Sneha Gupta', type: 'Post-Op X-Ray', date: '2024-11-25', status: 'Completed', result: 'Normal' },
        { id: 'REC005', patient: 'Amit Kumar', type: 'HbA1c Test', date: '2024-11-24', status: 'Pending', result: '-' },
        { id: 'REC006', patient: 'Anjali Desai', type: 'Thyroid Profile', date: '2024-11-21', status: 'Completed', result: 'Abnormal' },
        { id: 'REC007', patient: 'Rohan Mehta', type: 'Lipid Profile', date: '2024-11-19', status: 'Completed', result: 'High LDL' },
        { id: 'REC008', patient: 'Kavita Reddy', type: 'Chest X-Ray', date: '2024-11-23', status: 'Pending', result: '-' },
        { id: 'REC009', patient: 'Suresh Nair', type: 'ECG', date: '2024-11-26', status: 'Completed', result: 'Irregular Rhythm' },
        { id: 'REC010', patient: 'Sunita Rao', type: 'Pulmonary Function Test', date: '2024-11-17', status: 'Completed', result: 'Mild Obstruction' },
    ];

    const scheduleData = [
        {
            day: 'Monday', date: '2024-11-25', slots: [
                { time: '09:00 AM', status: 'Booked', patient: 'Rahul Sharma' },
                { time: '10:00 AM', status: 'Available', patient: '-' },
                { time: '11:00 AM', status: 'Booked', patient: 'Priya Patel' },
                { time: '02:00 PM', status: 'Available', patient: '-' },
                { time: '03:00 PM', status: 'Booked', patient: 'Vikram Singh' },
            ]
        },
        {
            day: 'Tuesday', date: '2024-11-26', slots: [
                { time: '09:00 AM', status: 'Booked', patient: 'Sneha Gupta' },
                { time: '10:00 AM', status: 'Booked', patient: 'Amit Kumar' },
                { time: '11:00 AM', status: 'Available', patient: '-' },
                { time: '02:00 PM', status: 'Booked', patient: 'Anjali Desai' },
                { time: '03:00 PM', status: 'Available', patient: '-' },
            ]
        },
        {
            day: 'Wednesday', date: '2024-11-27', slots: [
                { time: '09:00 AM', status: 'Available', patient: '-' },
                { time: '10:00 AM', status: 'Booked', patient: 'Rohan Mehta' },
                { time: '11:00 AM', status: 'Booked', patient: 'Kavita Reddy' },
                { time: '02:00 PM', status: 'Available', patient: '-' },
                { time: '03:00 PM', status: 'Booked', patient: 'Suresh Nair' },
            ]
        },
        {
            day: 'Thursday', date: '2024-11-28', slots: [
                { time: '09:00 AM', status: 'Booked', patient: 'Sunita Rao' },
                { time: '10:00 AM', status: 'Available', patient: '-' },
                { time: '11:00 AM', status: 'Available', patient: '-' },
                { time: '02:00 PM', status: 'Booked', patient: 'Rahul Sharma' },
                { time: '03:00 PM', status: 'Available', patient: '-' },
            ]
        },
        {
            day: 'Friday', date: '2024-11-29', slots: [
                { time: '09:00 AM', status: 'Available', patient: '-' },
                { time: '10:00 AM', status: 'Booked', patient: 'Priya Patel' },
                { time: '11:00 AM', status: 'Available', patient: '-' },
                { time: '02:00 PM', status: 'Available', patient: '-' },
                { time: '03:00 PM', status: 'Booked', patient: 'Vikram Singh' },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <BackButton className="mb-4" />
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, Dr. {user?.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {todayStats.map((stat, index) => (
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

            {/* Main Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'appointments'
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Today's Appointments
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'pending'
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Pending Reviews
                        <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            0
                        </span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'appointments' ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No appointments scheduled for today</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No pending reviews</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionButton
                    title="View All Patients"
                    icon={Users}
                    onClick={() => setActiveModal('patients')}
                />
                <ActionButton
                    title="Medical Records"
                    icon={FileText}
                    onClick={() => setActiveModal('records')}
                />
                <ActionButton
                    title="My Schedule"
                    icon={Calendar}
                    onClick={() => setActiveModal('schedule')}
                />
            </div>

            {/* Modals */}
            {activeModal === 'patients' && (
                <DashboardModal
                    title="All Patients"
                    onClose={() => setActiveModal(null)}
                >
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No patients found</p>
                    </div>
                </DashboardModal>
            )}

            {/* Other modals would be similar, keeping them empty for now */}
            {activeModal === 'records' && (
                <DashboardModal
                    title="Medical Records"
                    onClose={() => setActiveModal(null)}
                >
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No records found</p>
                    </div>
                </DashboardModal>
            )}

            {activeModal === 'schedule' && (
                <DashboardModal
                    title="My Weekly Schedule"
                    onClose={() => setActiveModal(null)}
                >
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Schedule is empty</p>
                    </div>
                </DashboardModal>
            )}
        </div>
    );
};

const ActionButton = ({ title, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-colors"
    >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{title}</span>
    </button>
);

const DashboardModal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {children}
            </div>
        </div>
    </div>
);

export default DoctorDashboard;
