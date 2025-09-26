import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Circle, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Milestone, Stage, Task, Subtask, TaskStatus } from '../types/progress';

interface ProgressTrackerProps {
  milestones: Milestone[];
  onStatusUpdate?: (type: 'milestone' | 'stage' | 'task' | 'subtask', id: string, status: TaskStatus, parentIds?: any) => void;
  isReadOnly?: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  milestones,
  onStatusUpdate,
  isReadOnly = false
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      completed: 'default',
      in_progress: 'secondary',
      not_started: 'outline'
    } as const;

    const labels = {
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started'
    };

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    );
  };

  const calculateProgress = (items: any[]): number => {
    if (items.length === 0) return 0;
    const completed = items.filter(item => item.status === 'completed').length;
    return (completed / items.length) * 100;
  };

  const handleStatusChange = (
    type: 'milestone' | 'stage' | 'task' | 'subtask',
    id: string,
    status: TaskStatus,
    parentIds?: any
  ) => {
    if (onStatusUpdate) {
      onStatusUpdate(type, id, status, parentIds);
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={() => toggleExpanded(`milestone-${milestone.id}`)}
                    className="flex items-center space-x-2 hover:bg-muted/50 p-1 rounded"
                  >
                    {expandedItems.has(`milestone-${milestone.id}`) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {getStatusIcon(milestone.status)}
                  </CollapsibleTrigger>
                </Collapsible>
                <div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  {milestone.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {!isReadOnly && (
                  <Select
                    value={milestone.status}
                    onValueChange={(status: TaskStatus) =>
                      handleStatusChange('milestone', milestone.id, status)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {getStatusBadge(milestone.status)}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(calculateProgress(milestone.stages))}%</span>
              </div>
              <Progress value={calculateProgress(milestone.stages)} className="h-2" />
            </div>
          </CardHeader>

          <Collapsible open={expandedItems.has(`milestone-${milestone.id}`)}>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-3">
                {milestone.stages.map((stage) => (
                  <StageComponent
                    key={stage.id}
                    stage={stage}
                    milestoneId={milestone.id}
                    expandedItems={expandedItems}
                    toggleExpanded={toggleExpanded}
                    onStatusUpdate={handleStatusChange}
                    isReadOnly={isReadOnly}
                  />
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};

interface StageComponentProps {
  stage: Stage;
  milestoneId: string;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  onStatusUpdate?: (type: any, id: string, status: TaskStatus, parentIds?: any) => void;
  isReadOnly: boolean;
}

const StageComponent: React.FC<StageComponentProps> = ({
  stage,
  milestoneId,
  expandedItems,
  toggleExpanded,
  onStatusUpdate,
  isReadOnly
}) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      completed: 'default',
      in_progress: 'secondary',
      not_started: 'outline'
    } as const;

    const labels = {
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started'
    };

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    );
  };

  const calculateProgress = (items: any[]): number => {
    if (items.length === 0) return 0;
    const completed = items.filter(item => item.status === 'completed').length;
    return (completed / items.length) * 100;
  };

  return (
    <div className="border rounded-lg p-4 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Collapsible>
            <CollapsibleTrigger
              onClick={() => toggleExpanded(`stage-${stage.id}`)}
              className="flex items-center space-x-2 hover:bg-muted/50 p-1 rounded"
            >
              {expandedItems.has(`stage-${stage.id}`) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {getStatusIcon(stage.status)}
            </CollapsibleTrigger>
          </Collapsible>
          <div>
            <h4 className="font-medium">{stage.title}</h4>
            {stage.description && (
              <p className="text-sm text-muted-foreground">{stage.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isReadOnly && onStatusUpdate && (
            <Select
              value={stage.status}
              onValueChange={(status: TaskStatus) =>
                onStatusUpdate('stage', stage.id, status, { milestoneId })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          )}
          {getStatusBadge(stage.status)}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
          <span>Tasks Progress</span>
          <span>{Math.round(calculateProgress(stage.tasks))}%</span>
        </div>
        <Progress value={calculateProgress(stage.tasks)} className="h-1.5" />
      </div>

      <Collapsible open={expandedItems.has(`stage-${stage.id}`)}>
        <CollapsibleContent>
          <div className="space-y-2">
            {stage.tasks.map((task) => (
              <TaskComponent
                key={task.id}
                task={task}
                stageId={stage.id}
                milestoneId={milestoneId}
                expandedItems={expandedItems}
                toggleExpanded={toggleExpanded}
                onStatusUpdate={onStatusUpdate}
                isReadOnly={isReadOnly}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

interface TaskComponentProps {
  task: Task;
  stageId: string;
  milestoneId: string;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  onStatusUpdate?: (type: any, id: string, status: TaskStatus, parentIds?: any) => void;
  isReadOnly: boolean;
}

const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  stageId,
  milestoneId,
  expandedItems,
  toggleExpanded,
  onStatusUpdate,
  isReadOnly
}) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      completed: 'default',
      in_progress: 'secondary',
      not_started: 'outline'
    } as const;

    const labels = {
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started'
    };

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="border rounded p-3 bg-background">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {task.subtasks.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(`task-${task.id}`)}
              className="h-6 w-6 p-0"
            >
              {expandedItems.has(`task-${task.id}`) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}
          {getStatusIcon(task.status)}
          <span className="font-medium text-sm">{task.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isReadOnly && onStatusUpdate && (
            <Select
              value={task.status}
              onValueChange={(status: TaskStatus) =>
                onStatusUpdate('task', task.id, status, { milestoneId, stageId })
              }
            >
              <SelectTrigger className="w-28 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          )}
          {getStatusBadge(task.status)}
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
      )}

      {task.subtasks.length > 0 && expandedItems.has(`task-${task.id}`) && (
        <div className="mt-3 space-y-2 pl-4 border-l-2 border-muted">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(subtask.status)}
                <span className="text-sm">{subtask.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                {!isReadOnly && onStatusUpdate && (
                  <Select
                    value={subtask.status}
                    onValueChange={(status: TaskStatus) =>
                      onStatusUpdate('subtask', subtask.id, status, {
                        milestoneId,
                        stageId,
                        taskId: task.id
                      })
                    }
                  >
                    <SelectTrigger className="w-24 h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {getStatusBadge(subtask.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};