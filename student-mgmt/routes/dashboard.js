// ============================================================
// routes/dashboard.js — Dashboard Statistics API
// ============================================================

const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/dashboard/stats — Aggregate statistics
router.get('/stats', (req, res) => {
  const stats    = db.getStats();
  const students = db.getAllStudents();
  const grades   = db.getAllGrades();
  const courses  = db.getAllCourses();

  // Grade distribution
  const gradeCount = {};
  grades.forEach(g => { gradeCount[g.grade] = (gradeCount[g.grade] || 0) + 1; });

  // Dept distribution
  const deptCount = {};
  students.forEach(s => { deptCount[s.department] = (deptCount[s.department] || 0) + 1; });

  // Top students by CGPA
  const topStudents = [...students]
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 5)
    .map(s => ({ name: s.name, rollNo: s.rollNo, cgpa: s.cgpa, department: s.department }));

  res.json({
    success: true,
    data: {
      ...stats,
      gradeDistribution: gradeCount,
      departmentDistribution: deptCount,
      topStudents,
      recentActivity: [
        { action: 'New student enrolled', time: '2 hours ago', type: 'student' },
        { action: 'Grades updated for CSC-251', time: '4 hours ago', type: 'grade' },
        { action: 'New course SE-211 added', time: '1 day ago', type: 'course' },
        { action: 'Semester 4 results published', time: '2 days ago', type: 'grade' },
      ]
    }
  });
});

module.exports = router;
