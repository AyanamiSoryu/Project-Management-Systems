# Project Management System

A mini-version of a project management system developed as part of the frontend internship assignment (Spring 2025). This application enables task management across multiple project boards with drag-and-drop functionality.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

## 🚀 Features

- View all tasks across projects
- Project board management
- Task creation and editing
- Drag-and-drop task status updates
- Advanced filtering and search
- Responsive design
- Optimistic UI updates

## 🛠️ Tech Stack

- **Runtime**: Node.js v20
- **Framework**: React 18+
- **Language**: TypeScript
- **Routing**: React Router v6
- **UI Library**: Material-UI v7
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Build Tool**: Webpack

## 📋 Prerequisites

- Node.js v20.x
- npm or yarn
- Git
- Docker and Make (for running the backend server)

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/ayanamisoryu/project-management-system.git
   cd project-management-system
   ```

2. Start the backend server
   ```bash
   cd server
   make initial-start
   ```
   The API will be available at `http://127.0.0.1:8080`

3. Install frontend dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run test:coverage` - Generates test coverage report
- `npm run lint` - Lints the codebase
- `npm run format` - Formats code using Prettier
- `npm run generate:api` - Generates API client from OpenAPI spec

## 🏗️ Project Structure

```
src/
├── domains/                 # Business logic organized by domain
│   ├── boards/             # Board-related functionality
│   ├── issues/             # Task/issue management
│   ├── teams/              # Team management
│   └── users/              # User management
├── ui/
│   ├── pages/              # Route components
│   └── pure-components/    # Reusable UI components
├── shared/
│   └── networking/         # API client and configuration
└── utils/                  # Helper functions
```

## 📚 Technical Decisions

### Architecture
- **Domain-Driven Design**: Code organized by business domains for better scalability
- **Custom Hooks**: Separates data fetching logic from UI components
- **Type Safety**: Full TypeScript implementation for reduced runtime errors

### Libraries
- **React Query**: Efficient server state management with caching
- **Material-UI**: Comprehensive component library with theming
- **@dnd-kit**: Modern drag-and-drop implementation
- **Axios**: Robust HTTP client with interceptors

### Performance
- Request cancellation on page navigation
- Optimistic updates for better UX
- Efficient caching strategy
- Memoization of expensive operations

## 📚 Documentation

For detailed documentation, please refer to:
- [Full Project Documentation](docs/DOCUMENTATION.md)
- [Requirements Implementation](docs/REQUIREMENTS.md)
- [Technology Choices Justification](docs/TECH_JUSTIFICATION.md)
- [Backend Server Documentation](server/README.md)

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👥 Authors

- Nikolskiy Ilia - [GitHub Profile](https://github.com/ayanamisoryu)

## 🙏 Acknowledgments

- React team for the amazing framework
- Material-UI team for the comprehensive component library
- TanStack team for React Query
- All contributors and reviewers
- Avito team for such diligent server !!!
