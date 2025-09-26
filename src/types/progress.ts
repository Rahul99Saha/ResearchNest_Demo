export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  subtasks: Subtask[];
}

export interface Stage {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  tasks: Task[];
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  stages: Stage[];
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  email: string;
  milestones: Milestone[];
  overallProgress: number;
}

export interface ProgressUpdate {
  type: 'milestone' | 'stage' | 'task' | 'subtask';
  id: string;
  status: TaskStatus;
  parentIds?: {
    milestoneId?: string;
    stageId?: string;
    taskId?: string;
  };
}