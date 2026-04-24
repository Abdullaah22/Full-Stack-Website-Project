// ============================================================
// routes/courses.js — Courses CRUD REST API
// ============================================================

const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/courses — Get all courses
router.get('/', (req, res) => {
  let result = db.getAllCourses();
  const { department, semester } = req.query;
  if (department) result = result.filter(c => c.department === department);
  if (semester)   result = result.filter(c => c.semester === parseInt(semester));
  res.json({ success: true, count: result.length, data: result });
});

// GET /api/courses/:id — Get single course
router.get('/:id', (req, res) => {
  const course = db.getCourseById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, data: course });
});

// POST /api/courses — Create course
router.post('/', (req, res) => {
  const { code, name, credits, instructor, department, semester, maxSeats } = req.body;
  if (!code || !name || !instructor || !department) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const course = db.createCourse({
    code, name,
    credits:  parseInt(credits) || 3,
    instructor, department,
    semester: parseInt(semester) || 1,
    enrolled: 0,
    maxSeats: parseInt(maxSeats) || 50
  });
  res.status(201).json({ success: true, message: 'Course created successfully', data: course });
});

// PUT /api/courses/:id — Update course
router.put('/:id', (req, res) => {
  const course = db.updateCourse(req.params.id, req.body);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, message: 'Course updated successfully', data: course });
});

// DELETE /api/courses/:id — Delete course
router.delete('/:id', (req, res) => {
  const deleted = db.deleteCourse(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, message: 'Course deleted successfully' });
});

module.exports = router;
