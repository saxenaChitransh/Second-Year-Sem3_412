# Student Management System

A simple beginner-level full-stack Student Management System built for a college assignment. It performs basic CRUD (Create, Read, Update, Delete) operations and search functionality using an in-memory array on the backend and a simple, clean React interface on the frontend.

---

## Technologies Used

### Frontend
- **React.js**
- **JavaScript (ES6+)**
- **CSS** (Simple, vanilla CSS)
- **Hooks**: `useState`, `useEffect`
- **Fetch API** for HTTP requests

### Backend
- **Node.js**
- **Express.js**
- **CORS** (Cross-Origin Resource Sharing)
- **JavaScript**
- **In-memory Array** (No database required)

---

## Folder Structure

```text
STUDENT MANAGEMENT SYSTEM/
├── Backend/
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchStudent.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## How to Install Dependencies

### 1. Install Backend Dependencies
Open your terminal and navigate to the backend folder:
```bash
cd "STUDENT MANAGEMENT SYSTEM/Backend"
npm install
```

### 2. Install Frontend Dependencies
Open a second terminal and navigate to the frontend folder:
```bash
cd "STUDENT MANAGEMENT SYSTEM/Frontend"
npm install
```

---

## How to Run the Project

### 1. Run the Backend Server
In the backend terminal:
```bash
npm start
```
The server will run on: `http://localhost:5000`

### 2. Run the Frontend App
In the frontend terminal:
```bash
npm run dev
```
The React development server will start on: `http://localhost:3000` (or the port shown in your terminal, e.g. `http://localhost:5173`).

---

## API Endpoints

Base URL: `http://localhost:5000/api/students`

| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/api/students` | Get all students |
| **GET** | `/api/students/:id` | Get single student details by ID |
| **POST** | `/api/students` | Add a new student |
| **PUT** | `/api/students/:id` | Update an existing student |
| **DELETE** | `/api/students/:id` | Delete a student by ID |

### Validation Rules
- **Required Fields**: `id`, `name`, `email`, `branch`, `semester`, `mobile`
- **Student ID**: Must be unique
- **Email**: Must be a valid email format
- **Semester**: Must be a number between 1 and 8
- **Mobile Number**: Must be exactly 10 digits
