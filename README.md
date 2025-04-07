# Employee Registration System

## Overview

The Employee Registration System is a full-stack web application designed to manage employee information. It provides functionality for adding, viewing, updating, and deleting employee records. The system is built with a React frontend and a Node.js backend, utilizing Firebase's Firestore as the database.

## Features

- Add new employees with detailed information
- View a list of all employees
- Search for employees by ID
- Update employee information
- Delete employee records
- Responsive design for various screen sizes

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: Firebase Firestore
- State Management: React Hooks
- Routing: React Router
- HTTP Client: Axios

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Firebase account and project set up

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/MandlakheM/employee-reg.git
   cd employee-reg
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up your Firebase configuration:
   - Create a new Firebase project in the Firebase Console
   - Generate a new private key for your service account
   - Save the private key as `key.json` in the `backend` directory
   - 

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```


## API Endpoints

- GET `/employees` - Retrieve all employees
- POST `/add-employee` - Add a new employee
- GET `/employee/:id` - Retrieve a specific employee
- PUT `/employee/:id` - Update an employee
- DELETE `/employee/:id` - Delete an employee

## SYSTEM ADMIN CREDENTIALS

```
mangumtamandilakhe7@gmail.com
mandi123
```
