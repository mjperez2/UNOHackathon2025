// Define types for Canvas data
export interface CanvasUser {
    id: number;
    name: string;
    email: string;
  }
  
  export interface CanvasCourse {
    id: number;
    name: string;
    course_code: string;
    start_at: string;
    end_at: string;
  }
  
  export interface CanvasAssignment {
    id: number;
    course_id: number;
    name: string;
    description: string;
    due_at: string;
    points_possible: number;
    submission_types: string[];
  }
  
  export interface CanvasAnnouncement {
    id: number;
    course_id: number;
    title: string;
    message: string;
    posted_at: string;
  }
  
  // Mock data
  const mockCourses: CanvasCourse[] = [
    {
      id: 1001,
      name: "Computer Science I",
      course_code: "CSCI 1583",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1002,
      name: "Data Structures",
      course_code: "CSCI 2121",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1003,
      name: "Machine Learning",
      course_code: "CSCI 4525",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1004,
      name: "Database Management",
      course_code: "CSCI 4000",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    }
  ];
  
  const mockAssignments: CanvasAssignment[] = [
    {
      id: 2001,
      course_id: 1001,
      name: "Assignment 1: Variables and Control Flow",
      description: "Implement basic control flow structures in Java.",
      due_at: "2025-02-01T23:59:59Z",
      points_possible: 100,
      submission_types: ["online_upload"]
    },
    {
      id: 2002,
      course_id: 1001,
      name: "Assignment 2: Classes and Objects",
      description: "Create classes with proper encapsulation.",
      due_at: "2025-02-15T23:59:59Z",
      points_possible: 100,
      submission_types: ["online_upload"]
    },
    {
      id: 2003,
      course_id: 1002,
      name: "Project 1: Linked Lists",
      description: "Implement a doubly-linked list with iterators.",
      due_at: "2025-02-10T23:59:59Z",
      points_possible: 100,
      submission_types: ["online_upload", "online_text_entry"]
    },
    {
      id: 2004,
      course_id: 1002,
      name: "Project 2: Binary Search Trees",
      description: "Implement a binary search tree with common operations.",
      due_at: "2025-03-01T23:59:59Z",
      points_possible: 100,
      submission_types: ["online_upload"]
    },
    {
      id: 2005,
      course_id: 1003,
      name: "Lab 1: Linear Regression",
      description: "Implement linear regression from scratch.",
      due_at: "2025-02-05T23:59:59Z",
      points_possible: 50,
      submission_types: ["online_upload", "online_text_entry"]
    }
  ];
  
  const mockAnnouncements: CanvasAnnouncement[] = [
    {
      id: 3001,
      course_id: 1001,
      title: "Welcome to Computer Science I",
      message: "Welcome to the course! Please review the syllabus and complete the intro survey.",
      posted_at: "2025-01-10T09:00:00Z"
    },
    {
      id: 3002,
      course_id: 1002,
      title: "Project Teams",
      message: "Please form teams of 2-3 students for the semester project by next week.",
      posted_at: "2025-01-12T10:30:00Z"
    }
  ];
  
  // Simulate network delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Canvas API mock service
  export const canvasAPI = {
    // Authentication
    login: async (username: string, password: string) => {
      await delay(800);
      // Accept any credentials for demo purposes
      if (username && password) {
        return { 
          success: true, 
          user: { 
            id: 12345, 
            name: 'Demo Student',
            email: `${username}@example.com`
          }
        };
      }
      throw new Error('Invalid credentials');
    },
    
    // Get user's courses
    getCourses: async () => {
      await delay(1000);
      return mockCourses;
    },
    
    // Get assignments for a course
    getAssignmentsForCourse: async (courseId: number) => {
      await delay(800);
      return mockAssignments.filter(a => a.course_id === courseId);
    },
    
    // Get announcements for a course
    getAnnouncementsForCourse: async (courseId: number) => {
      await delay(600);
      return mockAnnouncements.filter(a => a.course_id === courseId);
    },
    
    // Get upcoming assignments across all courses
    getUpcomingAssignments: async () => {
      await delay(900);
      const now = new Date();
      return mockAssignments
        .filter(a => new Date(a.due_at) > now)
        .sort((a, b) => new Date(a.due_at).getTime() - new Date(b.due_at).getTime());
    }
  };

  export default canvasAPI;