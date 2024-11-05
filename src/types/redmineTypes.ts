export interface RedmineIssuesResponse {
  issues: Issue[];
  total_count: number;
  offset: number;
  limit: number;
}

export interface Issue {
  id: number;
  project: Project;
  tracker: Tracker;
  status: Status;
  priority: Priority;
  author: User;
  assigned_to?: User;
  subject: string;
  description?: string;
  start_date?: string;
  due_date?: string;
  done_ratio: number;
  estimated_hours?: number;
  created_on: string;
  updated_on: string;
  closed_on?: string | null;
}

export interface Project {
  id: number;
  name: string;
}

export interface Tracker {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}
