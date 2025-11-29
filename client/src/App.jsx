import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import RegisterPatient from './pages/RegisterPatient';
import ServiceManager from './pages/Admin/ServiceManager';
import PharmacyPage from './pages/PharmacyPage';
import LabServicesPage from './pages/LabServicesPage';
import CardiologyPage from './pages/CardiologyPage';
import PatientCarePage from './pages/PatientCarePage';
import EmergencyPage from './pages/EmergencyPage';
import SpecialistPage from './pages/SpecialistPage';
import FindSpecialist from './pages/FindSpecialist';
import WardAvailability from './pages/WardAvailability';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return user ? children : <Navigate to="/" />;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/book-appointment"
                                element={
                                    <ProtectedRoute>
                                        <BookAppointment />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/my-appointments"
                                element={
                                    <ProtectedRoute>
                                        <MyAppointments />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/register-patient"
                                element={
                                    <ProtectedRoute>
                                        <RegisterPatient />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/services"
                                element={
                                    <ProtectedRoute>
                                        <ServiceManager />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/find-specialist"
                                element={
                                    <ProtectedRoute>
                                        <FindSpecialist />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/pharmacy" element={<PharmacyPage />} />
                            <Route path="/lab-results" element={<LabServicesPage />} />
                            <Route path="/cardiology" element={<CardiologyPage />} />
                            <Route path="/patient-care" element={<PatientCarePage />} />
                            <Route path="/emergency" element={<EmergencyPage />} />
                            <Route path="/specialists" element={<SpecialistPage />} />
                            <Route path="/wards" element={<WardAvailability />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;


