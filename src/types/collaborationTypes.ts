// src/types/collaborationTypes.ts

// Enum for user roles in the collaboration environment
export enum UserRole {
    Admin = 'Admin',
    Contributor = 'Contributor',
    Viewer = 'Viewer',
  }
  
  // Enum for task status types in collaboration tasks or projects
  export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Archived = 'Archived',
  }
  
  // Base interface for general user information in collaboration
  export interface Collaborator {
    id: string;                     // Unique identifier for the user
    name: string;                   // Full name of the collaborator
    email: string;                  // Email address for notifications, etc.
    role: UserRole;                 // Role of the collaborator within the system
    isActive: boolean;              // Status of whether the collaborator is active or inactive
  }
  
  // Interface for project task information within collaboration projects
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo: Collaborator[];     // Multiple collaborators can be assigned
    dueDate: string;                // Date in ISO format
    completionPercentage?: number;  // Optional completion metric, useful for progress tracking
  }
  
  // Detailed metrics on collaboration performance
  export interface CollaborationMetrics {
    engagementScore: number;             // Quantified engagement level (e.g., from 0-100)
    taskCompletionRate: number;          // Percentage of tasks completed on time
    activeUsers: number;                 // Number of users currently active in the system
    averageResponseTime: number;         // Average response time to tasks (in hours)
    collaborationDate: string;           // Date for the recorded metrics (in ISO format)
  }
  
  // Interface for detailed analytics reports used for admin dashboards
  export interface CollaborationAnalyticsReport {
    metrics: CollaborationMetrics[];
    mostEngagedUser: Collaborator;       // Collaborator with the highest engagement
    topTasks: Task[];                    // Top tasks by engagement, completion, etc.
    overdueTasks: Task[];                // List of tasks past due, to identify bottlenecks
  }
  
  // Paginated results interface for API responses
  export interface PaginatedResult<T> {
    data: T[];                           // Array of the specific data type
    currentPage: number;                 // Current page number in pagination
    totalPages: number;                  // Total pages available
    totalRecords: number;                // Total number of records
  }
  
  // Type for options in filter dropdowns, e.g., 'All' or specific statuses/roles
  export type FilterOptions = 'All' | UserRole | TaskStatus;
  
  // Props for components that will use collaboration data
  export interface CollaborationTableProps {
    collaborators: Collaborator[];       // Array of collaborators for display
    metrics: CollaborationMetrics[];     // Array of metrics to track engagement and performance
  }
  
  // Type for combining metrics and filtering capabilities
  export type FilterableMetrics = {
    metrics: CollaborationMetrics[];
    filters: {
      dateRange?: { start: string; end: string };
      engagementThreshold?: number;
      taskCompletionThreshold?: number;
    };
  };
  