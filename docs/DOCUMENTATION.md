# Project Management System - Documentation

## Project Overview
This project is a mini-version of a Project Management System developed as part of the frontend internship assignment (Spring 2025). The application enables users to manage tasks across different project boards with full CRUD functionality.

## Technical Stack

### Core Technologies
- **Node.js v20** - Required runtime environment
- **React v18+** - Main UI framework
- **TypeScript** - Static typing for improved code quality
- **React Router DOM v6** - Client-side routing
- **React Query (TanStack Query v5)** - Server state management
- **Material-UI v7** - UI component library

### Additional Libraries
- **@dnd-kit/core** - Drag and drop functionality
- **Axios** - HTTP client
- **Redux Toolkit** - State management (though primarily using React Query)
- **Webpack** - Module bundler
- **Jest & React Testing Library** - Testing framework

## Architecture Decisions & Justifications

### Domain-Driven Structure
The project follows a domain-driven structure where code is organized by business domains:
- `domains/boards` - Board-related logic
- `domains/issues` - Issue/task management
- `domains/teams` - Team management
- `domains/users` - User management

**Justification**: This structure scales better for complex applications, improves code organization, and makes the codebase more maintainable.

### React Query for Data Fetching
React Query is used extensively for:
- Data fetching and caching
- Optimistic updates
- Automatic refetching
- Request cancellation

**Justification**: React Query provides superior server state management compared to traditional approaches, handles caching automatically, and simplifies request cancellation when navigating between pages.

### Material-UI for UI Components
Material-UI was chosen for:
- Comprehensive component library
- Built-in accessibility
- Customizable theming
- TypeScript support

**Justification**: Material-UI provides a consistent design system and reduces development time while ensuring professional UI/UX.

### Custom Hooks Architecture
- Each domain has dedicated hooks for data operations
- Separation of concerns between data fetching and UI logic

**Justification**: Improves code reusability, testability, and maintains clean component architecture.

## Features Implementation

### 1. Task Management
- ✅ View all tasks across projects
- ✅ Create new tasks
- ✅ Edit tasks from any location
- ✅ Detailed task view in modal

### 2. Board Management
- ✅ View all boards
- ✅ Board-specific task views
- ✅ Task status columns with drag-and-drop

### 3. Navigation & Routing
- ✅ `/boards` - Lists all project boards
- ✅ `/board/:id` - Individual board view
- ✅ `/issues` - All tasks view
- ✅ Header navigation always available

### 4. Advanced Features
- ✅ Drag-and-drop task status changes
- ✅ Task filtering and search
- ✅ Cross-page navigation with context
- ✅ Optimistic UI updates

## Project Structure

```
src/
├── domains/                 # Business logic by domain
│   ├── boards/             
│   │   ├── hooks/          # Domain-specific hooks
│   │   ├── mappers/        # Data transformation
│   │   └── models/         # TypeScript types
│   ├── issues/             
│   ├── teams/              
│   └── users/              
├── ui/                     
│   ├── pages/              # Route components
│   └── pure-components/    # Reusable UI components
├── shared/                 
│   └── networking/         # API configuration
└── utils/                  # Helper functions
```

## Getting Started

### Prerequisites
- Node.js v20
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm start
```

### Running Tests
```bash
npm test
npm run test:coverage
```

### Building for Production
```bash
npm run build
```

## Backend Server
The project includes a complete backend server in the root folder.

### Server Setup
1. **Docker Installation** (preferred method)
    - Docker and Make are required
    - Follow platform-specific installation instructions in server README

2. **Quick Start**
   ```bash
   make initial-start  # Complete setup and start
   ```

3. **Alternative: Direct Go Run**
   ```bash
   go run cmd/service/main.go
   ```

The server runs at `http://127.0.0.1:8080` with Swagger documentation available at `/swagger/index.html`.

## API Integration
The application integrates with the backend API using:
- Generated TypeScript clients via OpenAPI
- Axios for HTTP requests
- Type-safe API calls with full TypeScript support

## Testing Strategy
- Unit tests for custom hooks
- Component tests for UI elements
- Integration tests for key workflows
- Jest and React Testing Library for testing infrastructure

## Performance Optimizations
- React Query for efficient data caching
- Optimistic updates for better UX
- Code splitting with Webpack
- Memoization where appropriate

## Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Comprehensive error handling

## Known Limitations & Future Improvements
1. No persistent storage for draft changes (form auto-save)
2. Docker containerization not yet implemented
3. Limited error boundary coverage

## Conclusion
This project implements all required features while following modern React best practices and architectural patterns. The chosen technology stack ensures scalability, maintainability, and excellent developer experience.
