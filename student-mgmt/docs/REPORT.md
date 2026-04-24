# Assignment 4 Report — Web Technologies (CSC-251)
## Student Management System
**PMAS Arid Agriculture University Rawalpindi**
**University Institute of Information Technology**
**Spring 2026 | 4th Semester CS/SE**
**Instructor: Dr. Muhammad Habib**

---

## 1. Project Overview

This project is a **Full-Stack Student Management System** built using **Node.js** and **Express.js**. It allows university staff to manage student records, courses, and academic grades through a clean, responsive web interface.

The system provides full **CRUD** (Create, Read, Update, Delete) functionality for all three data domains: Students, Courses, and Grades — connected through a RESTful API backend.

---

## 2. Learning Resources Used

| Topic | Resource |
|-------|----------|
| Node.js Fundamentals | [nodejs.org/docs](https://nodejs.org/en/docs/) |
| Express.js Framework | [expressjs.com](https://expressjs.com/en/guide/routing.html) |
| REST API Design | MDN Web Docs — HTTP Methods |
| Middleware (helmet, cors, morgan) | Official npm documentation |
| Bootstrap 5 | [getbootstrap.com/docs/5.3](https://getbootstrap.com/docs/5.3/) |
| Fetch API (Frontend) | MDN Web Docs |
| Deployment on Render | [render.com/docs](https://render.com/docs) |

---

## 3. Technologies Used

### Backend
- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for routing and middleware
- **helmet** — Security HTTP headers middleware
- **cors** — Cross-Origin Resource Sharing middleware
- **morgan** — HTTP request logger middleware
- **dotenv** — Environment variable configuration

### Frontend
- **HTML5 / CSS3** — Markup and styling
- **Bootstrap 5** — Responsive grid and utilities
- **Font Awesome 6** — Icon library
- **Vanilla JavaScript (ES6+)** — Fetch API, DOM manipulation
- **Google Fonts** — Space Mono + DM Sans typography

### Data Storage
- **In-Memory Storage** — JavaScript arrays acting as a database
  *(Structured to be easily replaced with MongoDB/MySQL)*

---

## 4. Features Implemented

### Learning Topics Applied ✓
- [x] Node.js fundamentals (modules, require, fs, http)
- [x] Express framework and routing (Router, route parameters)
- [x] REST API development (GET, POST, PUT, DELETE)
- [x] Middleware usage (helmet, cors, morgan, custom timestamp logger)
- [x] Database integration (in-memory storage with full CRUD)
- [x] Frontend–backend integration (Fetch API calls)
- [x] Environment configuration (.env, dotenv)
- [x] Website deployment (Render)

### Task Requirements ✓
- [x] Backend server using Express
- [x] CRUD functionality (add, view, update, delete)
- [x] Frontend pages using HTML/CSS/Bootstrap
- [x] Frontend connected with backend APIs via Fetch
- [x] Data storage and retrieval (in-memory DB)
- [x] Proper request handling and JSON responses
- [x] Deployed on Render

### Minimum Website Features ✓
- [x] Home page (Dashboard with statistics)
- [x] Students page (list, add, edit, delete)
- [x] Courses page (card view with enrollment progress)
- [x] Grades page (records with auto-calculated letter grades)
- [x] Form submission with backend processing
- [x] Data storage and retrieval
- [x] Responsive design (mobile-friendly sidebar)
- [x] Live deployed link

---

## 5. Project Structure

```
student-mgmt/
├── server.js              # Main Express application
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variable template
├── models/
│   └── db.js              # In-memory database + CRUD helpers
├── routes/
│   ├── students.js        # Student REST API routes
│   ├── courses.js         # Course REST API routes
│   ├── grades.js          # Grade REST API routes
│   └── dashboard.js       # Statistics API route
├── public/
│   ├── index.html         # Dashboard / Home page
│   ├── students.html      # Students management page
│   ├── courses.html       # Courses management page
│   ├── grades.html        # Grades management page
│   ├── css/
│   │   └── style.css      # Main stylesheet (dark theme)
│   └── js/
│       ├── app.js         # Shared utilities (toast, modal)
│       ├── students.js    # Student CRUD frontend logic
│       ├── courses.js     # Course CRUD frontend logic
│       └── grades.js      # Grade CRUD frontend logic
└── docs/
    ├── API.md             # API documentation
    └── DEPLOYMENT.md      # Deployment guide
```

---

## 6. API Endpoints Summary

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/students | Get all students |
| POST | /api/students | Add a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |
| GET | /api/courses | Get all courses |
| POST | /api/courses | Add a course |
| PUT | /api/courses/:id | Update a course |
| DELETE | /api/courses/:id | Delete a course |
| GET | /api/grades | Get all grades |
| POST | /api/grades | Add a grade |
| PUT | /api/grades/:id | Update a grade |
| DELETE | /api/grades/:id | Delete a grade |
| GET | /api/dashboard/stats | Get statistics |

---

## 7. Key Implementation Details

### Custom Middleware
```js
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`[${req.requestTime}] ${req.method} ${req.url}`);
  next();
});
```

### Automatic Grade Calculation
The system automatically calculates letter grades from numeric marks:
- 90–100 → A, 85–89 → A-, 80–84 → B+, 75–79 → B, etc.

### Input Validation
Both backend validation middleware and frontend checks ensure data integrity before any database operation.

---

## 8. Submission Checklist

- [x] Source code (GitHub / zipped project)
- [x] Live deployed website link
- [x] API documentation (`docs/API.md`)
- [x] Deployment steps (`docs/DEPLOYMENT.md`)
- [x] This report (`docs/REPORT.md`)
