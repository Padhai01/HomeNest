import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import PropertyDetail from './pages/PropertyDetail';
import Bookmarks from './pages/Bookmarks';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import ManageImages from './pages/ManageImages';
import ContactRequests from './pages/ContactRequests';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RentCalculator from './pages/RentCalculator';

function Guard({ children, role }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;
    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/browse" element={<Browse />} />
                            <Route path="/property/:id" element={<PropertyDetail />} />
                            <Route path="/calculator" element={<RentCalculator />} />
                            <Route path="/bookmarks" element={<Guard role="renter"><Bookmarks /></Guard>} />
                            <Route path="/profile" element={<Guard><Profile /></Guard>} />
                            <Route path="/owner/dashboard" element={<Guard role="owner"><OwnerDashboard /></Guard>} />
                            <Route path="/owner/add" element={<Guard role="owner"><AddProperty /></Guard>} />
                            <Route path="/owner/edit/:id" element={<Guard role="owner"><EditProperty /></Guard>} />
                            <Route path="/owner/images/:id" element={<Guard role="owner"><ManageImages /></Guard>} />
                            <Route path="/owner/contacts" element={<Guard role="owner"><ContactRequests /></Guard>} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}
