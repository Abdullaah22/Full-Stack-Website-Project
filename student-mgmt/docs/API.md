# API Documentation — Student Management System
## CSC-251 Assignment 4 | Spring 2026

**Base URL:** `http://localhost:3000` (local) | `https://your-app.onrender.com` (deployed)

---

## Students API — `/api/students`

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| GET    | `/api/students`       | Get all students       |
| GET    | `/api/students/:id`   | Get student by ID      |
| POST   | `/api/students`       | Create a new student   |
| PUT    | `/api/students/:id`   | Update student by ID   |
| DELETE | `/api/students/:id`   | Delete student by ID   |

### Query Parameters (GET /api/students)
- `?department=CS` — Filter by department
- `?status=Active` — Filter by status
- `?semester=4` — Filter by semester
- `?search=ayesha` — Search by name or roll number

### POST/PUT Body (Students)
```json
{
  "name":       "Ayesha Khan",
  "rollNo":     "CS-2101",
  "email":      "ayesha@uni.edu",
  "phone":      "0300-1234567",
  "department": "CS",
  "semester":   4,
  "cgpa":       3.72,
  "status":     "Active"
}
```

### Response Format
```json
{
  "success": true,
  "count": 6,
  "data": [ ... ]
}
```

---

## Courses API — `/api/courses`

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/courses`      | Get all courses      |
| GET    | `/api/courses/:id`  | Get course by ID     |
| POST   | `/api/courses`      | Create a new course  |
| PUT    | `/api/courses/:id`  | Update course by ID  |
| DELETE | `/api/courses/:id`  | Delete course by ID  |

### POST/PUT Body (Courses)
```json
{
  "code":       "CSC-251",
  "name":       "Web Technologies",
  "credits":    3,
  "instructor": "Dr. Muhammad Habib",
  "department": "CS",
  "semester":   4,
  "maxSeats":   50
}
```

---

## Grades API — `/api/grades`

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | `/api/grades`      | Get all grades      |
| GET    | `/api/grades/:id`  | Get grade by ID     |
| POST   | `/api/grades`      | Add a grade record  |
| PUT    | `/api/grades/:id`  | Update grade by ID  |
| DELETE | `/api/grades/:id`  | Delete grade by ID  |

### Query Parameters (GET /api/grades)
- `?studentId=1` — Filter by student

### POST/PUT Body (Grades)
```json
{
  "studentId": 1,
  "courseId":  1,
  "marks":     88,
  "semester":  4,
  "year":      2026,
  "remarks":   "Excellent performance"
}
```

> **Note:** The `grade` field (A, B+, etc.) is automatically calculated from `marks`.

---

## Dashboard API — `/api/dashboard`

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/dashboard/stats`| Get aggregate statistics |

### Response (Dashboard Stats)
```json
{
  "success": true,
  "data": {
    "totalStudents": 6,
    "activeStudents": 5,
    "totalCourses": 5,
    "totalGrades": 6,
    "avgCgpa": "3.45",
    "departments": 2,
    "gradeDistribution": { "A": 3, "B+": 2, "A-": 1 },
    "departmentDistribution": { "CS": 4, "SE": 2 },
    "topStudents": [ ... ],
    "recentActivity": [ ... ]
  }
}
```

---

## HTTP Status Codes

| Code | Meaning                      |
|------|------------------------------|
| 200  | OK — Request successful      |
| 201  | Created — Resource created   |
| 400  | Bad Request — Validation error|
| 404  | Not Found — Resource missing  |
| 500  | Internal Server Error         |

---

## Middleware Used

| Middleware | Purpose                                  |
|------------|------------------------------------------|
| `helmet`   | Sets security HTTP headers               |
| `cors`     | Enables Cross-Origin Resource Sharing    |
| `morgan`   | HTTP request logging (dev mode)          |
| `express.json()` | Parses JSON request bodies         |
| Custom     | Timestamps every incoming request        |
