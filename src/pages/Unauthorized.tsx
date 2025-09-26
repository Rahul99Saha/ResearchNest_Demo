import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            This page requires specific permissions that your account doesn't have. 
            Please contact your administrator if you believe this is an error.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">Sign in with Different Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};