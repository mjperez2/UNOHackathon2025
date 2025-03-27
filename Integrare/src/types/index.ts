export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  description: string;
  schedule: string;
  location: string;
  assignments: Assignment[];
  studyGroups: StudyGroup[];
}

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface StudyGroup {
  id: number;
  name: string;
  time: string;
  members: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  major: string;
  year: number;
  courses: Course[];
}

export interface RootStackParamList {
  [key: string]: undefined | { courseId: number };
  Login: undefined;
  Home: undefined;
  Course: { courseId: number };
  Profile: undefined;
} 