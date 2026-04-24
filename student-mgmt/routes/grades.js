// ============================================================
// routes/grades.js — Grades CRUD REST API
// ============================================================

const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/grades — Get all grades (enriched with student + course names)
router.get('/', (req, res) => {
  const grades   = db.getAllGrades();
  const students = db.getAllStudents();
  const courses  = db.getAllCourses();

  const enriched = grades.map(g => ({
    ...g,
    studentName: students.find(s => s.id === g.studentId)?.name || 'Unknown',
    rollNo:      students.find(s => s.id === g.studentId)?.rollNo || '—',
    courseName:  courses.find(c => c.id === g.courseId)?.name || 'Unknown',
    courseCode:  courses.find(c => c.id === g.courseId)?.code || '—',
  }));

  const { studentId } = req.query;
  const result = studentId
    ? enriched.filter(g => g.studentId === parseInt(studentId))
    : enriched;

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/grades/:id — Get single grade
router.get('/:id', (req, res) => {
  const grade = db.getGradeById(req.params.id);
  if (!grade) return res.status(404).json({ success: false, message: 'Grade not found' });
  res.json({ success: true, data: grade });
});

// POST /api/grades — Add grade
router.post('/', (req, res) => {
  const { studentId, courseId, marks, semester, year, remarks } = req.body;
  if (!studentId || !courseId || marks === undefined) {
    return res.status(400).json({ success: false, message: 'studentId, courseId, and marks are required' });
  }
  if (marks < 0 || marks > 100) {
    return res.status(400).json({ success: false, message: 'Marks must be between 0 and 100' });
  }
  const grade = db.createGrade({
    studentId: parseInt(studentId),
    courseId:  parseInt(courseId),
    marks:     parseInt(marks),
    semester:  parseInt(semester) || 1,
    year:      parseInt(year) || new Date().getFullYear(),
    remarks:   remarks || ''
  });
  res.status(201).json({ success: true, message: 'Grade added successfully', data: grade });
});

// PUT /api/grades/:id — Update grade
router.put('/:id', (req, res) => {
  const grade = db.updateGrade(req.params.id, req.body);
  if (!grade) return res.status(404).json({ success: false, message: 'Grade not found' });
  res.json({ success: true, message: 'Grade updated successfully', data: grade });
});

// DELETE /api/grades/:id — Delete grade
router.delete('/:id', (req, res) => {
  const deleted = db.deleteGrade(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Grade not found' });
  res.json({ success: true, message: 'Grade deleted successfully' });
});

module.exports = router;
