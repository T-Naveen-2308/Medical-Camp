# Medical Camp Tracker

This repository contains the code for a single-page application (SPA) that tracks various activities and data related to medical camps. The project is built with a separate frontend and backend, where the frontend interacts with the backend to manage data efficiently.

## Project Structure

### Backend
The backend is developed using Node.js, TypeScript, and Prisma for managing database interactions.

- **[backend](./backend)**: Contains the backend server code.
  - `.env`: Environment variable configuration file.
  - `.gitignore`: Specifies files and directories to ignore in version control.
  - **[assets](./backend/assets)**: Holds static assets such as data files.
    - `data.json`: Example data for the application.
  - **[controllers](./backend/controllers)**: Contains the logic for handling requests.
    - `medicalCamp.js / medicalCamp.ts`: Controllers to manage medical camp operations.
  - **[routes](./backend/routes)**: Defines the application’s API routes.
    - `mainApp.js / mainApp.ts`: Routing logic for API endpoints.
  - **[prisma](./backend/prisma)**: Database schema configuration using Prisma.
    - `schema.prisma`: Prisma schema file for managing the database structure.
  - `index.js / index.ts`: Main server entry points for starting the application.
  - `package.json`: Lists the backend project dependencies and scripts.
  - `README.md`: Backend-specific documentation.

### Frontend
The frontend is built using React and TypeScript, styled with Tailwind CSS.

- **[frontend](./frontend)**: Contains the frontend code for the Medical Camp Tracker.
  - `.env`: Configuration for frontend environment variables.
  - `.gitignore`: Specifies files and directories to ignore in version control.
  - `index.html`: Main HTML file for the SPA.
  - **[public](./frontend/public)**: Holds public files.
  - **[src](./frontend/src)**: Main source code for the frontend.
    - `App.tsx`: Main React component for the application.
    - **[assets](./frontend/src/assets)**: Static assets like images.
    - **[axios](./frontend/src/axios)**: Axios configuration for making API calls.
    - **[components](./frontend/src/components)**: React components for various UI elements.
      - `MedicalForm.tsx`: Form component for managing camp-related information.
    - `main.tsx`: Entry point for rendering the React application.
  - `tailwind.config.js`: Configuration for Tailwind CSS.
  - `tsconfig.json`: TypeScript configuration for the project.
  - `package.json`: Lists frontend project dependencies and scripts.
  - `vite.config.ts`: Configuration for the Vite build tool.
  - `README.md`: Frontend-specific documentation.

### Overall Project
- **[README.md](./README.md)**: General documentation for the project.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Prisma (for backend)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```

## Features

- **Medical camp tracking**: Efficiently track various aspects of medical camps.
- **Form-based data entry**: Use forms to easily enter and manage camp-related data.
- **Single-page application**: Enjoy a seamless user experience with a responsive SPA interface.
