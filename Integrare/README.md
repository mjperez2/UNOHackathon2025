# Integrare - Academic Collaboration Platform

## Overview
Integrare is a specialized academic collaboration platform that integrates with Canvas to enhance student learning and career development. Built during a 3-day hackathon, this platform focuses on connecting students, facilitating collaborative learning, and providing career development resources.

## Key Features

### Core Features (Hackathon Focus)
- **Career Development Focus**
  - Alumni networking features
  - Major-specific job/internship board
  - Resume/portfolio sharing capabilities
- **Collaborative Learning Tools**
  - Shared document editing for class notes and projects
  - Study flashcard creation and sharing
  - Q&A forums for different subjects
- **Academic Integration**
  - Direct integration with Canvas
  - Automated study group scheduling
  - Class-specific channels with deadline tracking

## Technical Stack
- Frontend: React Native with Expo
- Backend: Firebase (Authentication, Database, Cloud Functions)
- APIs: Canvas LMS API, Google Calendar API
- UI Libraries: React Native Paper, React Navigation

## Project Structure
```
app/
├── components/     # Reusable UI components
├── screens/        # Main app screens
├── navigation/     # Navigation configuration
├── api/           # API services (Canvas, etc.)
├── firebase/      # Firebase configuration
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── types/         # TypeScript type definitions
└── _layout.tsx    # Root layout component
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Canvas API credentials and Firebase configuration.

3. Start the development server:
   ```bash
   npx expo start
   ```

You can then run the app in:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Implement proper error handling
- Write clean, documented code

### Git Workflow
- Create feature branches from `main`
- Use conventional commits
- Submit PRs for review

## Team Structure

### Person 1: Project Manager & Full-Stack Developer
- Overall project coordination
- Frontend architecture
- Backend/Firebase setup
- Canvas API integration management

### Person 2: Frontend Developer & UI/UX Specialist
- Component development
- UI/UX design
- Styling and animations
- Asset creation

### Person 3: Backend Developer & Feature Specialist
- Database structure
- Authentication system
- Feature implementation
- Testing

## Development Timeline

### Day 1: Foundation Building
- Project setup and architecture
- Canvas API integration
- Basic UI components
- Authentication system

### Day 2: Feature Implementation
- Core features development
- Integration testing
- UI/UX refinement
- Backend services

### Day 3: Polish & Presentation
- Bug fixes and optimization
- Final testing
- Demo preparation
- Documentation

## Learn More
- [Expo documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Canvas LMS API](https://canvas.instructure.com/doc/api/)
- [Firebase Documentation](https://firebase.google.com/docs)

## License
MIT License - See LICENSE file for details
