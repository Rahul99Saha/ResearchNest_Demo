import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProgressTracker } from '../components/ProgressTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { StudentProgress, TaskStatus } from '../types/progress';
import { mockAllStudentsProgress } from '../data/mockData';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studentsProgress, setStudentsProgress] = useState<StudentProgress[]>(mockAllStudentsProgress);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on_track' | 'behind' | 'at_risk'>('all');

  // Calculate overall statistics
  const totalStudents = studentsProgress.length;
  const studentsOnTrack = studentsProgress.filter(s => s.overallProgress >= 70).length;
  const studentsBehind = studentsProgress.filter(s => s.overallProgress >= 40 && s.overallProgress < 70).length;
  const studentsAtRisk = studentsProgress.filter(s => s.overallProgress < 40).length;

  // Filter students based on search and status
  const filteredStudents = studentsProgress.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (statusFilter) {
      case 'on_track':
        return student.overallProgress >= 70;
      case 'behind':
        return student.overallProgress >= 40 && student.overallProgress < 70;
      case 'at_risk':
        return student.overallProgress < 40;
      default:
        return true;
    }
  });

  const handleStatusUpdate = async (
    studentId: string,
    type: 'milestone' | 'stage' | 'task' | 'subtask',
    id: string,
    status: TaskStatus,
    parentIds?: any
  ) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the progress state for the specific student
      setStudentsProgress(prevProgress => 
        prevProgress.map(student => {
          if (student.studentId !== studentId) return student;
          
          const newStudent = { ...student };
          
          if (type === 'milestone') {
            const milestone = newStudent.milestones.find(m => m.id === id);
            if (milestone) {
              milestone.status = status;
            }
          } else if (type === 'stage') {
            const milestone = newStudent.milestones.find(m => m.id === parentIds.milestoneId);
            if (milestone) {
              const stage = milestone.stages.find(s => s.id === id);
              if (stage) {
                stage.status = status;
              }
            }
          } else if (type === 'task') {
            const milestone = newStudent.milestones.find(m => m.id === parentIds.milestoneId);
            if (milestone) {
              const stage = milestone.stages.find(s => s.id === parentIds.stageId);
              if (stage) {
                const task = stage.tasks.find(t => t.id === id);
                if (task) {
                  task.status = status;
                }
              }
            }
          } else if (type === 'subtask') {
            const milestone = newStudent.milestones.find(m => m.id === parentIds.milestoneId);
            if (milestone) {
              const stage = milestone.stages.find(s => s.id === parentIds.stageId);
              if (stage) {
                const task = stage.tasks.find(t => t.id === parentIds.taskId);
                if (task) {
                  const subtask = task.subtasks.find(st => st.id === id);
                  if (subtask) {
                    subtask.status = status;
                  }
                }
              }
            }
          }
          
          return newStudent;
        })
      );

      // Update selected student if it's the one being modified
      if (selectedStudent && selectedStudent.studentId === studentId) {
        setSelectedStudent(prev => {
          if (!prev) return null;
          return studentsProgress.find(s => s.studentId === studentId) || prev;
        });
      }
      
      console.log('Faculty override:', { studentId, type, id, status, parentIds });
      
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return 'text-green-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBadge = (progress: number) => {
    if (progress >= 70) return <Badge className="bg-green-100 text-green-800">On Track</Badge>;
    if (progress >= 40) return <Badge className="bg-yellow-100 text-yellow-800">Behind</Badge>;
    return <Badge className="bg-red-100 text-red-800">At Risk</Badge>;
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage student research progress across all supervised projects.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Under supervision
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Track</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{studentsOnTrack}</div>
              <p className="text-xs text-muted-foreground">
                Progress ≥ 70%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Behind Schedule</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{studentsBehind}</div>
              <p className="text-xs text-muted-foreground">
                Progress 40-70%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{studentsAtRisk}</div>
              <p className="text-xs text-muted-foreground">
                Progress &lt; 40%
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
                <CardDescription>
                  Monitor all students' research progress and identify those who need attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="on_track">On Track</SelectItem>
                      <SelectItem value="behind">Behind Schedule</SelectItem>
                      <SelectItem value="at_risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Students List */}
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {student.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getProgressColor(student.overallProgress)}`}>
                            {student.overallProgress}%
                          </div>
                          <Progress value={student.overallProgress} className="w-24 h-2" />
                        </div>
                        {getProgressBadge(student.overallProgress)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {selectedStudent ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedStudent.studentName} - Detailed Progress</CardTitle>
                      <CardDescription>{selectedStudent.email}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl font-bold ${getProgressColor(selectedStudent.overallProgress)}`}>
                        {selectedStudent.overallProgress}%
                      </div>
                      {getProgressBadge(selectedStudent.overallProgress)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Faculty Override:</strong> You can modify any student's progress status. 
                      Changes will be logged and the student will be notified.
                    </p>
                  </div>
                  <ProgressTracker
                    milestones={selectedStudent.milestones}
                    onStatusUpdate={(type, id, status, parentIds) =>
                      handleStatusUpdate(selectedStudent.studentId, type, id, status, parentIds)
                    }
                    isReadOnly={false}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Student</CardTitle>
                  <CardDescription>
                    Choose a student from the overview tab to view their detailed progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No student selected. Go to the Overview tab and click "View Details" on any student.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};