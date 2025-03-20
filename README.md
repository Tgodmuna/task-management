## About the App

The Task Management Client is designed to help users manage their tasks efficiently. It provides features such as task creation, task modification, task deletion, and user invitations. The app is built using modern web development technologies and follows a modular architecture to ensure scalability and maintainability. Users can invite others to collaborate on tasks, track the progress of tasks, and receive notifications for important updates.

## Architecture

The application follows a component-based architecture, where each feature is encapsulated within its own component. The main architectural components include:

- **Components**: Reusable UI components that form the building blocks of the application. These components are designed to be modular and reusable across different parts of the application.
- **Hooks**: Custom hooks to encapsulate reusable logic. Hooks are used to manage state and side effects in a clean and efficient manner.
- **Context**: React Context API for state management and sharing state across components. This allows for a centralized state management solution without the need for prop drilling.
- **Pages**: Top-level components representing different pages of the application. Each page component is responsible for rendering the appropriate UI and managing its own state.
- **Utilities**: Utility functions and constants used across the application. These utilities help in performing common tasks and maintaining consistency throughout the codebase.

## Patterns

The application uses several design patterns to ensure code quality and maintainability:

- **Component-Based Architecture**: Each feature is encapsulated within its own component, promoting reusability and separation of concerns. This makes the codebase easier to understand and maintain.
- **Custom Hooks**: Reusable logic is encapsulated within custom hooks, making the code more modular and easier to test. Hooks help in managing state and side effects in a clean and efficient manner.
- **Context API**: The React Context API is used for state management, allowing state to be shared across components without prop drilling. This provides a centralized state management solution that is easy to use and maintain.
- **Error Handling**: Error handling is done using `try-catch` blocks and the `toast` library for user notifications. This ensures that errors are handled gracefully and users are informed of any issues.

## Project Structure

The project is structured as follows:

```
/dashboard-components/
    /components/
        - TaskList.tsx
        - TaskItem.tsx
        - UserInvite.tsx
    /hooks/
        - useTasks.ts
        - useUserInvite.ts
    /context/
        - TaskContext.tsx
        - UserContext.tsx
    /pages/
        - Dashboard.tsx
        - TaskDetails.tsx
    /utilities/
        - api.ts
        - constants.ts
```

- **Components**: Contains all the reusable UI components.
- **Hooks**: Contains custom hooks for managing state and side effects.
- **Context**: Contains context providers for state management.
- **Pages**: Contains top-level components representing different pages of the application.
- **Utilities**: Contains utility functions and constants used across the application.

## Environment Configuration

The application uses the `NODE_ENV` environment variable to determine which code to run. This allows for different configurations and behaviors based on the environment (development, production, etc.). For example:

- **Development**: In development mode, the application may use mock data, enable detailed logging, and include development tools such as React DevTools.
- **Production**: In production mode, the application will use real data, disable detailed logging, and optimize performance.

The `NODE_ENV` variable is typically set in the build scripts or environment configuration files, and the application code can check its value to determine the appropriate behavior.

```javascript
if (process.env.NODE_ENV === 'development') {
    // Development-specific code
} else if (process.env.NODE_ENV === 'production') {
    // Production-specific code
}
```

This approach ensures that the application behaves correctly in different environments and makes it easier to manage environment-specific configurations.