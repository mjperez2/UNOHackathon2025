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
  
  export interface StudyGroup {
    id: string;
    course_id: number;
    name: string;
    description: string;
    members: string[];
    schedule: StudyGroupSchedule[];
    created_by: string;
    created_at: string;
  }
  
  export interface StudyGroupSchedule {
    id: string;
    group_id: string;
    day_of_week: number; // 0-6 for Sunday-Saturday
    start_time: string; // HH:mm format
    end_time: string; // HH:mm format
    location: string;
    recurring: boolean;
  }
  
  export interface ClassChannel {
    id: string;
    course_id: number;
    name: string;
    description: string;
    announcements: ChannelAnnouncement[];
    events: ChannelEvent[];
    members: string[];
    created_at: string;
  }
  
  export interface ChannelAnnouncement {
    id: string;
    channel_id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
    attachments: string[];
  }
  
  export interface ChannelEvent {
    id: string;
    channel_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    type: 'exam' | 'assignment' | 'study_session' | 'other';
    created_by: string;
    created_at: string;
  }
  
  // Mock data
  const mockCourses: CanvasCourse[] = [
    {
      id: 1001,
      name: "Data Structures",
      course_code: "CSCI 2121",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1002,
      name: "Machine Learning",
      course_code: "CSCI 3000",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1003,
      name: "Operating Systems",
      course_code: "CSCI 4525",
      start_at: "2025-01-10T08:00:00Z",
      end_at: "2025-05-15T23:59:59Z"
    },
    {
      id: 1004,
      name: "Networking",
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
  
  const mockStudyGroups: StudyGroup[] = [
    {
      id: '1',
      course_id: 1001,
      name: 'CS I Study Group',
      description: 'Weekly study sessions for CS I',
      members: ['user1', 'user2', 'user3'],
      schedule: [
        {
          id: '1',
          group_id: '1',
          day_of_week: 2, // Tuesday
          start_time: '15:00',
          end_time: '16:30',
          location: 'Library Room 101',
          recurring: true,
        },
      ],
      created_by: 'user1',
      created_at: '2024-03-20T10:00:00Z',
    },
  ];
  
  const mockClassChannels: ClassChannel[] = [
    {
      id: '1',
      course_id: 1001,
      name: 'CS I Discussion',
      description: 'General discussion for CS I students',
      announcements: [
        {
          id: '1',
          channel_id: '1',
          title: 'Midterm Review Session',
          content: 'Join us for a review session before the midterm...',
          author: 'user1',
          created_at: '2024-03-20T15:00:00Z',
          attachments: [],
        },
      ],
      events: [
        {
          id: '1',
          channel_id: '1',
          title: 'Midterm Exam',
          description: 'First midterm exam covering chapters 1-5',
          start_time: '2024-03-25T09:00:00Z',
          end_time: '2024-03-25T10:30:00Z',
          location: 'Room 201',
          type: 'exam',
          created_by: 'user1',
          created_at: '2024-03-20T15:00:00Z',
        },
      ],
      members: ['user1', 'user2', 'user3'],
      created_at: '2024-03-20T10:00:00Z',
    },
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
    },
    
    // New functions for study groups
    getStudyGroups: async (courseId?: number): Promise<StudyGroup[]> => {
      await delay(800);
      return courseId 
        ? mockStudyGroups.filter(group => group.course_id === courseId)
        : mockStudyGroups;
    },
    
    createStudyGroup: async (group: Omit<StudyGroup, 'id' | 'created_at'>): Promise<StudyGroup> => {
      await delay(800);
      const newGroup: StudyGroup = {
        ...group,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      mockStudyGroups.push(newGroup);
      return newGroup;
    },
    
    updateStudyGroup: async (id: string, updates: Partial<StudyGroup>): Promise<StudyGroup> => {
      await delay(800);
      const index = mockStudyGroups.findIndex(group => group.id === id);
      if (index === -1) throw new Error('Study group not found');
      mockStudyGroups[index] = { ...mockStudyGroups[index], ...updates };
      return mockStudyGroups[index];
    },
    
    // New functions for class channels
    getClassChannels: async (courseId?: number): Promise<ClassChannel[]> => {
      await delay(800);
      return courseId
        ? mockClassChannels.filter(channel => channel.course_id === courseId)
        : mockClassChannels;
    },
    
    createClassChannel: async (channel: Omit<ClassChannel, 'id' | 'created_at' | 'announcements' | 'events'>): Promise<ClassChannel> => {
      await delay(800);
      const newChannel: ClassChannel = {
        ...channel,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        announcements: [],
        events: [],
      };
      mockClassChannels.push(newChannel);
      return newChannel;
    },
    
    addChannelAnnouncement: async (channelId: string, announcement: Omit<ChannelAnnouncement, 'id' | 'created_at'>): Promise<ChannelAnnouncement> => {
      await delay(800);
      const channel = mockClassChannels.find(c => c.id === channelId);
      if (!channel) throw new Error('Channel not found');
      const newAnnouncement: ChannelAnnouncement = {
        ...announcement,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      channel.announcements.push(newAnnouncement);
      return newAnnouncement;
    },
    
    addChannelEvent: async (channelId: string, event: Omit<ChannelEvent, 'id' | 'created_at'>): Promise<ChannelEvent> => {
      await delay(800);
      const channel = mockClassChannels.find(c => c.id === channelId);
      if (!channel) throw new Error('Channel not found');
      const newEvent: ChannelEvent = {
        ...event,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      channel.events.push(newEvent);
      return newEvent;
    },
  };

  export default canvasAPI;