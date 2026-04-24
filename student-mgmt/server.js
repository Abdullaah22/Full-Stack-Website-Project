// ============================================================
// server.js — Main Express Application Entry Point
// Student Management System — CSC-251 Assignment 4
// PMAS Arid Agriculture University Rawalpindi
// ============================================================

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const helmet  = require('helmet');
const path    = require('path');
require('dotenv').config();

// Import custom middleware module
const {
  requestLogger,
  validateContentType,
  notFoundHandler,
  globalErrorHandler,
} = require('./middleware');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Built-in / Third-Party Middleware ────────────────────
app.use(helmet({ contentSecurityPolicy: false }));       // Security HTTP headers
app.use(cors());                                         // Enable CORS for all origins
app.use(morgan('dev'));                                  // HTTP request logging
app.use(express.json());                                // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));        // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend

// ─── Custom Middleware ─────────────────────────────────────
app.use(requestLogger);        // Log every request with timestamp + duration
app.use(validateContentType);  // Enforce JSON content-type on POST/PUT

// ─── API Routes ────────────────────────────────────────────
const studentRoutes   = require('./routes/students');
const courseRoutes    = require('./routes/courses');
const gradeRoutes     = require('./routes/grades');
const dashboardRoutes = require('./routes/dashboard');

app.use('/api/students',  studentRoutes);
app.use('/api/courses',   courseRoutes);
app.use('/api/grades',    gradeRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Frontend Page Routes ──────────────────────────────────
app.get('/',         (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/students', (req, res) => res.sendFile(path.join(__dirname, 'public', 'students.html')));
app.get('/courses',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'courses.html')));
app.get('/grades',   (req, res) => res.sendFile(path.join(__dirname, 'public', 'grades.html')));

// ─── 404 & Global Error Handlers (must be LAST) ───────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('  Student Management System');
  console.log('  CSC-251 Assignment 4 — Spring 2026');
  console.log('========================================');
  console.log(`\n  App      : http://localhost:${PORT}`);
  console.log(`  Students : http://localhost:${PORT}/students`);
  console.log(`  Courses  : http://localhost:${PORT}/courses`);
  console.log(`  Grades   : http://localhost:${PORT}/grades`);
  console.log(`  API Base : http://localhost:${PORT}/api`);
  console.log(`\n  ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================\n');
});
const { requestLogger } = require('./middleware');
const studentRoutes     = require('./routes/students');

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
