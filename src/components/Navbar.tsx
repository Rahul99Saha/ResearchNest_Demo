import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (user?.role === 'student') return '/student/dashboard';
    if (user?.role === 'faculty' || user?.role === 'admin') return '/faculty/dashboard';
    return '/';
  };

  return (
    <nav className="bg-background border-b border-border px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={getDashboardPath()} className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">ResearchNest</span>
          </Link>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <Link
              to={getDashboardPath()}
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};