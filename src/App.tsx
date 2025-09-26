import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { Profile } from './pages/Profile';
import { Unauthorized } from './pages/Unauthorized';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getDashboardRedirect = () => {
    if (!user) return '/login';
    if (user.role === 'student') return '/student/dashboard';
    if (user.role === 'faculty' || user.role === 'admin') return '/faculty/dashboard';
    return '/login';
  };

  return (
    <>
      {user && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={user ? <Navigate to={getDashboardRedirect()} replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to={getDashboardRedirect()} replace /> : <Register />} 
        />
        
        {/* Protected routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        {/* Utility routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Default redirect */}
        <Route
          path="/"
          element={<Navigate to={getDashboardRedirect()} replace />}
        />
        
        {/* Catch all route */}
        <Route
          path="*"
          element={<Navigate to={getDashboardRedirect()} replace />}
        />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}