# Student Management System
### CSC-251 Web Technologies — Assignment 4 (Spring 2026)
**PMAS Arid Agriculture University Rawalpindi**
**Instructor: Dr. Muhammad Habib**

---

## Overview
A full-stack Student Management System built with **Node.js** and **Express.js**. Supports complete CRUD operations for Students, Courses, and Grades through a RESTful API connected to a responsive web frontend.

## Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js v18+ |
| Framework | Express.js |
| Middleware | helmet, cors, morgan, dotenv, custom |
| Frontend | HTML5, CSS3, Bootstrap 5, Vanilla JS |
| Storage | In-Memory (JS arrays) |
| Deployment | Render / Railway / Vercel |

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start server
npm start          # production
npm run dev        # development (nodemon)

# 4. Open browser → http://localhost:3000
```

## Pages
| Route | Description |
|---|---|
| `/` | Dashboard with stats & charts |
| `/students` | Student management (CRUD) |
| `/courses` | Course management (CRUD) |
| `/grades` | Grade records (CRUD) |

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | All students |
| POST | `/api/students` | Add student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/courses` | All courses |
| POST | `/api/courses` | Add course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |
| GET | `/api/grades` | All grades |
| POST | `/api/grades` | Add grade |
| PUT | `/api/grades/:id` | Update grade |
| DELETE | `/api/grades/:id` | Delete grade |
| GET | `/api/dashboard/stats` | Statistics |

## Project Structure
```
student-mgmt/
├── server.js           # Main Express application
├── package.json        # Dependencies
├── .env.example        # Environment template
├── middleware/
│   └── index.js        # Custom middleware functions
├── models/
│   └── db.js           # In-memory database + CRUD helpers
├── routes/
│   ├── students.js     # Student REST API
│   ├── courses.js      # Course REST API
│   ├── grades.js       # Grade REST API
│   └── dashboard.js    # Stats API
├── public/
│   ├── index.html      # Dashboard page
│   ├── students.html   # Students page
│   ├── courses.html    # Courses page
│   ├── grades.html     # Grades page
│   ├── css/style.css   # Stylesheet
│   └── js/             # Frontend scripts
└── docs/
    ├── API.md          # API documentation
    ├── DEPLOYMENT.md   # Deployment guide
    └── REPORT.md       # Assignment report
```

## Deployment
See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for full deployment steps on Render, Railway, and Vercel.

## Live Demo
🌐 **[https://student-mgmt-sms.onrender.com](https://student-mgmt-sms.onrender.com)** *(update after deployment)*
