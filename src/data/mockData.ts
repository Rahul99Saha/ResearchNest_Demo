import { StudentProgress, Milestone } from '../types/progress';

export const mockStudentProgress: StudentProgress = {
  studentId: '1',
  studentName: 'John Doe',
  email: 'student@test.com',
  overallProgress: 45,
  milestones: [
    {
      id: 'milestone-1',
      title: 'Research Proposal Development',
      description: 'Develop and refine your research proposal including literature review and methodology',
      status: 'completed',
      dueDate: '2024-02-15',
      stages: [
        {
          id: 'stage-1-1',
          title: 'Literature Review',
          description: 'Conduct comprehensive literature review in your field',
          status: 'completed',
          tasks: [
            {
              id: 'task-1-1-1',
              title: 'Identify Key Sources',
              description: 'Find and catalog 50+ relevant academic sources',
              status: 'completed',
              dueDate: '2024-01-15',
              subtasks: [
                {
                  id: 'subtask-1-1-1-1',
                  title: 'Search academic databases',
                  status: 'completed'
                },
                {
                  id: 'subtask-1-1-1-2',
                  title: 'Create citation database',
                  status: 'completed'
                }
              ]
            },
            {
              id: 'task-1-1-2',
              title: 'Critical Analysis',
              description: 'Analyze and synthesize literature findings',
              status: 'completed',
              subtasks: [
                {
                  id: 'subtask-1-1-2-1',
                  title: 'Create thematic analysis',
                  status: 'completed'
                },
                {
                  id: 'subtask-1-1-2-2',
                  title: 'Identify research gaps',
                  status: 'completed'
                }
              ]
            }
          ]
        },
        {
          id: 'stage-1-2',
          title: 'Methodology Design',
          description: 'Design research methodology and data collection methods',
          status: 'completed',
          tasks: [
            {
              id: 'task-1-2-1',
              title: 'Research Design',
              description: 'Define overall research approach and design',
              status: 'completed',
              subtasks: [
                {
                  id: 'subtask-1-2-1-1',
                  title: 'Choose research paradigm',
                  status: 'completed'
                },
                {
                  id: 'subtask-1-2-1-2',
                  title: 'Design data collection framework',
                  status: 'completed'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'milestone-2',
      title: 'Data Collection Phase',
      description: 'Execute data collection according to approved methodology',
      status: 'in_progress',
      dueDate: '2024-06-30',
      stages: [
        {
          id: 'stage-2-1',
          title: 'Pilot Study',
          description: 'Conduct pilot study to test methodology',
          status: 'completed',
          tasks: [
            {
              id: 'task-2-1-1',
              title: 'Recruit Pilot Participants',
              status: 'completed',
              subtasks: [
                {
                  id: 'subtask-2-1-1-1',
                  title: 'Create recruitment materials',
                  status: 'completed'
                },
                {
                  id: 'subtask-2-1-1-2',
                  title: 'Contact potential participants',
                  status: 'completed'
                }
              ]
            }
          ]
        },
        {
          id: 'stage-2-2',
          title: 'Main Data Collection',
          description: 'Collect primary research data',
          status: 'in_progress',
          tasks: [
            {
              id: 'task-2-2-1',
              title: 'Participant Recruitment',
              description: 'Recruit main study participants',
              status: 'in_progress',
              subtasks: [
                {
                  id: 'subtask-2-2-1-1',
                  title: 'Screen potential participants',
                  status: 'in_progress'
                },
                {
                  id: 'subtask-2-2-1-2',
                  title: 'Obtain informed consent',
                  status: 'not_started'
                }
              ]
            },
            {
              id: 'task-2-2-2',
              title: 'Data Collection Sessions',
              description: 'Conduct interviews/surveys/observations',
              status: 'not_started',
              subtasks: [
                {
                  id: 'subtask-2-2-2-1',
                  title: 'Schedule sessions',
                  status: 'not_started'
                },
                {
                  id: 'subtask-2-2-2-2',
                  title: 'Conduct sessions',
                  status: 'not_started'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'milestone-3',
      title: 'Data Analysis',
      description: 'Analyze collected data and interpret findings',
      status: 'not_started',
      dueDate: '2024-09-30',
      stages: [
        {
          id: 'stage-3-1',
          title: 'Data Preparation',
          description: 'Clean and prepare data for analysis',
          status: 'not_started',
          tasks: [
            {
              id: 'task-3-1-1',
              title: 'Data Cleaning',
              status: 'not_started',
              subtasks: [
                {
                  id: 'subtask-3-1-1-1',
                  title: 'Check for missing data',
                  status: 'not_started'
                },
                {
                  id: 'subtask-3-1-1-2',
                  title: 'Handle outliers',
                  status: 'not_started'
                }
              ]
            }
          ]
        },
        {
          id: 'stage-3-2',
          title: 'Statistical Analysis',
          description: 'Perform statistical analysis of data',
          status: 'not_started',
          tasks: [
            {
              id: 'task-3-2-1',
              title: 'Descriptive Statistics',
              status: 'not_started',
              subtasks: []
            },
            {
              id: 'task-3-2-2',
              title: 'Inferential Statistics',
              status: 'not_started',
              subtasks: []
            }
          ]
        }
      ]
    },
    {
      id: 'milestone-4',
      title: 'Thesis Writing',
      description: 'Write and revise thesis document',
      status: 'not_started',
      dueDate: '2024-12-31',
      stages: [
        {
          id: 'stage-4-1',
          title: 'First Draft',
          description: 'Complete first draft of thesis',
          status: 'not_started',
          tasks: [
            {
              id: 'task-4-1-1',
              title: 'Introduction Chapter',
              status: 'not_started',
              subtasks: []
            },
            {
              id: 'task-4-1-2',
              title: 'Literature Review Chapter',
              status: 'not_started',
              subtasks: []
            },
            {
              id: 'task-4-1-3',
              title: 'Methodology Chapter',
              status: 'not_started',
              subtasks: []
            }
          ]
        }
      ]
    }
  ]
};

export const mockAllStudentsProgress: StudentProgress[] = [
  mockStudentProgress,
  {
    studentId: '2',
    studentName: 'Jane Smith',
    email: 'jane.smith@university.edu',
    overallProgress: 75,
    milestones: [
      {
        id: 'milestone-1',
        title: 'Research Proposal Development',
        status: 'completed',
        stages: [
          {
            id: 'stage-1-1',
            title: 'Literature Review',
            status: 'completed',
            tasks: [
              {
                id: 'task-1-1-1',
                title: 'Identify Key Sources',
                status: 'completed',
                subtasks: []
              }
            ]
          }
        ]
      },
      {
        id: 'milestone-2',
        title: 'Data Collection Phase',
        status: 'completed',
        stages: [
          {
            id: 'stage-2-1',
            title: 'Pilot Study',
            status: 'completed',
            tasks: [
              {
                id: 'task-2-1-1',
                title: 'Recruit Pilot Participants',
                status: 'completed',
                subtasks: []
              }
            ]
          }
        ]
      },
      {
        id: 'milestone-3',
        title: 'Data Analysis',
        status: 'in_progress',
        stages: [
          {
            id: 'stage-3-1',
            title: 'Data Preparation',
            status: 'in_progress',
            tasks: [
              {
                id: 'task-3-1-1',
                title: 'Data Cleaning',
                status: 'in_progress',
                subtasks: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    studentId: '3',
    studentName: 'Mike Johnson',
    email: 'mike.johnson@university.edu',
    overallProgress: 25,
    milestones: [
      {
        id: 'milestone-1',
        title: 'Research Proposal Development',
        status: 'in_progress',
        stages: [
          {
            id: 'stage-1-1',
            title: 'Literature Review',
            status: 'in_progress',
            tasks: [
              {
                id: 'task-1-1-1',
                title: 'Identify Key Sources',
                status: 'in_progress',
                subtasks: []
              }
            ]
          }
        ]
      }
    ]
  }
];