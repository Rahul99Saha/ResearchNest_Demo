import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { User, Mail, Shield, Edit, Save, X } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log('Updating profile:', { name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      student: { variant: 'default' as const, label: 'Student' },
      faculty: { variant: 'secondary' as const, label: 'Faculty' },
      admin: { variant: 'destructive' as const, label: 'Administrator' }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.student;
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="flex justify-center mt-3">
                  {getRoleBadge(user.role)}
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member since</span>
                  <span className="text-sm font-medium">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last login</span>
                  <span className="text-sm font-medium">Today</span>
                </div>
                {user.role === 'student' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Research progress</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <span className="text-sm font-mono">{user.id}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your research progress
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your account password
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Research Information (Student Only) */}
            {user.role === 'student' && (
              <Card>
                <CardHeader>
                  <CardTitle>Research Information</CardTitle>
                  <CardDescription>
                    Your current research project details and supervision.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Research Topic</Label>
                      <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">
                        Machine Learning Applications in Healthcare
                      </p>
                    </div>
                    <div>
                      <Label>Supervisor</Label>
                      <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">
                        Dr. Smith
                      </p>
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">
                        January 1, 2024
                      </p>
                    </div>
                    <div>
                      <Label>Expected Completion</Label>
                      <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">
                        December 31, 2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};