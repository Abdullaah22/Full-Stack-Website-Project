// ============================================================
// routes/students.js — Student CRUD REST API
// ============================================================

const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Validation middleware
function validateStudent(req, res, next) {
  const { name, rollNo, email, department, semester } = req.body;
  if (!name || !rollNo || !email || !department || !semester) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, rollNo, email, department, semester'
    });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }
  next();
}

// GET /api/students — Get all students (with optional filtering)
router.get('/', (req, res) => {
  let result = db.getAllStudents();
  const { department, status, semester, search } = req.query;

  if (department) result = result.filter(s => s.department === department);
  if (status)     result = result.filter(s => s.status === status);
  if (semester)   result = result.filter(s => s.semester === parseInt(semester));
  if (search)     result = result.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/students/:id — Get single student
router.get('/:id', (req, res) => {
  const student = db.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, data: student });
});

// POST /api/students — Create student
router.post('/', validateStudent, (req, res) => {
  const { name, rollNo, email, phone, department, semester, cgpa, status } = req.body;
  const student = db.createStudent({
    name, rollNo, email,
    phone: phone || '',
    department,
    semester: parseInt(semester),
    cgpa: parseFloat(cgpa) || 0.0,
    status: status || 'Active'
  });
  res.status(201).json({ success: true, message: 'Student created successfully', data: student });
});

// PUT /api/students/:id — Update student
router.put('/:id', (req, res) => {
  const student = db.updateStudent(req.params.id, req.body);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, message: 'Student updated successfully', data: student });
});

// DELETE /api/students/:id — Delete student
router.delete('/:id', (req, res) => {
  const deleted = db.deleteStudent(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, message: 'Student deleted successfully' });
});

module.exports = router;
