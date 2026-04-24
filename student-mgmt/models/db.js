// ============================================================
// models/db.js — In-Memory Database with Seed Data
// Simulates MongoDB/MySQL with full CRUD support
// ============================================================

let students = [
  { id: 1, name: 'Ayesha Khan',     rollNo: 'CS-2101', email: 'ayesha@uni.edu',  phone: '0300-1234567', department: 'CS', semester: 4, cgpa: 3.72, status: 'Active',   createdAt: new Date('2024-01-15') },
  { id: 2, name: 'Bilal Ahmed',     rollNo: 'SE-2102', email: 'bilal@uni.edu',   phone: '0301-2345678', department: 'SE', semester: 4, cgpa: 3.45, status: 'Active',   createdAt: new Date('2024-01-15') },
  { id: 3, name: 'Fatima Noor',     rollNo: 'CS-2103', email: 'fatima@uni.edu',  phone: '0302-3456789', department: 'CS', semester: 4, cgpa: 3.88, status: 'Active',   createdAt: new Date('2024-01-16') },
  { id: 4, name: 'Usman Tariq',     rollNo: 'SE-2104', email: 'usman@uni.edu',   phone: '0303-4567890', department: 'SE', semester: 2, cgpa: 3.10, status: 'Active',   createdAt: new Date('2024-02-01') },
  { id: 5, name: 'Zara Malik',      rollNo: 'CS-2105', email: 'zara@uni.edu',    phone: '0304-5678901', department: 'CS', semester: 6, cgpa: 3.60, status: 'Active',   createdAt: new Date('2024-02-01') },
  { id: 6, name: 'Hassan Raza',     rollNo: 'CS-2106', email: 'hassan@uni.edu',  phone: '0305-6789012', department: 'CS', semester: 2, cgpa: 2.95, status: 'Inactive', createdAt: new Date('2024-02-10') },
];

let courses = [
  { id: 1, code: 'CSC-251', name: 'Web Technologies',        credits: 3, instructor: 'Dr. Muhammad Habib', department: 'CS', semester: 4, enrolled: 45, maxSeats: 50 },
  { id: 2, code: 'CSC-241', name: 'Database Systems',        credits: 3, instructor: 'Dr. Sara Ali',       department: 'CS', semester: 4, enrolled: 40, maxSeats: 50 },
  { id: 3, code: 'CSC-231', name: 'Operating Systems',       credits: 3, instructor: 'Dr. Imran Sheikh',   department: 'CS', semester: 4, enrolled: 38, maxSeats: 50 },
  { id: 4, code: 'SE-211',  name: 'Software Engineering',    credits: 3, instructor: 'Dr. Amna Butt',      department: 'SE', semester: 4, enrolled: 30, maxSeats: 40 },
  { id: 5, code: 'CSC-261', name: 'Artificial Intelligence', credits: 3, instructor: 'Dr. Khalid Mehmood', department: 'CS', semester: 6, enrolled: 35, maxSeats: 40 },
];

let grades = [
  { id: 1, studentId: 1, courseId: 1, marks: 88, grade: 'A',  semester: 4, year: 2026, remarks: 'Excellent performance' },
  { id: 2, studentId: 1, courseId: 2, marks: 79, grade: 'B+', semester: 4, year: 2026, remarks: 'Good work' },
  { id: 3, studentId: 2, courseId: 1, marks: 75, grade: 'B+', semester: 4, year: 2026, remarks: 'Satisfactory' },
  { id: 4, studentId: 2, courseId: 4, marks: 82, grade: 'A-', semester: 4, year: 2026, remarks: 'Well done' },
  { id: 5, studentId: 3, courseId: 1, marks: 92, grade: 'A',  semester: 4, year: 2026, remarks: 'Outstanding' },
  { id: 6, studentId: 3, courseId: 2, marks: 90, grade: 'A',  semester: 4, year: 2026, remarks: 'Outstanding' },
];

// Auto-increment counters
let studentIdCounter = 7;
let courseIdCounter  = 6;
let gradeIdCounter   = 7;

// ─── Helper: Calculate Grade from Marks ───────────────────
function calculateGrade(marks) {
  if (marks >= 90) return 'A';
  if (marks >= 85) return 'A-';
  if (marks >= 80) return 'B+';
  if (marks >= 75) return 'B';
  if (marks >= 70) return 'B-';
  if (marks >= 65) return 'C+';
  if (marks >= 60) return 'C';
  if (marks >= 55) return 'C-';
  if (marks >= 50) return 'D';
  return 'F';
}

module.exports = {
  // ── Students ──────────────────────────────────────────
  getAllStudents:    () => students,
  getStudentById:   (id) => students.find(s => s.id === parseInt(id)),
  createStudent:    (data) => {
    const student = { id: studentIdCounter++, ...data, createdAt: new Date() };
    students.push(student);
    return student;
  },
  updateStudent:    (id, data) => {
    const idx = students.findIndex(s => s.id === parseInt(id));
    if (idx === -1) return null;
    students[idx] = { ...students[idx], ...data, id: parseInt(id) };
    return students[idx];
  },
  deleteStudent:    (id) => {
    const idx = students.findIndex(s => s.id === parseInt(id));
    if (idx === -1) return false;
    students.splice(idx, 1);
    return true;
  },

  // ── Courses ───────────────────────────────────────────
  getAllCourses:    () => courses,
  getCourseById:   (id) => courses.find(c => c.id === parseInt(id)),
  createCourse:    (data) => {
    const course = { id: courseIdCounter++, ...data };
    courses.push(course);
    return course;
  },
  updateCourse:    (id, data) => {
    const idx = courses.findIndex(c => c.id === parseInt(id));
    if (idx === -1) return null;
    courses[idx] = { ...courses[idx], ...data, id: parseInt(id) };
    return courses[idx];
  },
  deleteCourse:    (id) => {
    const idx = courses.findIndex(c => c.id === parseInt(id));
    if (idx === -1) return false;
    courses.splice(idx, 1);
    return true;
  },

  // ── Grades ────────────────────────────────────────────
  getAllGrades:     () => grades,
  getGradeById:    (id) => grades.find(g => g.id === parseInt(id)),
  getGradesByStudent: (studentId) => grades.filter(g => g.studentId === parseInt(studentId)),
  createGrade:     (data) => {
    const grade = {
      id: gradeIdCounter++,
      ...data,
      grade: calculateGrade(parseInt(data.marks))
    };
    grades.push(grade);
    return grade;
  },
  updateGrade:     (id, data) => {
    const idx = grades.findIndex(g => g.id === parseInt(id));
    if (idx === -1) return null;
    grades[idx] = {
      ...grades[idx], ...data,
      id: parseInt(id),
      grade: calculateGrade(parseInt(data.marks || grades[idx].marks))
    };
    return grades[idx];
  },
  deleteGrade:     (id) => {
    const idx = grades.findIndex(g => g.id === parseInt(id));
    if (idx === -1) return false;
    grades.splice(idx, 1);
    return true;
  },

  // ── Dashboard Stats ───────────────────────────────────
  getStats: () => ({
    totalStudents:   students.length,
    activeStudents:  students.filter(s => s.status === 'Active').length,
    totalCourses:    courses.length,
    totalGrades:     grades.length,
    avgCgpa:         (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(2),
    departments:     [...new Set(students.map(s => s.department))].length,
  }),
};
