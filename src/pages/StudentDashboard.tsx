import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProgressTracker } from '../components/ProgressTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { BookOpen, Target, Clock, CheckCircle } from 'lucide-react';
import { StudentProgress, TaskStatus, ProgressUpdate } from '../types/progress';
import { mockStudentProgress } from '../data/mockData';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(mockStudentProgress);
  const [loading, setLoading] = useState(false);

  // Calculate overall statistics
  const totalMilestones = studentProgress.milestones.length;
  const completedMilestones = studentProgress.milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = studentProgress.milestones.filter(m => m.status === 'in_progress').length;

  const allTasks = studentProgress.milestones.flatMap(m => 
    m.stages.flatMap(s => s.tasks)
  );
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const totalTasks = allTasks.length;

  const handleStatusUpdate = async (
    type: 'milestone' | 'stage' | 'task' | 'subtask',
    id: string,
    status: TaskStatus,
    parentIds?: any
  ) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the progress state
      setStudentProgress(prevProgress => {
        const newProgress = { ...prevProgress };
        
        if (type === 'milestone') {
          const milestone = newProgress.milestones.find(m => m.id === id);
          if (milestone) {
            milestone.status = status;
          }
        } else if (type === 'stage') {
          const milestone = newProgress.milestones.find(m => m.id === parentIds.milestoneId);
          if (milestone) {
            const stage = milestone.stages.find(s => s.id === id);
            if (stage) {
              stage.status = status;
            }
          }
        } else if (type === 'task') {
          const milestone = newProgress.milestones.find(m => m.id === parentIds.milestoneId);
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
          const milestone = newProgress.milestones.find(m => m.id === parentIds.milestoneId);
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
        
        return newProgress;
      });
      
      // In a real app, this would make an API call to update the backend
      console.log('Status updated:', { type, id, status, parentIds });
      
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Track your research progress and manage your milestones.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentProgress.overallProgress}%</div>
              <Progress value={studentProgress.overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Milestones</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedMilestones}/{totalMilestones}</div>
              <p className="text-xs text-muted-foreground">
                Completed milestones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressMilestones}</div>
              <p className="text-xs text-muted-foreground">
                In progress milestones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                Tasks completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Research Progress Tracker</CardTitle>
            <CardDescription>
              Track your progress through research milestones, stages, and tasks. 
              Click on items to expand and update your progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">Updating progress...</p>
              </div>
            )}
            <ProgressTracker
              milestones={studentProgress.milestones}
              onStatusUpdate={handleStatusUpdate}
              isReadOnly={false}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Literature Review completed</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Started Data Collection</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Pilot Study completed</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Data Collection Phase</p>
                    <p className="text-xs text-muted-foreground">Due: June 30, 2024</p>
                  </div>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Data Analysis</p>
                    <p className="text-xs text-muted-foreground">Due: September 30, 2024</p>
                  </div>
                  <Badge variant="outline">Not Started</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Thesis Writing</p>
                    <p className="text-xs text-muted-foreground">Due: December 31, 2024</p>
                  </div>
                  <Badge variant="outline">Not Started</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};